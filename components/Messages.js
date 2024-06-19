"use client";
import Image from "next/image";
import { createClient } from "@/server/sb/client";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export function SystemMessage({ message, needsSep, richMessage }) {
  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={"/system.jpg"}
          width={30}
          height={30}
          className="rounded-full"
          alt="User Pic"
        />
        <h2 className="font-bold text-lg text-slate-900">Workout Assistant</h2>
      </div>
      <p>{message}</p>
      {richMessage}
      {needsSep && <Separator />}
    </div>
  );
}

export function UserMessage({ message }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    run();
  }, []);

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={user ? user.user_metadata.avatar_url : "/default.jpg"}
          width={30}
          height={30}
          className="rounded-full"
          alt="User Pic"
        />
        <h2 className="font-bold text-lg text-slate-900">
          <span>{user ? user.user_metadata.full_name : "User"}</span>
        </h2>
      </div>
      <p>{message}</p>
    </div>
  );
}
