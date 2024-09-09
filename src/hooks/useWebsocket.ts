import { useEffect, useRef, useState } from 'react'

import { type WebsocketMessage, websocketMessageSchema } from '@/schema/ws.ts'

export interface UseWebsocketProps {
  onMessage: (message?: WebsocketMessage) => void
}

export default function useWebsocket({ onMessage }: UseWebsocketProps) {
  const [socket] = useState<WebSocket>(
    () => new WebSocket(import.meta.env.VITE_WS_URL),
  )

  const onMessageCallbackRef = useRef<UseWebsocketProps['onMessage'] | null>(
    null,
  )
  useEffect(() => {
    onMessageCallbackRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    socket.addEventListener('open', (event) => {
      console.log('Connection opened to ws:', event)
    })

    socket.addEventListener('message', (event) => {
      const message = websocketMessageSchema.parse(JSON.parse(event.data))
      onMessageCallbackRef.current?.(message)
    })
  }, [socket])
}
