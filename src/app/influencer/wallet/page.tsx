'use client'
import { useState } from 'react';
import { Wallet, TrendingUp, Clock, CheckCircle, X, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FaRupeeSign } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { getWallet, getWithdrawRequest, IWalletResponse, withdraw } from './(helper)';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/components/providers';
import { toast } from 'sonner';
import { useUser } from '@/context/CreatorContext';
import { useRouter } from 'next/navigation';

// Dummy data for wallet
const dummyWalletData = {
  actualBalance: 15420.50,
  pendingBalance: 3250.75,
  totalTransferred: 45890.25,
  currency: 'USD',
  transactions: [
    {
      id: 'txn1',
      type: 'credit',
      amount: 2500.00,
      status: 'completed',
      description: 'Campaign Payment - Fashion Brand Collaboration',
      date: '2024-10-28',
      reference: 'REF-2024-001',
    },
    {
      id: 'txn2',
      type: 'debit',
      amount: 1500.00,
      status: 'completed',
      description: 'Withdrawal to Bank Account',
      date: '2024-10-25',
      reference: 'WD-2024-012',
    },
    {
      id: 'txn3',
      type: 'credit',
      amount: 3250.75,
      status: 'pending',
      description: 'Campaign Payment - Tech Product Review',
      date: '2024-10-30',
      reference: 'REF-2024-002',
    },
    {
      id: 'txn4',
      type: 'credit',
      amount: 1800.00,
      status: 'completed',
      description: 'Bonus Payment',
      date: '2024-10-20',
      reference: 'BON-2024-005',
    },
    {
      id: 'txn5',
      type: 'debit',
      amount: 2200.00,
      status: 'completed',
      description: 'Withdrawal to Bank Account',
      date: '2024-10-15',
      reference: 'WD-2024-011',
    },
  ],
  withdrawalRequests: [
    {
      id: 'wd1',
      amount: 5000.00,
      status: 'pending',
      requestDate: '2024-10-29',
      processDate: null,
      method: 'Bank Transfer',
      accountDetails: '****1234',
    },
    {
      id: 'wd2',
      amount: 3000.00,
      status: 'approved',
      requestDate: '2024-10-22',
      processDate: '2024-10-24',
      method: 'PayPal',
      accountDetails: 'user@email.com',
    },
    {
      id: 'wd3',
      amount: 2500.00,
      status: 'rejected',
      requestDate: '2024-10-18',
      processDate: '2024-10-19',
      method: 'Bank Transfer',
      accountDetails: '****5678',
      rejectionReason: 'Insufficient balance',
    },
  ],
};

