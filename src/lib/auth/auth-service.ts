// Auth business logic: password hashing/verification, user lookup
// STUB — fake internals, real signatures. Replace with Argon2/MongoDB/JWT tomorrow.

export async function validateAndSignIn(
  email: string,
  password: string
): Promise<{ error: string } | { success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (email === "fail@test.com") {
    return { error: "Invalid email or password." }
  }

  return { success: true }
  // TODO(rowel): replace with real Argon2 verify + JWT session creation
}

export async function signUpUser(input: {
  firstName: string
  lastName: string
  email: string
  storeName: string
  password: string
}): Promise<{ error: string } | { success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (input.email === "taken@test.com") {
    return { error: "Email already registered." }
  }

  return { success: true }
  // TODO(rowel): replace with real store creation -> user creation
  // (with orphaned-store cleanup on failure) -> Argon2 hash -> JWT session
}
