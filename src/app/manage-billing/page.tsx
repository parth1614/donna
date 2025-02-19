import { redirect } from "next/navigation";
import React, { useState } from "react";
import Billing from "~/components/billing";
import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();
  

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <Billing/>;
};

export default page;
