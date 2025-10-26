"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface ProfilePictureViewerProps {
  imageSrc?: string
  userName: string
}

export function ProfilePictureViewer({ imageSrc, userName }: ProfilePictureViewerProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!imageSrc) return null

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative h-24 w-24 rounded-full cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={userName}
          className="w-full h-full object-cover"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-0 bg-transparent border-none shadow-none">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black text-white rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={imageSrc}
            alt={userName}
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
