import { Instagram, Youtube, Users, TrendingUp } from 'lucide-react';

export default function TopInfluencers() {
  const influencers = [
    {
      name: 'Sarah Chen',
      niche: 'Fashion & Lifestyle',
      followers: '2.4M',
      engagement: '8.5%',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Marcus Johnson',
      niche: 'Tech & Gaming',
      followers: '1.8M',
      engagement: '12.3%',
      platform: 'YouTube',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Emma Rodriguez',
      niche: 'Beauty & Wellness',
      followers: '3.2M',
      engagement: '9.1%',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Alex Kumar',
      niche: 'Fitness & Sports',
      followers: '1.5M',
      engagement: '10.7%',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Zoe Martinez',
      niche: 'Travel & Adventure',
      followers: '2.1M',
      engagement: '11.2%',
      platform: 'YouTube',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Ryan Park',
      niche: 'Food & Culinary',
      followers: '1.9M',
      engagement: '9.8%',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <section className="py-32 px-6 relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Top <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Influencers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover trending creators across all major platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((influencer, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${influencer.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                      {influencer.platform === 'Instagram' ? (
                        <Instagram className="w-4 h-4 text-pink-400" />
                      ) : (
                        <Youtube className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-xs font-semibold">{influencer.platform}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-1">{influencer.name}</h3>
                    <p className="text-gray-300 text-sm">{influencer.niche}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Followers</div>
                        <div className="text-lg font-bold">{influencer.followers}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-sm text-gray-400">Engagement</div>
                        <div className="text-lg font-bold">{influencer.engagement}</div>
                      </div>
                    </div>
                  </div>

                  <button className={`w-full py-3 bg-gradient-to-r ${influencer.color} rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
            Browse All Influencers
          </button>
        </div>
      </div>
    </section>
  );
}
