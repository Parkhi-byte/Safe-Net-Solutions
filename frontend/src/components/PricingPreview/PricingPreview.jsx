import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

const PricingPreview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const features = [
    '14-day free trial',
    'All core security modules',
    'Up to 10 team members',
    '24/7 email support',
    'No credit card required',
    'Cancel anytime'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Start Your Free Trial Today</h2>
          <p className="text-xl text-gray-600">
            Experience enterprise-grade security without the enterprise price tag
          </p>
        </div>

        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>

          <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full shadow-lg">
              Most Popular
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-2xl text-gray-500">$</span>
                <span className="text-6xl font-extrabold text-gray-900">0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Free Trial</h3>
              <p className="text-gray-600 font-medium">
                Full access for 14 days. No commitment.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="p-1 rounded-full bg-green-100 text-green-600 shrink-0">
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <span className="text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-center">
              <Link
                to="/register"
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 ${isLoading ? 'opacity-90 cursor-wait' : ''
                  }`}
                onClick={handleSignup}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Starting...</span>
                  </>
                ) : (
                  <>
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Link>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 max-w-2xl mx-auto text-gray-500">
          <p>
            <strong className="text-gray-700">After your trial:</strong> Choose from flexible monthly or annual plans starting at $29/month.
            Pay only for the modules you need.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;

