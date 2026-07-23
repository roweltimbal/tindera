"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signInAction, type SignInActionState } from "./actions"

const inputClassName =
  "h-12 w-full rounded-xl border border-border-tan bg-white px-[14px] text-sm text-forest-green placeholder:text-muted-sage focus:outline-none"

export function SignInForm() {
  const [state, formAction, pending] = useActionState<SignInActionState, FormData>(
    signInAction,
    null
  )

  return (
    <Card className="rounded-2xl bg-white p-6 shadow-[0px_4px_24px_0px_rgba(36,84,36,0.1)] ring-0">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-extrabold text-forest-green">
          Sign in to Tindera
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[13px] font-semibold text-forest-green">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[13px] font-semibold text-forest-green">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputClassName}
            />
          </div>

          <p className="text-sm text-body-sage">
            Doesn&apos;t have a Tindera account yet?{" "}
            <Link href="/sign-up" className="font-semibold text-forest-green hover:underline">
              Click here to create an account
            </Link>
          </p>

          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

          <div className="flex items-center justify-end gap-4 border-t border-border-tan pt-6">
            <Link href="/" className="text-sm font-medium text-body-sage hover:underline">
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-gold-yellow px-6 text-[15px] font-extrabold text-forest-green shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)] hover:bg-gold-yellow/90 disabled:opacity-50"
            >
              {pending ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
