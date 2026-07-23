import { SignInForm } from "./SignInForm"

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </main>
  )
}
