import { TrendingUp, Heart, Share2, Eye } from 'lucide-react';

export default function CampaignHighlights() {
  const campaigns = [
    {
      brand: 'Pinggo',
      title: 'Social Media Automation ',
      influencer: 'Sarah Chen',
      results: {
        reach: '5.2M',
        engagement: '420K',
        conversions: '12.5K',
        roi: '380%',
      },
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-pink-500 to-rose-500',
    },
    {
      brand: 'AISEE',
      title: 'Scholarship and Examination',
      influencer: 'Marcus Johnson',
      results: {
        reach: '3.8M',
        engagement: '285K',
        conversions: '8.3K',
        roi: '290%',
      },
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      brand: 'Wallex',
      title: 'Prepaid Cards',
      influencer: 'Emma Rodriguez',
      results: {
        reach: '6.1M',
        engagement: '512K',
        conversions: '15.2K',
        roi: '425%',
      },
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-32 px-6 relative bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Campaign <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results from real campaigns powered by our platform
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {campaigns.map((campaign, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${campaign.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500`}></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent"></div>

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-sm font-bold">{campaign.brand}</span>
                    </div>
                    <div className={`px-4 py-2 bg-gradient-to-r ${campaign.color} rounded-full shadow-lg`}>
                      <span className="text-sm font-bold">Featured</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{campaign.title}</h3>
                  {/* <p className="text-gray-400 mb-6">By {campaign.influencer}</p> */}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-400">Reach</span>
                      </div>
                      <div className="text-xl font-bold">{campaign.results.reach}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span className="text-xs text-gray-400">Engagement</span>
                      </div>
                      <div className="text-xl font-bold">{campaign.results.engagement}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Share2 className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-400">Conversions</span>
                      </div>
                      <div className="text-xl font-bold">{campaign.results.conversions}</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-400">ROI</span>
                      </div>
                      <div className="text-xl font-bold">{campaign.results.roi}</div>
                    </div>
                  </div>
{/* 
                  <button className={`w-full mt-6 py-3 bg-gradient-to-r ${campaign.color} rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                    View Case Study
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
