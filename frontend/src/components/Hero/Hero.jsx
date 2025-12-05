import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Zap, Coins, TrendingUp, Play, ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTrialClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Content Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100 animate-fade-in-up">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-semibold">Trusted by 500+ SMEs</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Enterprise Cybersecurity for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Growing Businesses
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Affordable, modular protection for startups and SMEs without the technical complexity.
              Get enterprise-grade security that scales with your business.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-yellow-100 text-yellow-600">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Plug-and-play</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-green-100 text-green-600">
                  <Coins className="w-4 h-4" />
                </div>
                <span>Affordable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-purple-100 text-purple-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>Scalable</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/register"
                className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/25 min-w-[200px] ${isLoading ? 'opacity-90 cursor-wait' : ''
                  }`}
                onClick={handleTrialClick}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Starting...</span>
                  </>
                ) : (
                  <>
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Link>

              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all min-w-[200px]"
                onClick={() => console.log('Demo')}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>14-day Free Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No CC Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>

              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">System Status</div>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Protected
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Uptime</div>
                    <div className="font-bold text-gray-900">99.9%</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Threats Blocked</span>
                    <span className="font-bold text-gray-900">1,284</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[75%]" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                    <div className="text-accent mb-1"><Lock className="w-6 h-6 mx-auto" /></div>
                    <div className="text-xs font-semibold text-gray-900">Encrypted</div>
                  </div>
                  <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                    <div className="text-blue-500 mb-1"><Zap className="w-6 h-6 mx-auto" /></div>
                    <div className="text-xs font-semibold text-gray-900">Fast</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background blobs for visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

