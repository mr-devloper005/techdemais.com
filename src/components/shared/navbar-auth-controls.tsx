'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, FileText, Building2, Tag, Image as ImageIcon, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="hidden h-10 gap-1 rounded-md bg-[#0047AB] px-4 text-white shadow-sm hover:bg-[#003a8f] sm:flex">
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-slate-200 bg-white">
          {SITE_CONFIG.tasks.filter((task) => task.enabled && task.key === 'article').map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-1 sm:gap-2">
        <Avatar className="h-9 w-9 shrink-0 border border-slate-200" title={user?.name || 'Account'}>
          <AvatarImage src={user?.avatar} alt={user?.name || ''} />
          <AvatarFallback className="bg-slate-100 text-sm font-semibold text-slate-700">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={logout}
          className="h-9 gap-1.5 rounded-md px-2 text-slate-600 hover:bg-slate-100 hover:text-[#0047AB] sm:px-3"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="text-sm font-semibold">Sign out</span>
        </Button>
      </div>
    </>
  )
}
