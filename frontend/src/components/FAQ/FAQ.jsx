import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is this suitable for non-technical teams?',
      answer: 'Absolutely! SafeNet Solutions is designed with simplicity in mind. Our plug-and-play modules require no technical expertise to set up or manage. You can have enterprise-grade security running in minutes, with an intuitive dashboard that anyone on your team can use.'
    },
    {
      question: 'How does the modular pricing work?',
      answer: 'Our modular pricing means you only pay for the security features you need. Start with our free trial to explore all modules, then choose the ones that fit your business. Mix and match password management, encrypted chat, file sharing, and vulnerability scanning.'
    },
    {
      question: 'What security standards do you comply with?',
      answer: 'SafeNet Solutions is fully compliant with SOC 2 Type II, ISO 27001, GDPR, and HIPAA standards. We undergo regular third-party security audits and maintain industry-leading encryption standards. All data is encrypted at rest and in transit using AES-256 encryption.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no penalties or fees. There are no long-term contracts or commitments. If you cancel during your free trial, you won\'t be charged.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation, giving you time to export or migrate your information. After 30 days, all data is permanently deleted in accordance with our privacy policy.'
    },
    {
      question: 'Do you offer support for larger teams?',
      answer: 'Yes! We offer dedicated support plans for teams of 50+ members, including priority support, dedicated account managers, custom integrations, and advanced security features.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about SafeNet Solutions
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 text-lg pr-8">{faq.question}</span>
                <span className={`shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-white p-8 rounded-2xl max-w-2xl mx-auto border border-gray-100 shadow-sm">
          <p className="text-gray-900 font-semibold mb-4 text-lg">Still have questions?</p>
          <a
            href="mailto:support@safenet-solutions.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

