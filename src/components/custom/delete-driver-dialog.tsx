"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import {deleteDriverServerAction} from '@/serverFunctions/drivers'

export function DeleteDriverDialog({ driverId, driverName }: { driverId: string; driverName: string }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="mb-2 text-xl font-bold">Delete Driver</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-semibold">{driverName}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => deleteDriverServerAction({id: driverId})}>
            Delete Driver
          </Button>
        </div>
      </div>
    </div>
  )
}
