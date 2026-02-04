import { FileText, Search, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: 'Post a Campaign',
      description: 'Create your campaign brief, set your budget, and define your target audience in minutes',
      color: 'from-pink-500 to-rose-500',
      delay: '0',
    },
    {
      icon: Search,
      title: 'Find Influencers',
      description: 'Browse through thousands of verified creators or let our AI match you with perfect partners',
      color: 'from-purple-500 to-indigo-500',
      delay: '200',
    },
    {
      icon: BarChart3,
      title: 'Track Performance',
      description: 'Monitor real-time analytics, engagement metrics, and ROI from your unified dashboard',
      color: 'from-cyan-500 to-blue-500',
      delay: '400',
    },
  ];

  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            How It <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Launch your influencer campaign in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                  <step.icon className="w-10 h-10" />
                </div>

                <div className="absolute top-8 right-8 text-7xl font-black text-white/5 group-hover:text-white/10 transition-all duration-500">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
