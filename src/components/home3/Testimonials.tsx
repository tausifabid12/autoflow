import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Jennifer Lee',
      role: 'Marketing Director',
      company: 'FreshFit Apparel',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'This platform transformed our influencer marketing strategy. We saw a 400% increase in campaign ROI within 3 months. The AI matching is incredibly accurate.',
      rating: 5,
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'David Martinez',
      role: 'Founder & CEO',
      company: 'TechGear Pro',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'As a startup, finding the right influencers was always a challenge. This platform made it effortless. The analytics dashboard alone is worth the investment.',
      rating: 5,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Sophia Anderson',
      role: 'Brand Manager',
      company: 'LuxeBeauty',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'The quality of influencers and ease of campaign management is unmatched. We\'ve worked with 50+ creators and every collaboration exceeded expectations.',
      rating: 5,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Marcus Thompson',
      role: 'Content Creator',
      company: '2.1M Followers',
      image: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'Finally, a platform that connects creators with brands that truly align with our values. I\'ve landed my best partnerships here and the payment process is seamless.',
      rating: 5,
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Influencer',
      company: '1.5M Followers',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'I love how transparent everything is. Clear expectations, fair rates, and brands that actually care about authentic partnerships. Game changer for creators!',
      rating: 5,
      color: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Alex Chen',
      role: 'Head of Growth',
      company: 'UrbanStyle',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'The platform\'s data-driven approach helped us optimize our influencer strategy. We\'ve reduced costs by 30% while doubling our reach. Absolutely phenomenal.',
      rating: 5,
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <section className="py-32 px-6 relative bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Loved by <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what brands and creators are saying about our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-all duration-500`}></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-full blur-md opacity-50`}></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-white/20"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative flex-1">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/10" />
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-4xl font-black">4.9/5.0</div>
            <div className="text-gray-400">Based on 2,847 reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
