import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, MessageSquareLock, FileKey, ScanEye, ArrowRight } from 'lucide-react';

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Key,
      title: 'Password Manager',
      description: 'Secure credential storage with enterprise-grade encryption. Never lose access to critical accounts with our centralized password vault.',
      color: 'bg-blue-500',
      text: 'text-blue-500',
      bg: 'bg-blue-50',
      link: '/password-manager'
    },
    {
      icon: MessageSquareLock,
      title: 'Encrypted Chat',
      description: 'End-to-end secure messaging for your team. Communicate sensitive information without worrying about interception or data breaches.',
      color: 'bg-teal-500',
      text: 'text-teal-500',
      bg: 'bg-teal-50',
      link: '/secure-chat'
    },
    {
      icon: FileKey,
      title: 'Safe File Sharing',
      description: 'Protected document transfer with access controls and expiration dates. Share confidential files with confidence and track access.',
      color: 'bg-indigo-500',
      text: 'text-indigo-500',
      bg: 'bg-indigo-50',
      link: '/file-sharing'
    },
    {
      icon: ScanEye,
      title: 'Vulnerability Scanner',
      description: 'SQL injection detection and automated security scanning. Identify vulnerabilities before attackers do with our intelligent threat detection.',
      color: 'bg-emerald-500',
      text: 'text-emerald-500',
      bg: 'bg-emerald-50',
      link: '/vulnerability-scanner'
    }
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Security Suite</h2>
          <p className="text-xl text-gray-600">
            Everything you need to protect your business, all in one platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {feature.description}
              </p>

              <button
                type="button"
                className={`flex items-center gap-2 text-sm font-semibold ${feature.text} group-hover:gap-3 transition-all`}
                onClick={() => navigate(feature.link)}
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

