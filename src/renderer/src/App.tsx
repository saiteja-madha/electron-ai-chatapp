import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { NavActions } from '@/components/nav-actions'
import { CustomChat } from '@/components/custom-chat'
import { chats as chatMeta } from './assets/data.json'
import type { Chat } from '@/types/chat'

function App(): React.JSX.Element {
  const [chats, setChats] = useState<Chat[]>(chatMeta)
  const [selectedChatId, setSelectedChatId] = useState<string>(chatMeta[0]?.id)

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar
          variant="inset"
          chats={chats}
          setChatMeta={setChats}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      {chatMeta.find((c) => c.id === selectedChatId)?.title || 'Chat'}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-3">
              <NavActions />
            </div>
          </header>
          <div className="flex flex-1 flex-col max-h-[calc(100vh-4.5rem)] overflow-hidden">
            <CustomChat selectedChatId={selectedChatId} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
