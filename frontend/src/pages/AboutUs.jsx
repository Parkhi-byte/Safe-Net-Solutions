import React from 'react';
import { Shield, Users, Globe, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-6 mb-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-medium text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Securing the Future</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        We are building a <span className="text-primary">Safer Digital World</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        At SafeNet Solutions, we believe that security is a fundamental right, not a luxury.
                        We empower businesses and individuals with enterprise-grade encryption and seamless collaboration tools.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="container mx-auto px-4 md:px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-70"></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                To democratize cybersecurity by providing accessible, intuitive, and robust tools that protect your digital assets from evolving threats. We strive to make encryption and secure sharing the default standard for everyone.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'End-to-End Encryption',
                                    'Zero-Knowledge Privacy',
                                    'User-Centric Design'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-accent" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Global Impact</h3>
                                <p className="text-gray-600">Protecting data across borders with compliance-ready solutions for a connected world.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-accent/10 rounded-lg text-accent-dark">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
                                <p className="text-gray-600">Building a community of security-conscious individuals and businesses working together.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Uncompromising Security</h3>
                                <p className="text-gray-600">Leveraging state-of-the-art cryptographic standards to ensure your data remains yours.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 md:px-6 mb-16">
                <div className="bg-primary rounded-3xl p-12 text-center md:text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to secure your digital life?</h2>
                            <p className="text-primary-light text-lg">Join thousands of users who trust SafeNet Solutions with their most sensitive data.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
