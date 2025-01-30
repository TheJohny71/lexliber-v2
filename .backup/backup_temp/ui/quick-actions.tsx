import { PlusCircle, Download, Upload, BookPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full justify-start space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Book</span>
          </Button>
          <Button variant="outline" className="w-full justify-start space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import Catalog</span>
          </Button>
          <Button variant="outline" className="w-full justify-start space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </Button>
          <Button variant="outline" className="w-full justify-start space-x-2">
            <BookPlus className="h-4 w-4" />
            <span>Bulk Add</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}