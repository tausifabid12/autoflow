'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, Loader2, Calendar, User, TrendingUp, DollarSign } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTransactions, Transaction } from './(helper)'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export default function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'payment' | 'subscription' | 'refund'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'failed' | 'refunded'>('all')
  const [sortColumn, setSortColumn] = useState('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const {data: session} = useSession()

const { data, isLoading, error, refetch } = useQuery({
  queryKey: [
    'transactions',
    currentPage,
    limit,
    statusFilter,
    typeFilter,
    sortColumn,
    sortDirection,
    session?.user?.id,
  ],
  queryFn: () =>
    getTransactions({
      page: currentPage,
      limit,
      status: statusFilter === 'all' ? undefined : statusFilter,
      type: typeFilter === 'all' ? undefined : typeFilter,
      sort: `${sortDirection === 'desc' ? '-' : ''}${sortColumn}`,
      user_id: session?.user?.id,
    }),
  enabled: !!session?.user?.id, // ✅ Correct placement and syntax
})

  const transactions = data?.data ?? []
  const totalPages = data?.totalPages ?? 1

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      failed: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
      refunded: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    }
    return colors[status] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-border' }
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      payment: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
      subscription: { bg: 'bg-blue-50', text: 'text-blue-700' },
      refund: { bg: 'bg-orange-50', text: 'text-orange-700' },
    }
    return colors[type] || { bg: 'bg-slate-50', text: 'text-slate-700' }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  useEffect(() => {
    setCurrentPage(1)
    refetch()
  }, [statusFilter, typeFilter, sortColumn, sortDirection])

  return (
   <div className="min-h-screen bg-background">
       <div className="container mx-auto py-8 px-4 max-w-7xl">
         {/* Header */}
         <div className="mb-8">
           <h1 className="text-4xl font-bold  mb-2">Transaction Management</h1>
           <p className="text-muted-foreground">View and manage all your transactions in one place</p>
         </div>
 
         {/* Filters Section */}
         <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
           <div className="flex flex-col lg:flex-row gap-4">
             {/* Search */}
             <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <input
                 type="text"
                 placeholder="Search by transaction ID, user name, campaign..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
               />
             </div>
 
             {/* Type Filter */}
             <div className="relative">
               <select
                 value={typeFilter}
                 onChange={(e) => setTypeFilter(e.target.value as any)}
                 className="appearance-none w-full lg:w-48 pl-10 pr-10 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-card cursor-pointer"
               >
                 <option value="all">All Types</option>
                 <option value="payment">Payment</option>
                 <option value="subscription">Subscription</option>
                 <option value="refund">Refund</option>
               </select>
               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                 <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </div>
             </div>
 
             {/* Status Filter */}
             <div className="relative">
               <select
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value as any)}
                 className="appearance-none w-full lg:w-48 pl-10 pr-10 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-card cursor-pointer"
               >
                 <option value="all">All Status</option>
                 <option value="completed">Completed</option>
                 <option value="pending">Pending</option>
                 <option value="failed">Failed</option>
                 <option value="refunded">Refunded</option>
               </select>
               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                 <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </div>
             </div>
           </div>
 
           <div className="mt-4 text-sm text-muted-foreground">
             Showing <span className="font-semibold ">{transactions.length}</span> of <span className="font-semibold ">{data?.totalRecords ?? 0}</span> transactions
           </div>
         </div>
 
         {/* Transactions List */}
         {isLoading ? (
           <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="animate-spin h-12 w-12 text-cyan-600 mb-4" />
             <p className="text-muted-foreground">Loading transactions...</p>
           </div>
         ) : error ? (
           <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
             <div className="text-rose-600 font-semibold text-lg mb-2">Failed to load transactions</div>
             <p className="text-rose-500 text-sm">Please try again later</p>
           </div>
         ) : transactions.length === 0 ? (
           <div className="bg-card border border-border rounded-2xl p-12 text-center">
             <div className="text-muted-foreground mb-4">
               <TrendingUp className="h-16 w-16 mx-auto" />
             </div>
             <h3 className="text-xl font-semibold  mb-2">No transactions found</h3>
             <p className="text-muted-foreground">Try adjusting your filters</p>
           </div>
         ) : (
           <div className="space-y-4">
             {transactions.map((transaction: Transaction) => {
               const statusColors = getStatusColor(transaction.status)
               const typeColors = getTypeColor(transaction.type)
 
               return (
                 <div
                   key={transaction.transaction_id}
                   className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-200 "
                 >
                   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                     {/* Left Section */}
                     <div className="flex-1 space-y-3">
                       {/* Transaction ID & Type */}
                       <div className="flex items-center gap-3 flex-wrap">
                         <span className="font-mono text-sm text-muted-foreground bg-accent px-3 py-1 rounded-lg border border-border">
                           {transaction.transaction_id.slice(0, 16)}...
                         </span>
                         <span className={`${typeColors.bg} ${typeColors.text} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}>
                           {transaction.type}
                         </span>
                       </div>
 
                       {/* User & Campaign Info */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {transaction.user_name && (
                           <div className="flex items-center gap-2 text-sm">
                             <User className="h-4 w-4 text-muted-foreground" />
                             <span className="text-muted-foreground">User:</span>
                             <span className="font-medium ">{transaction.user_name}</span>
                           </div>
                         )}
                         {transaction.campaign_name && (
                           <div className="flex items-center gap-2 text-sm">
                             <TrendingUp className="h-4 w-4 text-muted-foreground" />
                             <span className="text-muted-foreground">Campaign:</span>
                             <span className="font-medium ">{transaction.campaign_name}</span>
                           </div>
                         )}
                       </div>
 
                       {/* Date */}
                       <div className="flex items-center gap-2 text-sm text-slate-500">
                         <Calendar className="h-4 w-4" />
                         {formatDate(transaction.created_at)}
                       </div>
                     </div>
 
                     {/* Right Section - Amount & Status */}
                     <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-border">
                       {/* Amount */}
                       <div className="flex items-center gap-2">
                         
                         <span className="text-2xl font-bold ">
                           {formatCurrency(transaction.amount)}
                         </span>
                       </div>
 
                       {/* Status Badge */}
                       <div className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} border-2 px-3 py-1 rounded-xl font-semibold text-xs uppercase tracking-wide  text-center`}>
                         {transaction.status}
                       </div>
                     </div>
                   </div>
                 </div>
               )
             })}
           </div>
         )}
 
         {/* Pagination */}
         {totalPages > 1 && (
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-card rounded-2xl shadow-sm border border-border p-6">
             <div className="text-sm text-muted-foreground">
               Page <span className="font-semibold ">{currentPage}</span> of <span className="font-semibold ">{totalPages}</span>
             </div>
             <div className="flex gap-3">
               <Button
                 variant="outline"
                 onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                 disabled={currentPage === 1}
                 className=""
               >
                 <ChevronLeft className="h-4 w-4" />
                 Previous
               </Button>
               <Button
                 variant="outline"
                 onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                 disabled={currentPage === totalPages}
               >
                 Next
                 <ChevronRight className="h-4 w-4" />
               </Button>
             </div>
           </div>
         )}
       </div>
     </div>
  )
}
