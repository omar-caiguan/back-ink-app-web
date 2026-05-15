'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "Do I need an appointment?",
    answer: "Yes, we work primarily by appointment. We do accept walk-ins based on artist availability, but booking in advance is highly recommended.",
  },
  {
    question: "How do I care for my new tattoo?",
    answer: "We will provide you with detailed aftercare instructions. Generally, keep it clean, moisturized with recommended ointment, and avoid sun exposure and swimming for 2 weeks.",
  },
  {
    question: "Is a deposit required?",
    answer: "Yes, a non-refundable deposit is required to secure your booking. This deposit goes towards the final cost of your tattoo.",
  },
  {
    question: "What shouldn't I do before a tattoo?",
    answer: "Do not drink alcohol or take blood-thinning medication 24 hours before your session. Make sure to eat a good meal and stay hydrated.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-black/90 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="text-red-700 font-medium tracking-widest uppercase text-sm mb-4">Common Questions</h2>
           <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase">FAQ</h3>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-zinc-800">
              <AccordionTrigger className="text-white hover:text-red-700 hover:no-underline text-lg font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
