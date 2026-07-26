// Cookie read/write helpers for session management
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
)

// Creating user session
export async function createUserSession(userId: string, storeId: string) {
    const token = await new SignJWT({
        userId,
        storeId
    })
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret)

    const cookieStore = await cookies()

    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    })
}

// Getting user session
export async function getUserSession() {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if(!token) {
        return null
    }

    try {
        const { payload } = await jwtVerify(token, secret)

        return {
            userId: payload.userId as string,
            storeId: payload.storeId as string,
        }
    } catch {
        return null
    }
}

// Validate user for Server Actions — returns {error} instead of throwing/redirecting
export async function validateUser(): Promise<{ error: string } | { userId: string; storeId: string }> {
    const session = await getUserSession()

    if (!session) {
        return { error: "You must be signed in to do that." }
    }

    return session
}

// Verify Session Token
export async function verifySessionToken(token: string | undefined) {
    if(!token) {
        return null
    }

    try {
        const { payload } = await jwtVerify(token, secret)
        return {
            userId: payload.userId as string,
            storeId: payload.storeId as string,
        } 
    } catch {
        return null
    }
} 

// logout user
export async function logOutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("session")

    redirect("/sign-in")
}