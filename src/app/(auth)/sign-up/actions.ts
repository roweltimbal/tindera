"use server"

import { redirect } from "next/navigation"
import { signUpSchema } from "@/lib/schemas/user.schema"
import { signUpUser } from "@/lib/auth/auth-service"

export type SignUpActionState = { error: string } | null

export async function signUpAction(
  _prevState: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> {
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const storeName = formData.get("storeName")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof storeName !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return { error: "Missing required fields." }
  }

  const parsed = signUpSchema.safeParse({
    firstName,
    lastName,
    email,
    storeName,
    password,
    confirmPassword,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  const result = await signUpUser({
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    storeName: parsed.data.storeName,
    password: parsed.data.password,
  })

  if ("error" in result) {
    return { error: result.error }
  }

  redirect("/dashboard")
}
