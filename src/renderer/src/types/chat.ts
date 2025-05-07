export type Chat = {
  id: string
  title: string
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}
