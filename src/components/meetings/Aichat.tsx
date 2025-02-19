"use client";

import { Button } from "~/components/ui/button";
import { useChat } from "ai/react";
import Link from "next/link";
import { ReactElement } from "react";
interface ChatProps {
  id: string;
}
export default function Aichat({ id }: ChatProps): ReactElement {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    id: id,
    body: {
      chatId: id,
    },
  });
  return (
    <div className="flex h-[85%] w-full flex-col justify-between">
      <div className="stretch mx-auto flex w-full max-w-md flex-col ">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </div>

      <form className="bottom-0" onSubmit={handleSubmit}>
        <input
          className=" m-auto mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
