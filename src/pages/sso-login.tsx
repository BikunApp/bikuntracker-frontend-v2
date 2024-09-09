import { useEffect } from 'react'

export default function SSO() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = window.location.href.replace(window.location.search, '')
    const ticket = params.get('ticket')

    console.log(
      ' >>',
      encodeURIComponent(
        window.location.href.replace(window.location.search, ''),
      ),
    )

    if (ticket) {
      (async () => {
        await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/sso/login`, {
          method: 'POST',
          body: JSON.stringify({
            ticket,
            service,
          }),
        })
      })()
    }
    else {
      if (typeof window !== 'undefined') {
        window.location.href = `https://sso.ui.ac.id/cas2/login?service=${encodeURIComponent(
          service,
        )}`
      }
    }
  }, [])

  return <h1>Logging in...</h1>
}
