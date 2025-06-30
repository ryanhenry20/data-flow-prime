
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users as UsersIcon, Search, Filter, Download, UserPlus, Eye } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";

const userGrowthData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1450 },
  { name: 'Mar', value: 1680 },
  { name: 'Apr', value: 1920 },
  { name: 'May', value: 2100 },
  { name: 'Jun', value: 2340 },
];

const userSegmentData = [
  { name: 'New Users', value: 45 },
  { name: 'Returning', value: 35 },
  { name: 'Premium', value: 20 },
];

const userData = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    lastSeen: "2 hours ago",
    sessions: 24,
    location: "New York, US"
  },
  {
    name: "Bob Smith", 
    email: "bob@example.com",
    role: "User",
    status: "Active",
    lastSeen: "1 day ago",
    sessions: 12,
    location: "London, UK"
  },
  {
    name: "Carol Davis",
    email: "carol@example.com", 
    role: "User",
    status: "Inactive",
    lastSeen: "1 week ago",
    sessions: 8,
    location: "Toronto, CA"
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    role: "Premium",
    status: "Active", 
    lastSeen: "30 min ago",
    sessions: 45,
    location: "Sydney, AU"
  },
  {
    name: "Eve Brown",
    email: "eve@example.com",
    role: "User",
    status: "Active",
    lastSeen: "3 hours ago", 
    sessions: 18,
    location: "Berlin, DE"
  }
];

const Users = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
            <p className="text-neutral-600 mt-1">Manage and analyze your user base and their behavior patterns.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Users
            </Button>
            <Button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card className="kpi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">2,340</h3>
                <p className="text-sm text-neutral-500">Total Users</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">1,890</h3>
                <p className="text-sm text-neutral-500">Active Users</p>
              </div>
            </div>
          </Card>

          <Card className="kpi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-ai-purple" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">468</h3>
                <p className="text-sm text-neutral-500">Premium Users</p>
              </div>
            </div>
          </Card>

          <Card className="kvi-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-warning-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">142</h3>
                <p className="text-sm text-neutral-500">New This Month</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard
            title="User Growth Over Time"
            type="area"
            data={userGrowthData}
            height={300}
            color="#3b82f6"
          />
          
          <ChartCard
            title="User Segments"
            type="pie"
            data={userSegmentData}
            height={300}
          />
        </div>

        {/* User Table */}
        <Card className="chart-container">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg font-semibold text-neutral-900">User Directory</CardTitle>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-0 text-sm font-medium text-neutral-500">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Last Seen</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-neutral-500">Sessions</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-neutral-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary-100 text-primary-600 font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-neutral-900">{user.name}</p>
                            <p className="text-sm text-neutral-500">{user.email}</p>
                            <p className="text-xs text-neutral-400">{user.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={user.role === 'Admin' ? 'destructive' : user.role === 'Premium' ? 'default' : 'secondary'}
                          className="bg-opacity-10"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-success-500' : 'bg-neutral-400'}`} />
                          <span className={`text-sm ${user.status === 'Active' ? 'text-success-600' : 'text-neutral-500'}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-neutral-600">{user.lastSeen}</td>
                      <td className="text-right py-4 px-4 font-medium text-neutral-900">{user.sessions}</td>
                      <td className="text-right py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
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

export default Users;