export default function WalletPage() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [accountDetails, setAccountDetails] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');



 const {data: session } = useSession();
 const {instagramData} = useUser()
 const router = useRouter()


 

  const { isPending, isError, data, error, refetch } = useQuery<IWalletResponse>({
        queryKey: ['wallet', session?.user?.id],
        queryFn: () => getWallet(session?.user?.id as string),
        enabled: session?.user?.id ? true : false,
    });

      const { isPending: isPendingWithdrawRequest, isError: isErrorWithdrawRequest, data: dataWithdrawRequest, error: errorWithdrawRequest, refetch: refetchWithdrawRequest } = useQuery<IWalletResponse>({
        queryKey: ['withdraw-request', session?.user?.id],
        //@ts-ignore
        queryFn: () => getWithdrawRequest(session?.user?.id as string),
        enabled: session?.user?.id ? true : false,
    });

    console.log(dataWithdrawRequest)


        const {
        mutate: createNewWithdraw,
        isPending : isPendingWithdraw,
    } = useMutation({
        mutationFn: withdraw,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
            toast.success('Withdrawal request submitted successfully')
            setShowWithdrawModal(false)
        },
    });  




  const walletData = dummyWalletData;

  const handleWithdrawSubmit = () => {

    if(Number(withdrawAmount) <= 0){
        toast.error('Withdrawal amount must be greater than 0')
        return
    }

    if(!instagramData?.bank_name || !instagramData?.bank_account_number || !instagramData?.bank_ifsc_code || !instagramData?.bank_branch || !instagramData?.bank_account_holder_name){
        toast.error('Please fill all the bank details')
        router.push('/influencer/profile')
        return
    }

    if(Number(withdrawAmount) > Number(data?.data?.withdrawable_balance)){
        toast.error('Withdrawal amount is greater than withdrawable balance')
        return
    }


    const withdrawData = {
    wallet_id: data?.data?._id,
    creator_id: session?.user?.id,
    creator_name: instagramData?.firstName + ' ' + instagramData?.lastName,
    amount: withdrawAmount,
    bank_name: instagramData?.bank_name,
    bank_account_number: instagramData?.bank_account_number,
    bank_ifsc_code: instagramData?.bank_ifsc_code,
    bank_branch: instagramData?.bank_branch,
    bank_account_holder_name: instagramData?.bank_account_holder_name,
    }
    createNewWithdraw(withdrawData)
    // Handle withdrawal request submission
    console.log('Withdrawal request:', { withdrawAmount, withdrawMethod, accountDetails });
    setShowWithdrawModal(false);
    setWithdrawAmount(0);
    setAccountDetails('');
  };

  const filteredTransactions = walletData.transactions.filter(txn => {
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
      case 'pending':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      case 'rejected':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return '  bg-slate-50 dark:bg-slate-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}


        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Actual Balance */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Wallet size={24} />
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Available
              </span>
            </div>
            <p className="text-sm text-blue-100 mb-2">Actual Balance</p>
            <p className="text-4xl font-bold mb-1">
               ₹{data?.data?.withdrawable_balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || 0}
            </p>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="mt-4 w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowUpRight size={20} />
              Withdraw Funds
            </button>
          </div>

          {/* Pending Balance */}
          <div className="bg-card backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12  dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
                <Clock size={24} className="text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <p className="text-sm   mb-2">Pending Balance</p>
            <p className="text-3xl font-bold   mb-1">
               ₹{data?.data?.pending_balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || 0}
            </p>
            <p className="text-xs text-muted-foreground  mt-2">
              Awaiting confirmation
            </p>
          </div>

          {/* Total Transferred */}
          <div className="bg-card backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-sm   mb-2">Total Transferred</p>
            <p className="text-3xl font-bold   mb-1">
               ₹{data?.data?.balance_withdrawn?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || 0}
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <ArrowUpRight size={14} />
              All time earnings
            </p>
          </div>
        </div>

        {/* Withdrawal Requests */}
        <div className="bg-card backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold   mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            Withdrawal Requests
          </h2>
          
          <div className="space-y-4">
            {/* @ts-ignore */}
            {dataWithdrawRequest?.data?.map((request) => (
              <div 
                key={request.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:shadow-md transition-all border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    request.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    request.status === 'pending' ? ' dark:bg-amber-900/30' :
                    'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {request.status === 'completed' ? (
                      <CheckCircle size={24} className="text-emerald-600 dark:text-emerald-400" />
                    ) : request.status === 'pending' ? (
                      <Clock size={24} className="text-amber-600 dark:text-amber-400" />
                    ) : (
                      <X size={24} className="text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg  ">
                      ₹{request.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm   mt-1">
                      {request?.bank_name} • {request?.bank_account_number}
                    </p>
                    <p className="text-xs text-muted-foreground  mt-1">
                      Requested: {new Date(request?.updated_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    {request?.rejectionReason && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Reason: {request?.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${getStatusColor(request.status)}`}>
                    {request?.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold  ">Withdraw Funds</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                <X size={20} className=" " />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Available Balance
                </label>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                     ₹{data?.data?.withdrawable_balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || 0}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <FaRupeeSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-12 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  "
                  />
                </div>
              </div>


              {/* <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Account Details
                </label>
                <Input
                  type="text"
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  placeholder={
                    withdrawMethod === 'bank' ? 'Account number or IBAN' :
                    withdrawMethod === 'paypal' ? 'PayPal email address' :
                    'Wallet address'
                  }
                  className="w-full border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  "
                />
              </div> */}

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> Withdrawal requests are typically processed within 3-5 business days. A processing fee may apply.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdrawSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}