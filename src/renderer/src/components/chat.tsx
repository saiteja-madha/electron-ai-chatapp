import { forwardRef, ReactElement, useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { type Message } from '@/components/chat/chat-message'
import { CopyButton } from '@/components/chat/copy-button'
import { MessageList } from '@/components/chat/message-list'
import { PromptSuggestions } from '@/components/chat/prompt-suggestions'
import { MessageInput } from '@/components/chat/message-input'

import { ArrowDown, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useAutoScroll } from '@/lib/hooks/use-auto-scroll'
import { chatSuggestions, chatMessages } from '../assets/data.json'

const onRateResponse = (messageId: string, rating: 'thumbs-up' | 'thumbs-down') => {
  console.log('Rating response:', { messageId, rating })
}

export function Chat() {
  const isEmpty = chatMessages.length === 0
  const isTyping = false
  const isGenerating = false
  const input = ''

  const append = (message: { role: 'user'; content: string }) => {
    console.log('Appending message:', message)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Input changed:', event.target.value)
  }

  const handleStop = () => {
    console.log('Stopping generation')
  }
  const handleSubmit = (
    event?: { preventDefault?: () => void },
    options?: { experimental_attachments?: FileList }
  ) => {
    event?.preventDefault?.()
    console.log('Form submitted', options)
  }

  const transcribeAudio = async (blob: Blob): Promise<string> => {
    console.log('Transcribing audio blob:', blob)
    // Simulate transcription logic
    return Promise.resolve('Transcription result')
  }

  const messageOptions = useCallback(
    (message: Message) => ({
      actions: onRateResponse ? (
        <>
          <div className="border-r pr-1">
            <CopyButton content={message.content} copyMessage="Copied response to clipboard!" />
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => onRateResponse(message.id, 'thumbs-up')}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => onRateResponse(message.id, 'thumbs-down')}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <CopyButton content={message.content} copyMessage="Copied response to clipboard!" />
      )
    }),
    [onRateResponse]
  )

  return (
    <ChatContainer className="flex h-full w-full flex-col gap-4 overflow-hidden">
      {isEmpty && chatSuggestions ? (
        <PromptSuggestions
          label="Try these prompts ✨"
          suggestions={chatSuggestions}
          append={append}
        />
      ) : null}

      {chatMessages.length > 0 ? (
        <ChatMessages messages={chatMessages}>
          <MessageList
            messages={chatMessages}
            isTyping={isTyping}
            messageOptions={messageOptions}
          />
        </ChatMessages>
      ) : null}

      <ChatForm
        className="mt-auto"
        isPending={isGenerating || isTyping}
        handleSubmit={handleSubmit}
      >
        {({ files, setFiles }) => (
          <MessageInput
            value={input}
            onChange={handleInputChange}
            allowAttachments
            files={files}
            setFiles={setFiles}
            stop={handleStop}
            isGenerating={isGenerating}
            transcribeAudio={transcribeAudio}
          />
        )}
      </ChatForm>
    </ChatContainer>
  )
}
Chat.displayName = 'Chat'

export function ChatMessages({
  messages,
  children
}: React.PropsWithChildren<{
  messages: Message[]
}>) {
  const { containerRef, scrollToBottom, handleScroll, shouldAutoScroll, handleTouchStart } =
    useAutoScroll([messages])

  return (
    <div
      className="grid grid-cols-1 overflow-y-auto pb-4"
      ref={containerRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
    >
      <div className="max-w-full [grid-column:1/1] [grid-row:1/1]">{children}</div>

      {!shouldAutoScroll && (
        <div className="pointer-events-none flex flex-1 items-end justify-end [grid-column:1/1] [grid-row:1/1]">
          <div className="sticky bottom-0 left-0 flex w-full justify-end">
            <Button
              onClick={scrollToBottom}
              className="pointer-events-auto h-8 w-8 rounded-full ease-in-out animate-in fade-in-0 slide-in-from-bottom-1"
              size="icon"
              variant="ghost"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export const ChatContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid max-h-full w-full grid-rows-[1fr_auto]', className)}
        {...props}
      />
    )
  }
)
ChatContainer.displayName = 'ChatContainer'

interface ChatFormProps {
  className?: string
  isPending: boolean
  handleSubmit: (
    event?: { preventDefault?: () => void },
    options?: { experimental_attachments?: FileList }
  ) => void
  children: (props: {
    files: File[] | null
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
  }) => ReactElement
}

export const ChatForm = forwardRef<HTMLFormElement, ChatFormProps>(
  ({ children, handleSubmit, isPending, className }, ref) => {
    const [files, setFiles] = useState<File[] | null>(null)

    const onSubmit = (event: React.FormEvent) => {
      if (!files) {
        handleSubmit(event)
        return
      }

      const fileList = createFileList(files)
      handleSubmit(event, { experimental_attachments: fileList })
      setFiles(null)
    }

    return (
      <form ref={ref} onSubmit={onSubmit} className={className}>
        {children({ files, setFiles })}
      </form>
    )
  }
)
ChatForm.displayName = 'ChatForm'

function createFileList(files: File[] | FileList): FileList {
  const dataTransfer = new DataTransfer()
  for (const file of Array.from(files)) {
    dataTransfer.items.add(file)
  }
  return dataTransfer.files
}
