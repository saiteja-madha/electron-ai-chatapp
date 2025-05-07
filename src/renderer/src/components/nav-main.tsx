import { IconCirclePlusFilled } from '@tabler/icons-react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Chat } from '@/types/chat'
import React from 'react'

interface Props {
  chats: Chat[]
  setChatMeta: React.Dispatch<React.SetStateAction<Chat[]>>
  selectedChatId: string
  setSelectedChatId: React.Dispatch<React.SetStateAction<string>>
}

export function NavMain({ chats, setChatMeta, selectedChatId, setSelectedChatId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [newChatTitle, setNewChatTitle] = React.useState('New Chat')

  const handleCreateNewChat = () => {
    // Here you would typically:
    // 1. Add the new chat to your state/database
    // 2. Implement proper persistence
    // 3. Handle any additional setup logic

    // For now, just select the first chat as a placeholder
    const newChatId = `new-chat-${Date.now()}`
    setChatMeta((prev) => [{ id: newChatId, title: newChatTitle || 'New Chat' }, ...prev])
    setSelectedChatId(newChatId)
    setNewChatTitle('New Chat') // Reset the title for next time
    setIsDialogOpen(false) // Close the dialog
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <DialogTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="py-5 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear flex justify-center items-center cursor-pointer"
                  aria-label="Create new chat"
                >
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DialogTrigger>
            </SidebarMenuItem>
          </SidebarMenu>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Chat</DialogTitle>
              <DialogDescription>
                Give your new chat a title. You can change it later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chat-title" className="text-right">
                  Chat Title
                </Label>
                <Input
                  id="chat-title"
                  value={newChatTitle}
                  onChange={(e) => setNewChatTitle(e.target.value)}
                  className="col-span-3"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateNewChat()
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateNewChat}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <SidebarMenu aria-label="Chat list">
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton
                tooltip={chat.title}
                isActive={selectedChatId === chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                aria-current={selectedChatId === chat.id ? 'page' : undefined}
              >
                <span>{chat.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
