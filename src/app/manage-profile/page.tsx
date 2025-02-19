import { redirect } from "next/navigation";
import React from "react";
import EditUser from "~/components/manage-user/EditUser";

import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const name = session?.user.name;
  const email = session?.user.email;
  const image = session?.user.image;

  return (
    <div className="flex flex-col gap-8 p-4">
      <EditUser name={name!} email={email!} image={image!} />
      {/* <AccesControl /> */}
    </div>
  );
};

export default page;
