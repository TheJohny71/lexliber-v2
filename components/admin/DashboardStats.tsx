"use client"

import { useEffect, useState } from 'react'
import { 
  Library, 
  BookOpen, 
  Users, 
  BookX,
  TrendingUp,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StatsData {
  totalBooks: number
  availableBooks: number
  checkedOutBooks: number
  totalUsers: number
  popularBooks: Array<{
    title: string
    checkouts: number
  }>
  recentActivity: Array<{
    action: string
    item: string
    user: string
    timestamp: string
  }>
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalBooks: 0,
    availableBooks: 0,
    checkedOutBooks: 0,
    totalUsers: 0,
    popularBooks: [],
    recentActivity: []
  })

  useEffect(() => {
    // This will be replaced with actual API call
    const fetchStats = async () => {
      // Simulated data for now
      setStats({
        totalBooks: 2350,
        availableBooks: 2100,
        checkedOutBooks: 250,
        totalUsers: 450,
        popularBooks: [
          { title: "Legal Research Methods", checkouts: 45 },
          { title: "Contract Law Principles", checkouts: 38 },
          { title: "Constitutional Law", checkouts: 32 }
        ],
        recentActivity: [
          { 
            action: "Checkout",
            item: "Legal Research Methods",
            user: "John Doe",
            timestamp: "2024-01-29T10:30:00"
          },
          // Add more activity items
        ]
      })
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              in collection
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableBooks}</div>
            <p className="text-xs text-muted-foreground">
              books ready for checkout
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
            <BookX className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.checkedOutBooks}</div>
            <p className="text-xs text-muted-foreground">
              currently borrowed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              registered users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Books and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Popular Books</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{book.title}</span>
                  <span className="text-sm font-medium">{book.checkouts} checkouts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-muted-foreground">{activity.item}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}