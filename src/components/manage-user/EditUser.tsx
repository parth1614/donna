/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FileUpload from "../common/FileUpload";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";
import { createClient } from "@supabase/supabase-js";
import { signOut } from "next-auth/react";

interface EditUserProps {
  name: string;
  email: string;
  image: string;
}

const EditUser: React.FC<EditUserProps> = ({
  name: propName,
  email,
  image,
}) => {
  const [name, setName] = useState(propName);
  const [file, setFile] = useState<File | null>(null);

  const userName = api.user.updateUserName.useMutation();

  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // const supabase = createClient(supabaseUrl!, supabaseKey!);

  // const uploadImage = async (file: File) => {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("your-bucket-name")
  //       .upload(`${Date.now()}-${file.name}`, file, {
  //         cacheControl: "3600",
  //         upsert: false,
  //       });

  //     if (error) {
  //       return { error: { message: error.message } };
  //     }

  //     return data?.path;
  //   } catch (error) {
  //     return { error: { message: "Error uploading image" } };
  //   }
  // };

  const handleSave = async () => {
    if (name !== propName) {
      userName.mutate({ name });
    }

    // if (file) {
    //   const location = await uploadImage(file);
    //   console.log("location", location);
    // }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <div>
          <div className="mt-4 flex flex-row items-center gap-2">
            <FileUpload
              onFileChange={(file) => {
                setFile(file);
              }}
              className="h-10 w-10"
              value={image}
            />
            <div className="text-3xl">{name}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between gap-5">
          <div className="w-full">
            <div>Display Name</div>
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className="w-full">
            <div>Email Id</div>
            <Input value={email} disabled />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button onClick={handleSave} className="mt-4">
              Save
            </Button>
          <Button onClick={() => signOut()} className="mt-4 ml-2">
              Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditUser;
