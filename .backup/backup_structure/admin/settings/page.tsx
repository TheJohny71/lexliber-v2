import { Metadata } from "next"
import { SettingsPanel } from "@/components/admin/SettingsPanel"

export const metadata: Metadata = {
  title: "Settings",
  description: "Library system settings and configuration",
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <SettingsPanel />
    </div>
  )
}