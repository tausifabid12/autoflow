'use client'
import React, { useState } from 'react';
import { ChevronDown, Shield, Lock, Eye, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="w-5 h-5" />,
      content: [
        { label: "Personal Information", desc: "Name, email address, phone number, date, time and place of birth, profile picture (optional)" },
        { label: "Usage Information", desc: "App usage data, device info" },
        { label: "Cookies and Tracking", desc: "Used to enhance experience and deliver personalized content" }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Shield className="w-5 h-5" />,
      content: [
        "Provide personalized astrology readings and horoscopes",
        "Improve the app's features and performance",
        "Communicate updates, offers, and notifications (with your consent)",
        "Conduct analytics and research to understand user preferences",
        "Prevent fraud and ensure security"
      ]
    },
    {
      title: "Sharing Your Information",
      icon: <Mail className="w-5 h-5" />,
      content: ["We do not sell or rent your personal information. We may share your data with trusted service providers to help deliver app features, and when required by law."]
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: ["We implement industry-standard security measures to protect your information from unauthorized access or disclosure."]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-indigo-100 text-lg">Effective Date: <strong>November 27, 2025</strong></p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-indigo-600">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-indigo-600">MyAstroGuru</span> values your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our astrology app.
          </p>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-8">
          {sections.map((section, idx) => (
            <div key={idx} className="group">
              <button
                onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex items-center justify-between border-l-4 border-indigo-600 hover:border-purple-600"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="text-indigo-600 group-hover:text-purple-600 transition-colors">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{section.title}</h2>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${expandedSection === idx ? 'rotate-180' : ''}`} />
              </button>

              {expandedSection === idx && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-b-xl p-6 space-y-4 border-l-4 border-indigo-600">
                  {Array.isArray(section.content[0]) || typeof section.content[0] === 'object' ? (
                    section.content.map((item: any, i: number) => (
                      <div key={i} className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-gray-800 mb-2">{item.label || item}</p>
                        {item.desc && <p className="text-gray-600 text-sm">{item.desc}</p>}
                      </div>
                    ))
                  ) : (
                    section.content.map((item: any, i: number) => (
                      <>
                      <div key={i} className="flex gap-3">
                        <div className="text-indigo-600 mt-1">✓</div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                      </>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Static Sections */}
        <div className="space-y-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
              <Eye className="w-5 h-5 text-purple-600" />
              Your Choices
            </h2>
            <p className="text-gray-700">You can manage your preferences and delete your account by contacting us at <span className="font-semibold text-purple-600">getcreator.online@gmail.com</span></p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              Contact Us
            </h2>
            <p className="text-gray-700">If you have questions about this Privacy Policy, please contact us at: <span className="font-semibold text-indigo-600">getcreator.online@gmail.com</span></p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">© 2025 MyAstroGuru. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;