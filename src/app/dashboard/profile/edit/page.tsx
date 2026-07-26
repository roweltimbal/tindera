import { notFound, redirect } from "next/navigation";
import { getUserSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/users/user-service";
import { getStoreById } from "@/lib/stores/store-service";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

export default async function EditProfilePage() {
  const session = await getUserSession();
  if (!session) {
    redirect("/sign-in");
  }

  const [user, store] = await Promise.all([
    getUserById(session.userId),
    getStoreById(session.storeId),
  ]);

  if (!user || !store) {
    notFound();
  }

  return (
    <EditProfileForm
      firstName={user.firstName}
      lastName={user.lastName}
      email={user.email}
      storeName={store.storeName}
    />
  );
}
