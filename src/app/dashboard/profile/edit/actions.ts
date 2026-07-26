"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { MongoServerError } from "mongodb"
import { editProfileSchema } from "@/lib/schemas/user.schema"
import { updateUserById } from "@/lib/users/user-service"
import { updateStoreById } from "@/lib/stores/store-service"
import { validateUser } from "@/lib/auth/session"

export type EditProfileActionState = { error: string } | null

export async function editProfileAction(
  _prevState: EditProfileActionState,
  formData: FormData
): Promise<EditProfileActionState> {
  const auth = await validateUser()
  if ("error" in auth) {
    return { error: auth.error }
  }

  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const storeName = formData.get("storeName")

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof storeName !== "string"
  ) {
    return { error: "Missing required fields." }
  }

  const parsed = editProfileSchema.safeParse({ firstName, lastName, email, storeName })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  try {
    await updateUserById(auth.userId, {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
    })
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      return { error: "Email already registered." }
    }
    return { error: "Something went wrong. Please try again." }
  }

  await updateStoreById(auth.storeId, { storeName: parsed.data.storeName })

  revalidatePath("/dashboard/profile")
  redirect("/dashboard/profile")
}
