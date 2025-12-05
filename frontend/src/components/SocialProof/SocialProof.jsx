import React from 'react';
import { Quote, Activity, Lock, Users, ShieldCheck, CheckCircle } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      quote: 'SafeNet Solutions helped us secure retail operations across Mumbai within days. The India-ready templates saved weeks of implementation.',
      author: 'Parkhi',
      role: 'Security Operations Lead, Mumbai',
      avatar: 'P'
    },
    {
      quote: 'We monitor policy rollouts for our Lucknow data center directly from SafeNet. The visibility and automation are unmatched.',
      author: 'Satyam Katiyar',
      role: 'Infrastructure Manager, Lucknow',
      avatar: 'S'
    },
    {
      quote: 'Our fintech audits in Bengaluru are smoother because every session is encrypted end-to-end with detailed logs.',
      author: 'Prachi Gangwar',
      role: 'Compliance Lead, Bengaluru',
      avatar: 'P'
    },
    {
      quote: 'The platform keeps our distributed SOC in Kanpur collaborating securely, even during peak incident loads.',
      author: 'Sneha Gangwar',
      role: 'SOC Manager, Kanpur',
      avatar: 'S'
    },
    {
      quote: 'Rolling out secure chat for executives in Noida was effortless. SafeNet has become our central communication layer.',
      author: 'Shardul Saxena',
      role: 'CISO, Noida',
      avatar: 'S'
    }
  ];

  const certifications = [
    { name: 'SOC 2', icon: '🏆' },
    { name: 'ISO 27001', icon: '✅' },
    { name: 'GDPR', icon: '🔒' },
    { name: 'HIPAA', icon: '⚕️' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-gray-50 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">70%</div>
            <div className="text-gray-600 font-medium">of cyber attacks target SMEs</div>
          </div>
          <div className="p-8 rounded-2xl bg-gray-50 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
            <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">$200K+</div>
            <div className="text-gray-600 font-medium">average cost of a data breach</div>
          </div>
          <div className="p-8 rounded-2xl bg-gray-50 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
            <div className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">businesses protected</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Growing Businesses</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-xs text-gray-500 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Compliance & Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full border border-gray-100 text-gray-700 font-medium">
                <span className="text-xl">{cert.icon}</span>
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

