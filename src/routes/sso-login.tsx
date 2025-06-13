import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { BackPathnameKey } from "@/common/constants/keys.ts";
import { useAuthStore } from "@/lib/store/auth.ts";
import { storeJwtWithExpiry } from "@/lib/utils.ts";
import { ssoLogin } from "@/services/auth.ts";
import { ErrorHTTPNotOk } from "@/services/util.ts";

export const Route = createFileRoute("/sso-login")({
  component: Page,
});

export default function Page() {
  const { user, setUser } = useAuthStore();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = window.location.href.replace(window.location.search, "");
    const ticket = params.get("ticket");

    if (ticket) {
      try {
        (async () => {
          const { user, access, refresh } = await ssoLogin(ticket);
          setUser(user);
          storeJwtWithExpiry(access);
          storeJwtWithExpiry(refresh);
        })();
      } catch (err) {
        if (err instanceof ErrorHTTPNotOk) {
          setError(err.message);
        }
      } finally {
        const back = sessionStorage.getItem(BackPathnameKey);
        if (back) {
          navigate({ to: back });
          sessionStorage.removeItem(BackPathnameKey);
        }
      }
    } else {
      if (typeof window !== "undefined") {
        window.location.href = `https://sso.ui.ac.id/cas2/login?service=${encodeURIComponent(
          service,
        )}`;
      }
    }
  }, [setUser, navigate]);

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex flex-col">
        <div>{user ? "You have successfully logged in" : "Logging in..."}</div>
        {user && (
          <div>
            As
            {user.email}
          </div>
        )}
      </div>
      <div className="text-primary-red font-semibold">{error}</div>
    </div>
  );
}
