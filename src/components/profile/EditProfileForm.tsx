"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { editProfileAction, type EditProfileActionState } from "@/app/dashboard/profile/edit/actions";

const inputClassName =
  "h-12 w-full rounded-xl border border-border-tan bg-white px-[14px] text-[15px] text-body-sage placeholder:text-muted-sage focus:outline-none";

interface EditProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  storeName: string;
}

export function EditProfileForm({
  firstName,
  lastName,
  email,
  storeName,
}: EditProfileFormProps) {
  const [state, formAction, pending] = useActionState<EditProfileActionState, FormData>(
    editProfileAction,
    null
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-full items-center bg-forest-green px-5 lg:hidden">
        <Link href="/dashboard/profile" className="flex size-10 items-center">
          <ChevronLeft className="size-6 text-white" />
        </Link>
        <p className="flex-1 text-center text-lg font-bold text-white">
          Edit Profile
        </p>
        <div className="size-10" />
      </div>

      <div className="flex w-full max-w-[520px] flex-col gap-6 px-5 py-6 lg:gap-8 lg:px-6 lg:py-12">
        <p className="hidden font-heading text-4xl font-extrabold text-forest-green lg:block">
          Edit Profile
        </p>

        <form
          action={formAction}
          className="flex w-full flex-col gap-6 rounded-[20px] bg-white p-5 shadow-[0px_4px_6px_0px_rgba(36,84,36,0.1)] lg:p-6"
        >
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="firstName"
                className="text-[13px] font-semibold text-forest-green"
              >
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={firstName}
                className={inputClassName}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="lastName"
                className="text-[13px] font-semibold text-forest-green"
              >
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                defaultValue={lastName}
                className={inputClassName}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[13px] font-semibold text-forest-green"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={email}
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="storeName"
              className="text-[13px] font-semibold text-forest-green"
            >
              Store name
            </label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              defaultValue={storeName}
              className={inputClassName}
            />
          </div>

          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

          <div className="flex gap-3 pt-2">
            <Link
              href="/dashboard/profile"
              className="flex h-14 flex-1 items-center justify-center rounded-2xl border-[1.5px] border-forest-green text-base font-semibold text-forest-green"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={pending}
              className="h-14 flex-1 rounded-2xl bg-gold-yellow text-base font-bold text-forest-green shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)] hover:bg-gold-yellow/90 disabled:opacity-50"
            >
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
