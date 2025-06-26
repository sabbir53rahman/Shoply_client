"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, UserCheck, UserX, Users, Mail, Phone } from "lucide-react"
import { useGetAllUsersQuery, useMakeAdminMutation } from "@/redux/features/manageUserSlice/manageUserSlice"

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const {data : allUsers} = useGetAllUsersQuery()
  const [ makeAdmin ] = useMakeAdminMutation()

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      role: "customer",
      status: "active",
      joinDate: "2024-01-15",
      totalOrders: 12,
      totalSpent: "$4,849.48",
      lastLogin: "2024-01-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      role: "customer",
      status: "active",
      joinDate: "2024-01-10",
      totalOrders: 8,
      totalSpent: "$2,156.99",
      lastLogin: "2024-01-19",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 345-6789",
      role: "customer",
      status: "inactive",
      joinDate: "2023-12-05",
      totalOrders: 3,
      totalSpent: "$899.99",
      lastLogin: "2024-01-05",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 456-7890",
      role: "admin",
      status: "active",
      joinDate: "2023-11-20",
      totalOrders: 0,
      totalSpent: "$0.00",
      lastLogin: "2024-01-20",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 567-8901",
      role: "customer",
      status: "suspended",
      joinDate: "2024-01-08",
      totalOrders: 1,
      totalSpent: "$299.99",
      lastLogin: "2024-01-12",
    },
  ]

  const filteredUsers = allUsers?.filter((user) => {
    const matchesSearch =
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user?.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getRoleVariant = (role) => {
    return role === "admin" ? "default" : "outline"
  }

  const userStats = {
    total: users.length,
    active: users?.filter((u) => u.status === "active").length,
    inactive: users?.filter((u) => u.status === "inactive").length,
    suspended: users?.filter((u) => u.status === "suspended").length,
    admins: users?.filter((u) => u.role === "admin").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <UserX className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.inactive}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.suspended}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.admins}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Users
          </CardTitle>
          <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">Joined {user?.joinDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        {user?.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {user?.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user?.role)} className="capitalize">
                      {user?.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(user?.status)} className="capitalize">
                      {user?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user?.totalOrders}</TableCell>
                  <TableCell className="font-medium">{user?.totalSpent}</TableCell>
                  <TableCell>{user?.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details - {user?.name}</DialogTitle>
                            <DialogDescription>Manage user account and permissions</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Name:</span> {user?.name}
                                    </p>
                                    <p>
                                      <span className="font-medium">Email:</span> {user?.email}
                                    </p>
                                    <p>
                                      <span className="font-medium">Phone:</span> {user?.phone}
                                    </p>
                                    <p>
                                      <span className="font-medium">Join Date:</span> {user?.joinDate}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Account Status</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">Role:</span>
                                      <Badge variant={getRoleVariant(user?.role)} className="capitalize">
                                        {user.role}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">Status:</span>
                                      <Badge variant={getStatusVariant(user?.status)} className="capitalize">
                                        {user?.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Activity Summary</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Total Orders:</span> {user?.totalOrders}
                                    </p>
                                    <p>
                                      <span className="font-medium">Total Spent:</span> {user?.totalSpent}
                                    </p>
                                    <p>
                                      <span className="font-medium">Last Login:</span> {user?.lastLogin}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Quick Actions</h4>
                                  <div className="space-y-2">
                                    {user?.status === "active" && (
                                      <Button variant="outline" size="sm" className="w-full">
                                        <UserX className="w-4 h-4 mr-2" />
                                        Suspend User
                                      </Button>
                                    )}
                                    {user?.status === "suspended" && (
                                      <Button variant="outline" size="sm" className="w-full">
                                        <UserCheck className="w-4 h-4 mr-2" />
                                        Activate User
                                      </Button>
                                    )}
                                    {user?.role === "customer" || "user" && (
                                      <button className="w-full" onClick={()=> makeAdmin(user?._id)}>
                                        <Button variant="outline" size="sm" className="w-full">
                                          <Users className="w-4 h-4 mr-2" />
                                          Make Admin
                                        </Button>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
