// export default function BrandLogos() {
//   const brands = [
//     'NIKE', 'ADIDAS', 'SAMSUNG', 'COCA-COLA', 'PEPSI', 'APPLE', 'SPOTIFY', 'NETFLIX',
//     'NIKE', 'ADIDAS', 'SAMSUNG', 'COCA-COLA', 'PEPSI', 'APPLE', 'SPOTIFY', 'NETFLIX',
//   ];

//   return (
//     <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900">
//       <div className="max-w-7xl mx-auto mb-12">
//         <div className="text-center">
//           <h2 className="text-5xl md:text-6xl font-black mb-6">
//             Trusted by <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Top Brands</span>
//           </h2>
//           <p className="text-xl text-gray-400">
//             Join thousands of leading brands already growing with us
//           </p>
//         </div>
//       </div>

//       <div className="relative">
//         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
//         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

//         <div className="flex gap-16 animate-scroll">
//           {brands.map((brand, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-center min-w-[200px] h-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
//             >
//               <span className="text-2xl font-black text-gray-400 group-hover:text-white transition-colors duration-300">
//                 {brand}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
//         <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
//           <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
//             500+
//           </div>
//           <div className="text-gray-400">Active Brands</div>
//         </div>
//         <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
//           <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
//             $50M+
//           </div>
//           <div className="text-gray-400">Campaign Value</div>
//         </div>
//         <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
//           <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
//             2.5B+
//           </div>
//           <div className="text-gray-400">Total Reach</div>
//         </div>
//         <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
//           <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
//             4.8/5
//           </div>
//           <div className="text-gray-400">Avg Rating</div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from 'framer-motion';

export default function BrandLogos() {
  const brands = [
    'NIKE', 'ADIDAS', 'SAMSUNG', 'COCA-COLA', 'PEPSI', 'APPLE', 'SPOTIFY', 'NETFLIX'
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Trusted by <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Top Brands</span>
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of leading brands already growing with us
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{
              x: [0, -100 * brands.length - 16 * brands.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[200px] h-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
              >
                <span className="text-2xl font-black text-gray-400 group-hover:text-white transition-colors duration-300">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
        <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
          <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            50+
          </div>
          <div className="text-gray-400">Active Brands</div>
        </div>
        <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
          <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            ₹5M+
          </div>
          <div className="text-gray-400">Campaign Value</div>
        </div>
        <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
          <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            2.5B+
          </div>
          <div className="text-gray-400">Total Reach</div>
        </div>
        <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
          <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            4.8/5
          </div>
          <div className="text-gray-400">Avg Rating</div>
        </div>
      </div>
    </section>
  );
}