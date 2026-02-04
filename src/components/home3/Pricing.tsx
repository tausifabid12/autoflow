import { Check, Sparkles, Crown, Rocket } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      icon: Sparkles,
      price: '99',
      description: 'Perfect for small businesses testing influencer marketing',
      features: [
        'Up to 5 campaigns per month',
        'Access to 1,000+ influencers',
        'Basic analytics dashboard',
        'Email support',
        'Campaign templates',
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false,
    },
    {
      name: 'Professional',
      icon: Crown,
      price: '299',
      description: 'For growing brands ready to scale their influence',
      features: [
        'Unlimited campaigns',
        'Access to 10,000+ influencers',
        'Advanced analytics & insights',
        'Priority support',
        'AI-powered matching',
        'White-label reports',
        'Team collaboration tools',
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 'Custom',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Advanced security features',
        'Custom contracts',
        'Onboarding & training',
      ],
      color: 'from-orange-500 to-red-500',
      popular: false,
    },
  ];

  return (
    <section className="py-32 px-6 relative bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Simple, <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan to supercharge your influencer marketing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative ${plan.popular ? 'lg:scale-110 lg:z-10' : ''}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
                    <span className="text-sm font-bold">MOST POPULAR</span>
                  </div>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500`}></div>

              <div className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full ${
                plan.popular ? 'border-purple-500/50' : 'border-white/10'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    {plan.price !== 'Custom' && (
                      <span className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                    )}
                    {plan.price === 'Custom' && (
                      <span className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    )}
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-400">/month</span>
                    )}
                  </div>
                </div>

                <button className={`w-full py-4 bg-gradient-to-r ${plan.color} rounded-xl font-bold mb-8 hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'shadow-xl shadow-purple-500/30' : ''
                }`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center mt-0.5`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
            Compare All Features
          </button>
        </div>
      </div>
    </section>
  );
}
