import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MessageSquare, FileText, Activity, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePassword } from '../contexts/PasswordContext';
import { useChat } from '../contexts/ChatContext';
import { useFileContext } from '../contexts/FileContext';
import { formatBytes } from '../utils/fileUtils';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Connect to contexts for real data
    const { passwords, getSecurityStats } = usePassword();
    const { contacts } = useChat();
    const { files, storageUsage } = useFileContext();

    const [securityScore, setSecurityScore] = useState(0);
    const [stats, setStats] = useState({
        passwords: 0,
        weakPasswords: 0,
        contacts: 0,
        files: 0,
        storageUsed: 0
    });

    useEffect(() => {
        const secStats = getSecurityStats();
        setSecurityScore(secStats.securityScore);

        setStats({
            passwords: passwords.length,
            weakPasswords: secStats.weakCount,
            contacts: contacts.length,
            files: files.length,
            storageUsed: storageUsage.used
        });
    }, [passwords, contacts, files, storageUsage, getSecurityStats]);

    const features = [
        {
            title: 'Password Manager',
            description: 'Secure credential storage with enterprise-grade encryption.',
            icon: Shield,
            path: '/password-manager',
            bgClass: 'bg-blue-500/10',
            iconClass: 'text-blue-500',
            stat: `${stats.passwords} Credentials Stored`,
            status: securityScore < 70 ? 'Action Needed' : 'Secure',
            statusColor: securityScore < 70 ? 'text-amber-600' : 'text-green-600'
        },
        {
            title: 'Encrypted Chat',
            description: 'End-to-end secure messaging for your team.',
            icon: MessageSquare,
            path: '/secure-chat',
            bgClass: 'bg-green-500/10',
            iconClass: 'text-green-500',
            stat: `${stats.contacts} Active Contacts`,
            status: 'Online',
            statusColor: 'text-green-600'
        },
        {
            title: 'Safe File Sharing',
            description: 'Protected document transfer with access controls.',
            icon: FileText,
            path: '/file-sharing',
            bgClass: 'bg-purple-500/10',
            iconClass: 'text-purple-500',
            stat: `${stats.files} Files (${formatBytes(stats.storageUsed)})`,
            status: 'Synced',
            statusColor: 'text-green-600'
        },
        {
            title: 'Vulnerability Scanner',
            description: 'SQL injection detection and automated security scanning.',
            icon: Activity,
            path: '/vulnerability-scanner',
            bgClass: 'bg-red-500/10',
            iconClass: 'text-red-500',
            stat: 'Last Scan: 2h ago',
            status: 'System Healthy',
            statusColor: 'text-green-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
                        </h1>
                        <p className="mt-2 text-gray-600">
                            System Status: <span className="font-semibold text-green-600">Operational</span> • Security Score: <span className={`font-bold ${securityScore < 70 ? 'text-amber-600' : 'text-green-600'}`}>{securityScore}%</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm">
                            View Audit Log
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium transition-colors shadow-sm hover:shadow-md">
                            Run Quick Scan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(feature.path)}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col h-full"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`${feature.bgClass} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className={`w-7 h-7 ${feature.iconClass}`} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-50 ${feature.statusColor} border border-gray-100`}>
                                        {feature.status}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                    {feature.description}
                                </p>

                                <div className="pt-4 border-t border-gray-50">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">{feature.stat}</span>
                                        <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions / Recent Activity Section */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-gray-400" />
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {/* Mock activity items */}
                            {[1].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Security Audit Completed</p>
                                        <p className="text-xs text-gray-500">System scan finished successfully with no critical issues found.</p>
                                    </div>
                                    <span className="text-xs text-gray-400">2h ago</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">System Optimization</p>
                                    <p className="text-xs text-gray-500">Database performance tuning completed automatically.</p>
                                </div>
                                <span className="text-xs text-gray-400">5h ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                        <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                            Enable Two-Factor Authentication (2FA) to add an extra layer of security to your account.
                        </p>
                        <button className="w-full py-2.5 bg-white text-primary font-bold rounded-lg hover:bg-opacity-90 transition-opacity text-sm">
                            Enable 2FA Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
