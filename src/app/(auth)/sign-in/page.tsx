import { SignInForm } from "./SignInForm"

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-md">
        <SignInForm />
        <p className="mt-4 rounded-xl bg-status-in-stock px-4 py-3 text-center text-sm text-forest-green">
          <span className="font-bold">Demo account</span> — email: <span className="font-semibold">demo@gmail.com</span> · password: <span className="font-semibold">Demopass</span>
        </p>
      </div>
    </main>
  )
}
