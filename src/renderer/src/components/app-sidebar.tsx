import * as React from 'react'
import { IconInnerShadowTop } from '@tabler/icons-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { user } from '../assets/data.json'
import type { Chat } from '@/types/chat'

type Props = {
  chats: { id: string; title: string }[]
  setChatMeta: React.Dispatch<React.SetStateAction<Chat[]>>
  selectedChatId: string
  setSelectedChatId: React.Dispatch<React.SetStateAction<string>>
} & React.ComponentProps<typeof Sidebar>

export function AppSidebar({
  chats,
  setChatMeta,
  selectedChatId,
  setSelectedChatId,
  ...props
}: Props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">AI Chat</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          setChatMeta={setChatMeta}
          chats={chats}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
