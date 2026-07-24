"use server"

import { logOutUser } from "@/lib/auth/session"

export async function logoutAction() {
  await logOutUser()
}
