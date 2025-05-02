import { useState } from 'react'
import { ChatContainer, ChatForm, ChatMessages } from '@/components/chat/chat'
import { MessageInput } from '@/components/chat/message-input'
import { MessageList } from '@/components/chat/message-list'
import { PromptSuggestions } from '@/components/chat/prompt-suggestions'
import { ScrollArea } from '@radix-ui/react-scroll-area'

import { chatMessages, chatSuggestions } from '../assets/data.json'

export function CustomChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(
    chatMessages.map((message) => ({
      id: String(message.id),
      content: message.content,
      role: message.role
    }))
  )
  const lastMessage = messages.at(-1)
  const isEmpty = messages.length === 0
  const isTyping = lastMessage?.role === 'user'
  const isLoading = false

  const append = (message: { role: 'user'; content: string }) => {
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), content: message.content, role: message.role }
    ])
  }

  const handleSubmit = (
    event?: { preventDefault?: () => void },
    options?: { experimental_attachments?: FileList }
  ) => {
    event?.preventDefault?.()
    setMessages((prev) => [...prev, { id: String(prev.length + 1), content: input, role: 'user' }])
    setInput('')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  return (
    <ChatContainer className="flex flex-col h-full gap-4 py-2 pl-4">
      {isEmpty ? (
        <div className="flex-1">
          <PromptSuggestions
            label="Try these prompts ✨"
            append={append}
            suggestions={chatSuggestions}
          />
        </div>
      ) : null}

      {!isEmpty ? (
        <ScrollArea className="grid max-h-[calc(100vh-12.5rem)] overflow-hidden">
          <ChatMessages messages={messages} className="pr-4">
            <MessageList messages={messages} isTyping={isTyping} />
          </ChatMessages>
        </ScrollArea>
      ) : null}

      <ChatForm
        className="mt-auto pr-4"
        isPending={isLoading || isTyping}
        handleSubmit={handleSubmit}
      >
        {({ files, setFiles }) => (
          <MessageInput
            value={input}
            onChange={handleInputChange}
            allowAttachments
            files={files}
            setFiles={setFiles}
            stop={stop}
            isGenerating={isLoading}
          />
        )}
      </ChatForm>
    </ChatContainer>
  )
}
