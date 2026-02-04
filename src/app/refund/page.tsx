import Footer from '@/components/home3/Footer';
import { Shield, FileText, CheckCircle, AlertTriangle, Scale, Globe } from 'lucide-react';

export default function TermsAndConditions() {


  const terms = [
    {
      number: "1",
      text: `Cancellations will only be considered if the request is made 1 days of placing the order. However,
cancellation requests may not be entertained if the orders have been communicated to such sellers /
merchant(s) listed on the Platform and they have initiated the process of shipping them, or the
product is out for delivery. In such an event, you may choose to reject the product at the doorstep.`
    },
    {
      number: "2",
      text: `SITEGALLERIA PRIVATE LIMITED does not accept cancellation requests for perishable
items like flowers, eatables, etc. However, the refund / replacement can be made if the user
establishes that the quality of the product delivered is not good`
    },
    {
      number: "3",
      text: `In case of receipt of damaged or defective items, please report to our customer service team. The
request would be entertained once the seller/ merchant listed on the Platform, has checked and
determined the same at its own end. This should be reported within 1 days of receipt of products.
In case you feel that the product received is not as shown on the site or as per your expectations,
you must bring it to the notice of our customer service within 1 days of receiving the product. The
customer service team after looking into your complaint will take an appropriate decision `
    },
    {
      number: "4",
      text: `In case of complaints regarding the products that come with a warranty from the manufacturers,
please refer the issue to them.`
    },
    {
      number: "5",
      text: `In case of any refunds approved by SITEGALLERIA PRIVATE LIMITED, it will take 7 days
for the refund to be processed to you.`
    },
   
  ];

  return (
       <>
    <div className="min-h-screen bg-[#0D0D1A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
           Refund and Cancellation policy
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Please read these Refund and Cancellation policy carefully before using our platform
          </p>
        </div>







        {/* Terms List Header */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Refund and Cancellation policy</h2>
          <p className="text-gray-300">
           This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service
that you have purchased through the Platform. Under this policy:
          </p>
        </div>

        {/* Terms List */}
        <div className="space-y-4 mb-12">
          {terms.map((term) => (
            <div
              key={term.number}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                    {term.number}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed">{term.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Contact */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
          <p className="text-gray-300 mb-6">
            If you have any questions or concerns about these Terms & Conditions, please contact us using the information provided on our website.
          </p>
          <a
            href="mailto:support@getcreator.online"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Support
          </a>
        </div>

        {/* Last Updated */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Last Updated: November 2025
        </p>
      </div>
    </div>
          <Footer />
    </>
  );
}