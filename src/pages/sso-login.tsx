import Cookie from 'js-cookie'
import { useEffect } from 'react'

import { ssoLoginResponseSchema } from '@/schema/auth.ts'

export default function SSO() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = window.location.href.replace(window.location.search, '')
    const ticket = params.get('ticket')

    if (ticket) {
      try {
        (async () => {
          const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/sso/login`,
            {
              method: 'POST',
              body: JSON.stringify({
                ticket,
                service,
              }),
            },
          )
          if (resp.ok) {
            const data = await resp.json()
            const ssoResp = ssoLoginResponseSchema.parse(data)
            Cookie.set('bikuntracker_access-token', ssoResp.access)
            Cookie.set('bikuntracker_refresh-token', ssoResp.refresh)
          }
        })()
      }
      catch {
        // Fail silently
      }
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
