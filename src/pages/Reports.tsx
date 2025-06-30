
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Clock, Eye, TrendingUp } from "lucide-react";

const reports = [
  {
    title: "Monthly Performance Report",
    description: "Comprehensive overview of all key metrics and KPIs for the current month",
    lastGenerated: "2 hours ago",
    size: "2.4 MB",
    status: "Ready",
    type: "Performance"
  },
  {
    title: "User Behavior Analysis",
    description: "Deep dive into user journey, engagement patterns, and conversion funnels",
    lastGenerated: "1 day ago", 
    size: "1.8 MB",
    status: "Ready",
    type: "Analytics"
  },
  {
    title: "Revenue & Growth Report",
    description: "Financial performance metrics, revenue trends, and growth projections",
    lastGenerated: "3 hours ago",
    size: "3.2 MB", 
    status: "Ready",
    type: "Financial"
  },
  {
    title: "Traffic Source Analysis",
    description: "Breakdown of traffic channels, campaign performance, and attribution data",
    lastGenerated: "Processing...",
    size: "—",
    status: "Processing",
    type: "Marketing"
  },
  {
    title: "Custom Dashboard Export",
    description: "Exportable version of your current dashboard with all selected widgets",
    lastGenerated: "5 hours ago",
    size: "4.1 MB",
    status: "Ready", 
    type: "Export"
  }
];

const scheduledReports = [
  {
    name: "Weekly Summary",
    frequency: "Every Monday 9:00 AM",
    recipients: "team@company.com",
    nextRun: "In 3 days"
  },
  {
    name: "Monthly Analytics", 
    frequency: "First of every month",
    recipients: "management@company.com",
    nextRun: "In 12 days"
  },
  {
    name: "Performance Alert",
    frequency: "When metrics change >10%",
    recipients: "alerts@company.com", 
    nextRun: "Real-time"
  }
];

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Reports</h1>
            <p className="text-neutral-600 mt-1">Generate, schedule, and manage your analytics reports.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </Button>
            <Button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600">
              <FileText className="w-4 h-4" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="kpi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">47</h3>
                <p className="text-sm text-neutral-500">Total Reports</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-success-600" /> 
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">8</h3>
                <p className="text-sm text-neutral-500">Scheduled</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-ai-purple" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">142</h3>
                <p className="text-sm text-neutral-500">Downloads</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-900">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.map((report, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-neutral-100 hover:bg-white/80 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-neutral-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <FileText className="w-6 h-6 text-neutral-600 group-hover:text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-neutral-900">{report.title}</h4>
                          <Badge 
                            variant={report.status === 'Ready' ? 'secondary' : 'default'}
                            className={report.status === 'Ready' ? 'bg-success-50 text-success-700' : 'bg-warning-50 text-warning-700'}
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span>Updated {report.lastGenerated}</span>
                          <span>•</span>
                          <span>{report.size}</span>  
                          <span>•</span>
                          <span>{report.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={report.status !== 'Ready'}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Reports */}
          <div>
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-900">Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-white/60 border border-neutral-100 hover:bg-white/80 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{report.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{report.frequency}</span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        To: {report.recipients}
                      </div>
                      <div className="text-xs text-ai-purple font-medium">
                        Next run: {report.nextRun}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full border-dashed border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                >
                  + Add Scheduled Report
                </Button>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="chart-container mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-900">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  Export as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  Export as Excel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  Export as CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
