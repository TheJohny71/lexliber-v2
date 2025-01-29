"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { AlertCircle, CheckCircle2, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SettingsState {
  general: {
    libraryName: string
    contactEmail: string
    maxBorrowDays: number
    enableNotifications: boolean
    enableAutoRenew: boolean
  }
  aws: {
    bucketName: string
    region: string
    accessKey: string
    secretKey: string
  }
  appearance: {
    customAccentColor: string
    enableAnimations: boolean 
    compactMode: boolean
  }
}

export default function SettingsPanel() {
  const { theme, setTheme } = useTheme()
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [settings, setSettings] = useState<SettingsState>({
    general: {
      libraryName: 'LexLiber Library',
      contactEmail: 'admin@lexliber.com',
      maxBorrowDays: 14,
      enableNotifications: true,
      enableAutoRenew: false
    },
    aws: {
      bucketName: '',
      region: 'us-east-1',
      accessKey: '',
      secretKey: ''
    },
    appearance: {
      customAccentColor: '#0066cc',
      enableAnimations: true,
      compactMode: false
    }
  })

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      // Simulated API call - replace with actual save logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const updateSettings = (category: keyof SettingsState, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your library system preferences</p>
        </div>
        <Button 
          onClick={handleSave}
          className="min-w-[100px]"
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? (
            <span className="flex items-center">Saving...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          )}
        </Button>
      </div>

      {saveStatus === 'success' && (
        <Alert className="bg-green-500/15 text-green-500 border-green-500/50">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your settings have been saved successfully.</AlertDescription>
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert className="bg-red-500/15 text-red-500 border-red-500/50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to save settings. Please try again.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="aws">AWS Configuration</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic library system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="libraryName">Library Name</Label>
                  <Input 
                    id="libraryName"
                    value={settings.general.libraryName}
                    onChange={(e) => updateSettings('general', 'libraryName', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => updateSettings('general', 'contactEmail', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="maxBorrowDays">Maximum Borrow Days</Label>
                  <Input 
                    id="maxBorrowDays"
                    type="number"
                    value={settings.general.maxBorrowDays}
                    onChange={(e) => updateSettings('general', 'maxBorrowDays', parseInt(e.target.value))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for due dates and holds
                    </p>
                  </div>
                  <Switch
                    checked={settings.general.enableNotifications}
                    onCheckedChange={(checked) => updateSettings('general', 'enableNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Auto-Renew</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically renew items if no holds exist
                    </p>
                  </div>
                  <Switch
                    checked={settings.general.enableAutoRenew}
                    onCheckedChange={(checked) => updateSettings('general', 'enableAutoRenew', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aws">
          <Card>
            <CardHeader>
              <CardTitle>AWS Configuration</CardTitle>
              <CardDescription>
                Configure your AWS credentials for cloud storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="bucketName">S3 Bucket Name</Label>
                  <Input 
                    id="bucketName"
                    value={settings.aws.bucketName}
                    onChange={(e) => updateSettings('aws', 'bucketName', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="region">AWS Region</Label>
                  <Input 
                    id="region"
                    value={settings.aws.region}
                    onChange={(e) => updateSettings('aws', 'region', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accessKey">Access Key ID</Label>
                  <Input 
                    id="accessKey"
                    type="password"
                    value={settings.aws.accessKey}
                    onChange={(e) => updateSettings('aws', 'accessKey', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="secretKey">Secret Access Key</Label>
                  <Input 
                    id="secretKey"
                    type="password"
                    value={settings.aws.secretKey}
                    onChange={(e) => updateSettings('aws', 'secretKey', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your library system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="accentColor"
                      type="color"
                      value={settings.appearance.customAccentColor}
                      onChange={(e) => updateSettings('appearance', 'customAccentColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input 
                      type="text"
                      value={settings.appearance.customAccentColor}
                      onChange={(e) => updateSettings('appearance', 'customAccentColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show transitions and animations throughout the interface
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.enableAnimations}
                    onCheckedChange={(checked) => updateSettings('appearance', 'enableAnimations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing and padding in the interface
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.compactMode}
                    onCheckedChange={(checked) => updateSettings('appearance', 'compactMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}