'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Check, ChevronRight, ChevronLeft, Calendar, User, FileText, Image as ImageIcon, Mail, MessageCircle, Send, Loader2 } from 'lucide-react';

export function Contact() {
  const t = useTranslations('Contact');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    placement: '',
    size: '',
    description: '',
    artist: 'any',
    budget: '',
    contactPreference: 'email',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const generateWhatsAppLink = () => {
    const budgetLabel: Record<string, string> = {
      low: '$100 - $300',
      medium: '$300 - $800',
      high: '$800+',
      flexible: 'Flexible',
    };
    const artistLabel = formData.artist === 'any' ? 'First Available' : formData.artist;
    const message = encodeURIComponent(
      `*New Booking Request - Black Ink Studio*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Service:* ${formData.serviceType}\n` +
      `*Placement:* ${formData.placement || 'N/A'}\n` +
      `*Size:* ${formData.size || 'N/A'}\n` +
      `*Artist:* ${artistLabel}\n` +
      `*Budget:* ${budgetLabel[formData.budget] || formData.budget || 'N/A'}\n\n` +
      `*Description:*\n${formData.description || 'No description provided.'}`
    );
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
    return `https://wa.me/${phone}?text=${message}`;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.serviceType) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send request');
      }

      setIsSuccess(true);
      toast.success('Request sent successfully!');

      if (formData.contactPreference === 'whatsapp' || formData.contactPreference === 'both') {
        const waLink = generateWhatsAppLink();
        window.open(waLink, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: t('steps.1'), icon: User },
    { number: 2, title: t('steps.2'), icon: FileText },
    { number: 3, title: t('steps.3'), icon: ImageIcon },
    { number: 4, title: t('steps.4'), icon: Check },
  ];

  return (
    <section id="contact" className="py-24 bg-zinc-950/80 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[100px]" />
        </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
           <h2 className="text-red-600 font-medium tracking-widest uppercase text-sm mb-4">{t('title')}</h2>
           <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase">{t('heading')}</h3>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
            <div className="flex justify-between items-center relative">
                {/* Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-zinc-800 -z-10" />
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-red-600 -z-10 transition-all duration-500 ease-in-out" 
                    style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                />

                {steps.map((s) => (
                    <div key={s.number} className="flex flex-col items-center gap-2 bg-zinc-950 px-2">
                        <div 
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                step >= s.number 
                                    ? "border-red-600 bg-red-600 text-white" 
                                    : "border-zinc-700 bg-zinc-900 text-zinc-500"
                            )}
                        >
                            <s.icon size={18} />
                        </div>
                        <span className={cn(
                            "text-xs uppercase tracking-wider font-medium transition-colors",
                            step >= s.number ? "text-white" : "text-zinc-600"
                        )}>
                            {s.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-10 rounded-xl backdrop-blur-sm shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="space-y-2 mb-6">
                        <h4 className="text-xl font-heading text-white">{t('form.personal.title')}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">{t('form.personal.name')}</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={handleInputChange}
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 h-12" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">{t('form.personal.email')}</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 h-12" 
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="phone" className="text-zinc-300">{t('form.personal.phone')}</Label>
                            <Input 
                                id="phone" 
                                type="tel" 
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 h-12" 
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="space-y-2 mb-6">
                        <h4 className="text-xl font-heading text-white">{t('form.idea.title')}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label className="text-zinc-300">{t('form.idea.serviceType')}</Label>
                            <Select onValueChange={(val) => handleSelectChange('serviceType', val)} defaultValue={formData.serviceType}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white h-12">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectItem value="custom">Custom Design</SelectItem>
                                    <SelectItem value="realism">Realism</SelectItem>
                                    <SelectItem value="traditional">Traditional</SelectItem>
                                    <SelectItem value="coverup">Cover Up</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="placement" className="text-zinc-300">{t('form.idea.placement')}</Label>
                            <Input 
                                id="placement" 
                                value={formData.placement}
                                onChange={handleInputChange}
                                placeholder="e.g. Forearm, Back, Leg"
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 h-12" 
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="size" className="text-zinc-300">{t('form.idea.size')}</Label>
                            <Input 
                                id="size" 
                                value={formData.size}
                                onChange={handleInputChange}
                                placeholder="e.g. 15cm x 10cm"
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 h-12" 
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description" className="text-zinc-300">{t('form.idea.description')}</Label>
                            <Textarea 
                                id="description" 
                                value={formData.description}
                                onChange={handleInputChange}
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 min-h-[120px]" 
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                     <div className="space-y-2 mb-6">
                        <h4 className="text-xl font-heading text-white">{t('form.preferences.title')}</h4>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label className="text-zinc-300 text-lg">{t('form.preferences.artist')}</Label>
                            <RadioGroup 
                                defaultValue={formData.artist} 
                                onValueChange={(val) => handleSelectChange('artist', val)}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div className="relative">
                                    <RadioGroupItem value="any" id="r1" className="peer sr-only" />
                                    <Label
                                        htmlFor="r1"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <span className="text-white font-bold">{t('form.preferences.anyArtist')}</span>
                                        <span className="text-zinc-500 text-xs mt-1">Earliest availability</span>
                                    </Label>
                                </div>
                                <div className="relative">
                                    <RadioGroupItem value="alex" id="r2" className="peer sr-only" />
                                    <Label
                                        htmlFor="r2"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <span className="text-white font-bold">Alex "Ink" Ryker</span>
                                        <span className="text-zinc-500 text-xs mt-1">Realism Specialist</span>
                                    </Label>
                                </div>
                                <div className="relative">
                                    <RadioGroupItem value="elena" id="r3" className="peer sr-only" />
                                    <Label
                                        htmlFor="r3"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <span className="text-white font-bold">Elena Vance</span>
                                        <span className="text-zinc-500 text-xs mt-1">Traditional Specialist</span>
                                    </Label>
                                </div>
                                 <div className="relative">
                                    <RadioGroupItem value="marcus" id="r4" className="peer sr-only" />
                                    <Label
                                        htmlFor="r4"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <span className="text-white font-bold">Marcus Thorne</span>
                                        <span className="text-zinc-500 text-xs mt-1">Neotraditional Specialist</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="budget" className="text-zinc-300">{t('form.preferences.budget')}</Label>
                            <Select onValueChange={(val) => handleSelectChange('budget', val)} defaultValue={formData.budget}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white h-12">
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectItem value="low">$100 - $300</SelectItem>
                                    <SelectItem value="medium">$300 - $800</SelectItem>
                                    <SelectItem value="high">$800+</SelectItem>
                                    <SelectItem value="flexible">Flexible</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-zinc-300 text-lg">{t('form.preferences.contactMethod')}</Label>
                            <RadioGroup
                                defaultValue={formData.contactPreference}
                                onValueChange={(val) => handleSelectChange('contactPreference', val)}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                                <div className="relative">
                                    <RadioGroupItem value="email" id="c1" className="peer sr-only" />
                                    <Label
                                        htmlFor="c1"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <Mail className="w-6 h-6 text-zinc-400 mb-2 peer-data-[state=checked]:text-red-500" />
                                        <span className="text-white font-bold">{t('form.preferences.email')}</span>
                                        <span className="text-zinc-500 text-xs mt-1">{t('form.preferences.emailDesc')}</span>
                                    </Label>
                                </div>
                                <div className="relative">
                                    <RadioGroupItem value="whatsapp" id="c2" className="peer sr-only" />
                                    <Label
                                        htmlFor="c2"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <MessageCircle className="w-6 h-6 text-zinc-400 mb-2 peer-data-[state=checked]:text-red-500" />
                                        <span className="text-white font-bold">{t('form.preferences.whatsapp')}</span>
                                        <span className="text-zinc-500 text-xs mt-1">{t('form.preferences.whatsappDesc')}</span>
                                    </Label>
                                </div>
                                <div className="relative">
                                    <RadioGroupItem value="both" id="c3" className="peer sr-only" />
                                    <Label
                                        htmlFor="c3"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600 cursor-pointer transition-all"
                                    >
                                        <Send className="w-6 h-6 text-zinc-400 mb-2 peer-data-[state=checked]:text-red-500" />
                                        <span className="text-white font-bold">{t('form.preferences.both')}</span>
                                        <span className="text-zinc-500 text-xs mt-1">{t('form.preferences.bothDesc')}</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </motion.div>
            )}

             {step === 4 && (
                <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-center"
                >
                    <div className="space-y-4 mb-6">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="text-white w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-heading text-white">{t('form.review.title')}</h4>
                        <p className="text-zinc-400">{t('form.review.summaryText')}</p>
                    </div>

                    <div className="bg-zinc-950 p-6 rounded-lg text-left space-y-4 border border-zinc-800">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-zinc-500 text-xs uppercase tracking-wider">Name</span>
                                <span className="text-white">{formData.name || '-'}</span>
                            </div>
                             <div>
                                <span className="block text-zinc-500 text-xs uppercase tracking-wider">Service</span>
                                <span className="text-white capitalize">{formData.serviceType || '-'}</span>
                            </div>
                             <div>
                                <span className="block text-zinc-500 text-xs uppercase tracking-wider">Artist</span>
                                <span className="text-white capitalize">{formData.artist === 'any' ? 'First Available' : formData.artist}</span>
                            </div>
                             <div>
                                <span className="block text-zinc-500 text-xs uppercase tracking-wider">Budget</span>
                                <span className="text-white capitalize">{formData.budget || '-'}</span>
                            </div>
                             <div>
                                <span className="block text-zinc-500 text-xs uppercase tracking-wider">Contact Via</span>
                                <span className="text-white capitalize">{formData.contactPreference || 'email'}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

            <div className="flex justify-between mt-8 pt-8 border-t border-zinc-800">
                <Button 
                    variant="outline" 
                    onClick={prevStep} 
                    disabled={step === 1}
                    className="border-zinc-700 text-white hover:bg-zinc-800 disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {t('form.back')}
                </Button>
                
                {step < totalSteps ? (
                    <Button 
                        onClick={nextStep}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {t('form.next')}
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : isSuccess ? (
                    <Button 
                        disabled
                        className="bg-zinc-700 text-white min-w-[150px] cursor-default"
                    >
                        {t('form.sent')}
                        <Check className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white min-w-[150px]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {t('form.sending')}
                            </>
                        ) : (
                            <>
                                {t('form.submit')}
                                <Check className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                )}
            </div>

        </div>
      </div>
    </section>
  );
}
