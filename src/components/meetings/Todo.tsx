import React from "react";
import { TodoItem } from "./items/TodoItems";
import { Copy } from "lucide-react";
import { toast } from "sonner";
interface Actionitems {
  data: string[];
}
function Todo(data: Actionitems) {
  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast(`Copied ${label} to clipboard`);
  };

  console.log("data >>>>", data);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-lg font-bold">{data.data.length} Items</span>
        <div onClick={() => handleCopy(data.data.join("\n"), "action items")}>
          <Copy />
        </div>
      </div>
      {data.data.map((item, index) => (
        <TodoItem key={index} data={item} />
      ))}
    </div>
  );
}

export default Todo;
