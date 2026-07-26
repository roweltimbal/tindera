import Link from "next/link";
import { LogOut, Pencil, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logoutAction } from "@/app/dashboard/actions";

interface ProfileViewProps {
  name: string;
  email: string;
  storeName: string;
}

export function ProfileView({ name, email, storeName }: ProfileViewProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-full items-center justify-center bg-forest-green lg:hidden">
        <p className="text-lg font-bold text-white">Profile</p>
      </div>

      <div className="flex w-full max-w-[1176px] flex-col gap-6 px-5 py-6 lg:gap-8 lg:px-6 lg:py-12">
        <div className="hidden flex-col gap-1 lg:flex">
          <p className="font-heading text-4xl font-extrabold text-forest-green">
            Profile
          </p>
          <p className="text-[15px] text-muted-sage">
            Manage your personal and store information
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0px_4px_24px_0px_rgba(36,84,36,0.1)] lg:p-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gold-yellow lg:size-[72px]">
                <User className="size-7 text-forest-green" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-bold text-forest-green lg:text-[28px] lg:font-extrabold">
                  {name}
                </p>
                <p className="text-[15px] text-muted-sage">{email}</p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="gap-2 rounded-[10px] border-[1.5px] border-border-tan px-3 py-2 text-xs font-bold text-forest-green hover:bg-cream lg:h-11 lg:rounded-xl lg:border lg:px-4 lg:py-3 lg:text-sm"
            >
              <Link href="/dashboard/profile/edit">
                <Pencil className="size-3.5 lg:size-[18px]" />
                <span className="lg:hidden">Edit</span>
                <span className="hidden lg:inline">Edit Profile</span>
              </Link>
            </Button>
          </div>

          <Separator className="bg-border-tan lg:hidden" />

          <div className="flex flex-col gap-1.5">
            <p className="text-[13px] font-semibold text-muted-sage">Store</p>
            <p className="text-[15px] font-semibold text-body-sage">
              {storeName}
            </p>
          </div>
        </div>

        <form action={logoutAction} className="lg:hidden">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-border-tan px-5 py-4"
          >
            <LogOut className="size-[22px] text-forest-green" />
            <p className="text-[15px] font-semibold text-forest-green">
              Log out of account
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}
