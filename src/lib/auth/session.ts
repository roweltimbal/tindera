// Cookie read/write helpers for session management
import { SignJWT } from "jose"
import { cookies } from "next/headers"

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