'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Activity, Users, CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, IDashboardStats } from './(helper)'
import { useSession } from 'next-auth/react'


// Mock Data
const dashboardStats = {
  activeCampaigns: 12,
  pendingCampaigns: 5,
  completedCampaigns: 28,
  totalApplications: 342
}




const getStatusColor = (status : any) => {
  const colors = {
    applied: 'bg-yellow-500',
    selected: 'bg-green-500',
    rejected: 'bg-red-500',
    completed: 'bg-blue-500',
    processing: 'bg-orange-500'
  }
  // @ts-ignore
  return colors[status] || 'bg-gray-500'
}

const getStatusIcon = (status : any) => {
  const icons = {
    applied: <Clock className="h-3 w-3" />,
    selected: <CheckCircle className="h-3 w-3" />,
    rejected: <XCircle className="h-3 w-3" />,
    completed: <CheckCircle className="h-3 w-3" />,
    processing: <Activity className="h-3 w-3" />
  }
  // @ts-ignore
  return icons[status] || null
}



// ==================================== component ==================================== 

export default function BrandDashboard() {


    const {data: session} = useSession();


  const { isPending, isError, data, error, refetch } = useQuery<IDashboardStats>({
        queryKey: ['dashboard-stats', session?.user?.id],
        queryFn: () => getDashboardStats(session?.user?.id as string),
        enabled: session?.user?.id ? true : false,
    });








    // ============================ render ============================================
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container py-8 mx-auto">
        <div className="space-y-6">
          
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Active Campaigns */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Campaigns
                </CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{data?.data?.totalActiveCampaigns}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
       
                
                </p>
              </CardContent>
            </Card>

            {/* Pending Campaigns */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Paused Campaigns
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{data?.data?.totalInactiveCampaigns}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
            
          
                </p>
              </CardContent>
            </Card>

            {/* Total Campaigns */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Campaigns
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{data?.data?.totalCampaigns}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
         
                 
                </p>
              </CardContent>
            </Card>

            {/* Total Applications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Applications
                </CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{data?.data?.totalApplications}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                 
              
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaigns Over Time - Line Chart */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Campaigns Over Time</CardTitle>
                <CardDescription>Monthly campaign status trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} name="Active" />
                    <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} name="Pending" />
                    <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} name="Completed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

            {/* Campaign Type Distribution - Pie Chart */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Campaign Type Distribution</CardTitle>
                <CardDescription>Breakdown by campaign type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={campaignTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {campaignTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}
          </div>

          {/* Applications Per Campaign - Bar Chart */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Applications Per Campaign</CardTitle>
              <CardDescription>Number of influencer applications for each campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationsPerCampaign}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="campaign" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="applications" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}

          {/* Recent Activity Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest transactions and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="applications" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                {/* Applications Tab */}
                <TabsContent value="applications" className="mt-6">
                  <div className="rounded-md border-0  border-border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Application ID</TableHead>
                          <TableHead>Influencer</TableHead>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.data?.last5Applications?.map((app) => (
                          <TableRow key={app.application_id}>
                            <TableCell className="font-mono text-sm">{app.application_id}</TableCell>
                            <TableCell className="font-medium">{app.creator_name}</TableCell>
                            <TableCell className='truncate'>{app?.campaignData?.title}</TableCell>
                         
                        
                            <TableCell>
                              <Badge className={`${getStatusColor(app?.status)} text-white gap-1`}>
                                {getStatusIcon(app?.status)}
                                {app?.status.charAt(0).toUpperCase() + app?.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="mt-6">
                  <div className="rounded-md border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.data?.last5Transactions?.map((txn : any) => (
                          <TableRow key={txn?.transaction_id}>
                            <TableCell className="font-mono text-sm">{txn?.transaction_id}</TableCell>
                            <TableCell>{txn?.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">{txn.type}</Badge>
                            </TableCell>
                            <TableCell>{new Date(txn?.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(txn?.status)} text-white gap-1`}>
                                {getStatusIcon(txn?.status)}
                                {txn?.status.charAt(0).toUpperCase() + txn?.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
