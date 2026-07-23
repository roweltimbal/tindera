"use server"

import { redirect } from "next/navigation"
import { signInSchema } from "@/lib/schemas/user.schema"
import { validateAndSignIn } from "@/lib/auth/auth-service"

export type SignInActionState = { error: string } | null

export async function signInAction(
  _prevState: SignInActionState,
  formData: FormData
): Promise<SignInActionState> {
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Missing required fields." }
  }

  const parsed = signInSchema.safeParse({ email, password })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  const result = await validateAndSignIn(parsed.data.email, parsed.data.password)

  if ("error" in result) {
    return { error: result.error }
  }

  redirect("/dashboard")
}
