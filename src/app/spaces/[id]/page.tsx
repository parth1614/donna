import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import SpaceDetail from "~/components/dashboard/SpaceDetail";
import { api } from "~/trpc/server";

export default async function SpacesPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const { id } = params;

  const space = await api.twitterSpaces.getSpacesById({ id: parseInt(id) });

  return (
    <div className="flex flex-col gap-8">
      <SpaceDetail space={space[0]} />
    </div>
  );
}
