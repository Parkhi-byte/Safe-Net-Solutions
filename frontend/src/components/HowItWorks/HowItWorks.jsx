import React from 'react';
import { UserPlus, Layout, ShieldCheck, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up in 60 Seconds',
      description: 'Create your account with just your email. No credit card required, no lengthy forms. Get started instantly and secure your business today.',
      icon: UserPlus
    },
    {
      number: '02',
      title: 'Choose Your Modules',
      description: 'Select the security features you need. Mix and match modules to create a custom security package that fits your business perfectly.',
      icon: Layout
    },
    {
      number: '03',
      title: 'Stay Protected',
      description: 'Your security is now active. Monitor threats, manage access, and scale your protection as your business grows. We handle the complexity.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">
            Get enterprise-grade security up and running in minutes, not months
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 relative z-10">
                <step.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[2.5rem] left-1/2 w-full h-[2px] bg-gray-200 -z-0 transform translate-x-1/2" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            View Pricing Plans <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

