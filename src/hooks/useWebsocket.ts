import { useEffect, useState } from 'react'

import { WebsocketMessage } from '@/types/bus.ts'

export default function useWebsocket() {
  const [socket] = useState<WebSocket>(
    () => new WebSocket(import.meta.env.VITE_WS_URL + '/v2'),
  )
  const [message, setMessage] = useState<WebsocketMessage | undefined>(
    undefined,
  )

  useEffect(() => {
    socket.addEventListener('open', (event) => {
      console.log('Connection opened to ws:', event)
    })

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as WebsocketMessage
      console.log('Message received:', message)
      setMessage(message)
    })
  }, [socket])

  return message
}
