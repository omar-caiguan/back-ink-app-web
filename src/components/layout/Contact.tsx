'use client';

import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
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
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
  addDays,
} from 'date-fns';
import { es as esLocale, pt as ptLocale, enUS } from 'date-fns/locale';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  ImagePlus,
  CalendarDays,
  Loader2,
  AlertCircle,
  PenTool,
  Ruler,
  MapPin,
  Clock,
  Sun,
  Moon,
  MessageSquare,
  Send,
  RefreshCw,
} from 'lucide-react';

export function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const dfnsLocale = locale === 'es' ? esLocale : locale === 'pt' ? ptLocale : enUS;
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    phoneCountry: '+56',
    phoneNumber: '',
    email: '',
    ageConfirmed: false,
    // Step 2
    tattooStyle: '',
    colorType: '',
    description: '',
    // Step 3
    placement: '',
    size: '',
    references: null as FileList | null,
    // Step 4
    artist: '',
    scheduleDate: '',
    scheduleTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      phoneCountry: '+56',
      phoneNumber: '',
      email: '',
      ageConfirmed: false,
      tattooStyle: '',
      colorType: '',
      description: '',
      placement: '',
      size: '',
      references: null,
      artist: '',
      scheduleDate: '',
      scheduleTime: '',
    });
    setStep(1);
    setErrors({});
    setIsSuccess(false);
    setCalendarMonth(new Date());
  };

  const totalSteps = 5;

  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const validateStep = useCallback((currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = t('errors.required');
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = t('errors.required');
      if (!formData.ageConfirmed) newErrors.ageConfirmed = t('errors.ageRequired');
    }

    if (currentStep === 2) {
      if (!formData.tattooStyle) newErrors.tattooStyle = t('errors.required');
      if (!formData.colorType) newErrors.colorType = t('errors.required');
    }

    if (currentStep === 3) {
      if (!formData.placement.trim()) newErrors.placement = t('errors.required');
      if (!formData.size) newErrors.size = t('errors.required');
    }

    if (currentStep === 4) {
      if (!formData.artist) newErrors.artist = t('errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      toast.error(t('errors.fixFields'));
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: checked }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, references: e.target.files }));
  };

  const generateWhatsAppLink = () => {
    const sizeLabel: Record<string, string> = {
      small: t('sizes.small'),
      medium: t('sizes.medium'),
      large: t('sizes.large'),
    };
    const colorLabel = formData.colorType === 'black' ? t('colors.black') : t('colors.color');
    const artistLabel = formData.artist === 'any' ? t('anyArtist') : formData.artist;
    const scheduleValue = formData.scheduleDate || formData.scheduleTime
      ? `${formData.scheduleDate}${formData.scheduleTime ? ' ' + formData.scheduleTime : ''}`
      : '';
    const greeting = t('whatsapp.greeting', { name: formData.name });
    const message = encodeURIComponent(
      `${greeting}\n\n` +
      `*${t('whatsapp.title')}*\n\n` +
      `*${t('whatsapp.name')}:* ${formData.name}\n` +
      `*${t('whatsapp.phone')}:* ${formData.phoneCountry} ${formData.phoneNumber}\n` +
      (formData.email ? `*${t('whatsapp.email')}:* ${formData.email}\n` : '') +
      `*${t('whatsapp.style')}:* ${formData.tattooStyle}\n` +
      `*${t('whatsapp.color')}:* ${colorLabel}\n` +
      `*${t('whatsapp.placement')}:* ${formData.placement}\n` +
      `*${t('whatsapp.size')}:* ${sizeLabel[formData.size] || formData.size}\n` +
      `*${t('whatsapp.artist')}:* ${artistLabel}\n` +
      (scheduleValue ? `*${t('whatsapp.schedule')}:* ${scheduleValue}\n` : '') +
      (formData.description ? `\n*${t('whatsapp.description')}:*\n${formData.description}` : '')
    );
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56930579869';
    return `https://wa.me/${phone}?text=${message}`;
  };

  const handleSubmit = async (withWhatsApp: boolean) => {
    if (!validateStep(step)) {
      toast.error(t('errors.fixFields'));
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduleValue = formData.scheduleDate || formData.scheduleTime
        ? `${formData.scheduleDate}${formData.scheduleTime ? ' ' + formData.scheduleTime : ''}`
        : undefined;

      const payload = new FormData();
      payload.append('name', formData.name);
      if (formData.email) payload.append('email', formData.email);
      payload.append('phone', `${formData.phoneCountry} ${formData.phoneNumber}`);
      payload.append('tattooStyle', formData.tattooStyle);
      payload.append('colorType', formData.colorType);
      if (formData.description) payload.append('description', formData.description);
      payload.append('placement', formData.placement);
      payload.append('size', formData.size);
      payload.append('artist', formData.artist);
      if (scheduleValue) payload.append('schedulePreference', scheduleValue);
      payload.append('locale', locale);

      if (formData.references) {
        Array.from(formData.references).forEach((file) => {
          payload.append('references', file);
        });
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send request');
      }

      setIsSuccess(true);
      toast.success(t('form.sent'));

      if (withWhatsApp) {
        const waLink = generateWhatsAppLink();
        window.open(waLink, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || t('errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    { number: 1, title: t('steps.1'), subtitle: t('steps.1sub') },
    { number: 2, title: t('steps.2'), subtitle: t('steps.2sub') },
    { number: 3, title: t('steps.3'), subtitle: t('steps.3sub') },
    { number: 4, title: t('steps.4'), subtitle: t('steps.4sub') },
    { number: 5, title: t('steps.5'), subtitle: t('steps.5sub') },
  ];

  const weekDays = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), 'EEE', { locale: dfnsLocale }));
  }, [dfnsLocale]);
  const morningSlots = ['10:00', '11:00', '12:00', '13:00'];
  const afternoonSlots = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(calendarMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [calendarMonth]);

  const today = startOfDay(new Date());

  const countryOptions = [
    { code: 'CL', flag: '🇨🇱', dial: '+56', name: 'Chile' },
    { code: 'AR', flag: '🇦🇷', dial: '+54', name: 'Argentina' },
    { code: 'BO', flag: '🇧🇴', dial: '+591', name: 'Bolivia' },
    { code: 'BR', flag: '🇧🇷', dial: '+55', name: 'Brasil' },
    { code: 'CO', flag: '🇨🇴', dial: '+57', name: 'Colombia' },
    { code: 'CR', flag: '🇨🇷', dial: '+506', name: 'Costa Rica' },
    { code: 'EC', flag: '🇪🇨', dial: '+593', name: 'Ecuador' },
    { code: 'ES', flag: '🇪🇸', dial: '+34', name: 'España' },
    { code: 'GT', flag: '🇬🇹', dial: '+502', name: 'Guatemala' },
    { code: 'MX', flag: '🇲🇽', dial: '+52', name: 'México' },
    { code: 'PA', flag: '🇵🇦', dial: '+507', name: 'Panamá' },
    { code: 'PE', flag: '🇵🇪', dial: '+51', name: 'Perú' },
    { code: 'PY', flag: '🇵🇾', dial: '+595', name: 'Paraguay' },
    { code: 'US', flag: '🇺🇸', dial: '+1', name: 'United States' },
    { code: 'UY', flag: '🇺🇾', dial: '+598', name: 'Uruguay' },
    { code: 'VE', flag: '🇻🇪', dial: '+58', name: 'Venezuela' },
  ];

  const tattooStyles = [
    'Realismo', 'Fine Line', 'Tradicional', 'Blackwork',
    'Neotradicional', 'Japonés', 'Geométrico', 'Lettering', 'Otro'
  ];

  const bodyPlacements = [
    { key: 'arm', label: t('placements.arm') },
    { key: 'forearm', label: t('placements.forearm') },
    { key: 'back', label: t('placements.back') },
    { key: 'chest', label: t('placements.chest') },
    { key: 'leg', label: t('placements.leg') },
    { key: 'ankle', label: t('placements.ankle') },
    { key: 'neck', label: t('placements.neck') },
    { key: 'wrist', label: t('placements.wrist') },
    { key: 'hand', label: t('placements.hand') },
    { key: 'ribs', label: t('placements.ribs') },
    { key: 'hip', label: t('placements.hip') },
    { key: 'other', label: t('placements.other') },
  ];

  return (
    <section id="contact" className="py-24 bg-black/90 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-red-700 font-medium tracking-widest uppercase text-sm mb-4">{t('title')}</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase">{t('heading')}</h3>
        </motion.div>

        {/* Step Counter Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-red-700 font-heading">{step}</span>
            <span className="text-xl text-zinc-500 font-heading">/ {totalSteps}</span>
          </div>
          <div className="text-right">
            <p className="text-white font-medium text-sm uppercase tracking-wider">{stepTitles[step - 1].title}</p>
            <p className="text-zinc-500 text-xs">{stepTitles[step - 1].subtitle}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-800 rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-red-700"
            initial={false}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-10 rounded-xl backdrop-blur-sm shadow-2xl">
          <AnimatePresence mode="wait">
            {/* STEP 1: Contact Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-300 flex items-center gap-1">
                      {t('form.step1.name')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('form.step1.namePlaceholder')}
                      className={cn(
                        "bg-zinc-950 border-zinc-800 text-white focus:border-red-700 h-12",
                        errors.name && "border-red-700 focus:border-red-700"
                      )}
                    />
                    {errors.name && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      {t('form.step1.phone')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <div className="grid grid-cols-[130px_1fr] gap-3">
                      <Select
                        onValueChange={(val) => {
                          setFormData((prev) => ({ ...prev, phoneCountry: val }));
                        }}
                        value={formData.phoneCountry}
                      >
                        <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white h-12 px-2">
                          <SelectValue placeholder="+56" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-zinc-800 text-white max-h-[280px]">
                          {countryOptions.map((c) => (
                            <SelectItem key={c.code} value={c.dial}>
                              <span className="flex items-center gap-2">
                                <span>{c.flag}</span>
                                <span className="text-zinc-400 text-xs">{c.dial}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }));
                          if (errors.phoneNumber) setErrors((prev) => { const n = { ...prev }; delete n.phoneNumber; return n; });
                        }}
                        placeholder={t('form.step1.phonePlaceholder')}
                        className={cn(
                          "bg-zinc-950 border-zinc-800 text-white focus:border-red-700 h-12",
                          errors.phoneNumber && "border-red-700 focus:border-red-700"
                        )}
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phoneNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">
                      {t('form.step1.email')}
                      <span className="text-zinc-600 text-xs ml-2">({t('form.optional')})</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('form.step1.emailPlaceholder')}
                      className="bg-zinc-950 border-zinc-800 text-white focus:border-red-700 h-12"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="ageConfirmed"
                      checked={formData.ageConfirmed}
                      onChange={(e) => handleCheckboxChange('ageConfirmed', e.target.checked)}
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0 rounded border border-zinc-600 bg-zinc-950 text-red-700 accent-red-700 focus:ring-red-700 cursor-pointer",
                        errors.ageConfirmed && "border-red-700"
                      )}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="ageConfirmed" className="text-zinc-300 text-sm cursor-pointer">
                        {t('form.step1.ageConfirm')}
                        <span className="text-red-700 ml-1">*</span>
                      </Label>
                      {errors.ageConfirmed && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.ageConfirmed}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Creative Idea */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      <PenTool className="w-4 h-4 text-red-700" />
                      {t('form.step2.style')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <Select
                      onValueChange={(val) => handleSelectChange('tattooStyle', val)}
                      value={formData.tattooStyle}
                    >
                      <SelectTrigger className={cn(
                        "bg-zinc-950 border-zinc-800 text-white h-12",
                        errors.tattooStyle && "border-red-700"
                      )}>
                        <SelectValue placeholder={t('form.step2.stylePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                        {tattooStyles.map((style) => (
                          <SelectItem key={style} value={style.toLowerCase()}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.tattooStyle && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.tattooStyle}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      {t('form.step2.color')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.colorType}
                      onValueChange={(val) => handleSelectChange('colorType', val)}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="relative">
                        <RadioGroupItem value="black" id="color-black" className="peer sr-only" />
                        <Label
                          htmlFor="color-black"
                          className={cn(
                            "flex flex-col items-center rounded-md border-2 bg-zinc-950 p-4 hover:bg-zinc-900 cursor-pointer transition-all",
                            formData.colorType === 'black'
                              ? "border-red-700"
                              : "border-zinc-800"
                          )}
                        >
                          <span className="text-white font-bold">{t('colors.black')}</span>
                        </Label>
                      </div>
                      <div className="relative">
                        <RadioGroupItem value="color" id="color-color" className="peer sr-only" />
                        <Label
                          htmlFor="color-color"
                          className={cn(
                            "flex flex-col items-center rounded-md border-2 bg-zinc-950 p-4 hover:bg-zinc-900 cursor-pointer transition-all",
                            formData.colorType === 'color'
                              ? "border-red-700"
                              : "border-zinc-800"
                          )}
                        >
                          <span className="text-white font-bold">{t('colors.color')}</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.colorType && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.colorType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-zinc-300">
                      {t('form.step2.description')}
                      <span className="text-zinc-600 text-xs ml-2">({t('form.optional')})</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={t('form.step2.descriptionPlaceholder')}
                      className="bg-zinc-950 border-zinc-800 text-white focus:border-red-700 min-h-[100px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Technical Specs */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-red-700" />
                      {t('form.step3.placement')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <Select
                      onValueChange={(val) => handleSelectChange('placement', val)}
                      value={formData.placement}
                    >
                      <SelectTrigger className={cn(
                        "bg-zinc-950 border-zinc-800 text-white h-12",
                        errors.placement && "border-red-700"
                      )}>
                        <SelectValue placeholder={t('form.step3.placementPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800 text-white max-h-[280px]">
                        {bodyPlacements.map((p) => (
                          <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.placement && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.placement}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      <Ruler className="w-4 h-4 text-red-700" />
                      {t('form.step3.size')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.size}
                      onValueChange={(val) => handleSelectChange('size', val)}
                      className="grid grid-cols-3 gap-3"
                    >
                      {[
                        { value: 'small', label: t('sizes.small') },
                        { value: 'medium', label: t('sizes.medium') },
                        { value: 'large', label: t('sizes.large') },
                      ].map((opt) => (
                        <div key={opt.value} className="relative">
                          <RadioGroupItem value={opt.value} id={`size-${opt.value}`} className="peer sr-only" />
                          <Label
                            htmlFor={`size-${opt.value}`}
                            className={cn(
                              "flex flex-col items-center rounded-md border-2 bg-zinc-950 p-4 hover:bg-zinc-900 cursor-pointer transition-all",
                              formData.size === opt.value
                                ? "border-red-700"
                                : "border-zinc-800"
                            )}
                          >
                            <span className="text-white font-bold text-sm">{opt.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.size && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.size}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      <ImagePlus className="w-4 h-4 text-zinc-400" />
                      {t('form.step3.references')}
                      <span className="text-zinc-600 text-xs ml-2">({t('form.optional')})</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-zinc-950 border-zinc-800 text-white focus:border-red-700 h-12 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-700 file:text-white file:text-sm hover:file:bg-red-800"
                      />
                    </div>
                    <p className="text-zinc-600 text-xs">{t('form.step3.referencesHint')}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Artist & Schedule */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 flex items-center gap-1">
                      <User className="w-4 h-4 text-red-700" />
                      {t('form.step4.artist')}
                      <span className="text-red-700">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.artist}
                      onValueChange={(val) => handleSelectChange('artist', val)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      {[
                        { value: 'any', label: t('form.preferences.anyArtist'), sub: t('form.preferences.anyArtistSub') },
                        { value: 'alex', label: 'Alex "Ink" Ryker', sub: 'Realismo & Blackwork' },
                        { value: 'elena', label: 'Elena Vance', sub: 'Tradicional & Color' },
                        { value: 'marcus', label: 'Marcus Thorne', sub: 'Neotradicional' },
                      ].map((opt) => (
                        <div key={opt.value} className="relative">
                          <RadioGroupItem value={opt.value} id={`artist-${opt.value}`} className="peer sr-only" />
                          <Label
                            htmlFor={`artist-${opt.value}`}
                            className={cn(
                              "flex flex-col rounded-md border-2 bg-zinc-950 p-4 hover:bg-zinc-900 cursor-pointer transition-all",
                              formData.artist === opt.value
                                ? "border-red-700"
                                : "border-zinc-800"
                            )}
                          >
                            <span className="text-white font-bold">{opt.label}</span>
                            <span className="text-zinc-500 text-xs mt-1">{opt.sub}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.artist && <p className="text-red-700 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.artist}</p>}
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 5: Schedule Visual Calendar + Time Slots */}
            {step === 5 && (
              <motion.div
                key={isSuccess ? 'step5-success' : 'step5'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {isSuccess ? (
                  /* Success Screen */
                  <div className="text-center py-6 space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-600/10 border border-green-600/30 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">{t('success.title')}</h3>
                      <p className="text-zinc-400 text-sm max-w-sm mx-auto">{t('success.message')}</p>
                    </div>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {t('success.newRequest')}
                    </Button>
                  </div>
                ) : (
                  /* Calendar + Time Slots Layout */
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
                    {/* Left: Calendar */}
                    <div className="space-y-2">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-xs">
                          {format(calendarMonth, 'MMMM yyyy', { locale: dfnsLocale })}
                        </h4>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setCalendarMonth((prev) => subMonths(prev, 1))}
                            className="p-1 rounded border border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setCalendarMonth((prev) => addMonths(prev, 1))}
                            className="p-1 rounded border border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Weekday Labels */}
                      <div className="grid grid-cols-7 gap-px">
                        {weekDays.map((d) => (
                          <div key={d} className="text-center text-[9px] text-zinc-500 font-medium py-0.5">
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-px">
                        {calendarDays.map((day) => {
                          const isCurrentMonth = isSameMonth(day, calendarMonth);
                          const isSelected = formData.scheduleDate && isSameDay(day, new Date(formData.scheduleDate));
                          const isPast = isBefore(day, today);
                          return (
                            <button
                              key={day.toISOString()}
                              type="button"
                              disabled={isPast}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  scheduleDate: format(day, 'yyyy-MM-dd'),
                                  scheduleTime: '',
                                }));
                              }}
                              className={cn(
                                "h-7 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-center",
                                !isCurrentMonth && "text-zinc-700",
                                isCurrentMonth && !isSelected && !isPast && "text-zinc-300 hover:bg-zinc-900",
                                isSelected && "bg-red-700 text-white",
                                isPast && "text-zinc-700 cursor-not-allowed opacity-50"
                              )}
                            >
                              {format(day, 'd')}
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Date Display */}
                      {formData.scheduleDate && (
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 pt-1">
                          <CalendarDays className="w-3 h-3 text-red-700" />
                          <span>{format(new Date(formData.scheduleDate), 'EEEE, d MMM', { locale: dfnsLocale })}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Time Slots */}
                    <div className="space-y-4">
                      {formData.scheduleDate ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {/* Morning */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                              <Sun className="w-3 h-3 text-yellow-500" />
                              {t('schedule.morning')}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {morningSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, scheduleTime: slot }));
                                  }}
                                  className={cn(
                                    "px-3 py-1.5 rounded border text-xs font-medium transition-colors cursor-pointer",
                                    formData.scheduleTime === slot
                                      ? "border-red-700 bg-red-700/10 text-red-700"
                                      : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900"
                                  )}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Afternoon */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                              <Moon className="w-3 h-3 text-blue-400" />
                              {t('schedule.afternoon')}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {afternoonSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, scheduleTime: slot }));
                                  }}
                                  className={cn(
                                    "px-3 py-1.5 rounded border text-xs font-medium transition-colors cursor-pointer",
                                    formData.scheduleTime === slot
                                      ? "border-red-700 bg-red-700/10 text-red-700"
                                      : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900"
                                  )}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Selected summary */}
                          {formData.scheduleTime && (
                            <div className="pt-2 border-t border-zinc-800">
                              <p className="text-xs text-zinc-400">
                                {t('form.step5.selected')}: <span className="text-red-700 font-medium">{format(new Date(formData.scheduleDate), 'EEEE, d MMM', { locale: dfnsLocale })} — {formData.scheduleTime}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full min-h-[140px] text-center space-y-2">
                          <CalendarDays className="w-8 h-8 text-zinc-700" />
                          <p className="text-zinc-500 text-xs">{t('form.step5.selectDate')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!isSuccess && (
                  <p className="text-zinc-600 text-[10px]">{t('form.step5.hint')}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-zinc-800">
            {isSuccess ? (
              <div />
            ) : (
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-red-700 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t('form.back')}
              </Button>
            )}

            {isSuccess ? (
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-red-700 hover:text-white cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('success.newRequest')}
              </Button>
            ) : step < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-red-700 hover:bg-red-800 text-white cursor-pointer"
              >
                {t('form.next')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : isSubmitting ? (
              <Button
                disabled
                className="bg-zinc-700 text-white cursor-default"
              >
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('form.sending')}
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={() => handleSubmit(false)}
                  variant="outline"
                  className="border-red-700 text-red-700 hover:bg-red-700 hover:text-white cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('form.submitOnly')}
                </Button>
                <Button
                  onClick={() => handleSubmit(true)}
                  className="bg-red-700 hover:bg-red-800 text-white cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t('form.submitAndWhatsApp')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
