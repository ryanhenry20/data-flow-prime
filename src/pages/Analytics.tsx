
import { Layout } from "@/components/layout/Layout";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Eye, Clock, MousePointer } from "lucide-react";

const performanceData = [
  { name: 'Jan', value: 4200, sessions: 3200, bounceRate: 45 },
  { name: 'Feb', value: 3800, sessions: 3600, bounceRate: 42 },
  { name: 'Mar', value: 4600, sessions: 4100, bounceRate: 38 },
  { name: 'Apr', value: 5200, sessions: 4800, bounceRate: 35 },
  { name: 'May', value: 4900, sessions: 4500, bounceRate: 40 },
  { name: 'Jun', value: 5800, sessions: 5200, bounceRate: 32 },
];

const channelData = [
  { name: 'Organic Search', value: 35 },
  { name: 'Direct', value: 28 },
  { name: 'Social Media', value: 20 },
  { name: 'Email', value: 12 },
  { name: 'Paid Ads', value: 5 },
];

const deviceData = [
  { name: 'Mon', desktop: 2400, mobile: 1800, tablet: 600 },
  { name: 'Tue', desktop: 2200, mobile: 2000, tablet: 550 },
  { name: 'Wed', desktop: 2600, mobile: 1900, tablet: 700 },
  { name: 'Thu', desktop: 2800, mobile: 2100, tablet: 650 },
  { name: 'Fri', desktop: 3200, mobile: 2300, tablet: 800 },
  { name: 'Sat', desktop: 2900, mobile: 2500, tablet: 750 },
  { name: 'Sun', desktop: 2400, mobile: 2200, tablet: 600 },
];

const topPages = [
  { page: '/dashboard', views: '12,543', time: '4:32', bounce: '32%' },
  { page: '/analytics', views: '8,921', time: '3:45', bounce: '28%' },
  { page: '/reports', views: '6,234', time: '5:12', bounce: '45%' },
  { page: '/users', views: '4,567', time: '2:56', bounce: '52%' },
  { page: '/settings', views: '3,421', time: '6:18', bounce: '38%' },
];

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Advanced Analytics</h1>
            <p className="text-neutral-600 mt-1">Deep dive into your website and user behavior analytics.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline">Custom Date Range</Button>
            <Button className="bg-primary-500 hover:bg-primary-600">Export Analytics</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-success-50 text-success-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">2.4M</h3>
            <p className="text-sm text-neutral-500">Total Page Views</p>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-success-600" />
              </div>
              <Badge className="bg-success-50 text-success-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">324K</h3>
            <p className="text-sm text-neutral-500">Unique Visitors</p>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
              <Badge className="bg-error-50 text-error-700">
                <TrendingDown className="w-3 h-3 mr-1" />
                -2.1%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">4m 32s</h3>
            <p className="text-sm text-neutral-500">Avg. Session Duration</p>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-ai-purple" />
              </div>
              <Badge className="bg-success-50 text-success-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.3%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">68%</h3>
            <p className="text-sm text-neutral-500">Bounce Rate</p>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard
            title="Website Performance"
            type="area"
            data={performanceData}
            height={350}
            color="#3b82f6"
          />
          
          <ChartCard
            title="Traffic Channels"
            type="pie"
            data={channelData}
            height={350}
          />
        </div>

        {/* Device Analytics */}
        <ChartCard
          title="Device Usage Analytics"
          type="bar"
          data={deviceData}
          height={400}
          color="#10b981"
        />

        {/* Top Pages Table */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-neutral-900">Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-0 text-sm font-medium text-neutral-500">Page</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-neutral-500">Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-neutral-500">Avg. Time</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-neutral-500">Bounce Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((page, index) => (
                    <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-0">
                        <span className="font-medium text-neutral-900">{page.page}</span>
                      </td>
                      <td className="text-right py-4 px-4 font-medium text-neutral-900">{page.views}</td>
                      <td className="text-right py-4 px-4 text-neutral-600">{page.time}</td>
                      <td className="text-right py-4 px-4">
                        <Badge 
                          variant={parseInt(page.bounce) > 50 ? "destructive" : parseInt(page.bounce) > 35 ? "default" : "secondary"}
                          className="bg-opacity-10"
                        >
                          {page.bounce}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
