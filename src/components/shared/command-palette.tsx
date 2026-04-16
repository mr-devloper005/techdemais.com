'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { useToast } from '@/components/ui/use-toast'
import { FileText, Plus, Search, Home } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Articles', href: '/articles', icon: FileText },
  { label: 'Search', href: '/search', icon: Search },
]

const createActions = [{ label: 'Create Article', href: '/create/article', icon: Plus }]

export function CommandPalette() {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette" description="Search for a command to run...">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {quickLinks.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Create">
          {createActions.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick">
          <CommandItem
            onSelect={() => {
              toast({ title: 'Search', description: 'Opening the article search page.' })
              router.push('/search')
              setOpen(false)
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            Open Search
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
