import { ChatContainer, ChatForm, ChatMessages } from '@/components/chat/chat'
import { MessageInput } from '@/components/chat/message-input'
import { MessageList } from '@/components/chat/message-list'
import { PromptSuggestions } from '@/components/chat/prompt-suggestions'

import { chatMessages, chatSuggestions } from '../assets/data.json'

const messages = chatMessages.map((message) => ({
  id: String(message.id),
  content: message.content,
  role: message.role
}))

export function CustomChat() {
  const input = ''
  const lastMessage = messages.at(-1)
  const isEmpty = messages.length === 0
  const isTyping = lastMessage?.role === 'user'
  const isLoading = false

  const append = (message: { role: 'user'; content: string }) => {
    console.log('Appending message:', message)
  }

  const handleSubmit = (
    event?: { preventDefault?: () => void },
    options?: { experimental_attachments?: FileList }
  ) => {
    event?.preventDefault?.()
    console.log('Form submitted', options)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Input changed:', event.target.value)
  }

  return (
    <ChatContainer className="flex h-full w-full flex-col gap-4 overflow-hidden">
      {isEmpty ? (
        <PromptSuggestions
          label="Try these prompts ✨"
          append={append}
          suggestions={chatSuggestions}
        />
      ) : null}

      {!isEmpty ? (
        <ChatMessages messages={messages}>
          <MessageList messages={messages} isTyping={isTyping} />
        </ChatMessages>
      ) : null}

      <ChatForm className="mt-auto" isPending={isLoading || isTyping} handleSubmit={handleSubmit}>
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
