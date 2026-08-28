'use client';

import React from 'react';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';

export const FaqSection = () => {
  const faqs: FaqItem[] = [
    {
      q: 'What do UK food hygiene ratings (0 to 5) actually mean?',
      a: 'Food hygiene ratings are awarded by local council environmental health officers after an unannounced on-site inspection. 5 means "Very Good" standards (the highest possible tier), 4 is "Good", 3 is "Generally Satisfactory", 2 means "Improvement Necessary", 1 means "Major Improvement Necessary", and 0 means "Urgent Improvement Required".',
    },
    {
      q: 'Is it compulsory for restaurants in England to display their rating?',
      a: 'In Wales and Northern Ireland, food businesses are legally mandated to display their rating sticker on the front entrance or shop window. In England and Scotland, physical display is currently voluntary, but all ratings are legally required to be published publicly online on the FSA register.',
    },
    {
      q: 'How often are food businesses inspected by local councils?',
      a: 'Inspection frequency depends on the business risk level. High-risk food businesses (like takeaways, sushi restaurants, and care home kitchens) are inspected every 6 months. Medium-risk venues are inspected every 12 to 18 months, and low-risk shops every 2 to 3 years.',
    },
    {
      q: 'How is data on HygieneCheck.uk updated?',
      a: 'We automatically synchronize our entire national database every single night at 04:00 AM UTC with official Open Data files published by the UK Food Standards Agency (FSA) and 363 local councils under the Open Government Licence v3.0.',
    },
    {
      q: 'Can a restaurant request a re-inspection if they fixed their issues?',
      a: 'Yes. Food business operators have a statutory legal right to request a paid re-inspection from their local council (typically £150 to £300) once they have completed all required structural, cleaning, or paperwork improvements.',
    },
  ];

  return (
    <AccordionFaq
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about official UK food hygiene inspections and ratings."
      badge="Common Questions"
      items={faqs}
    />
  );
};
