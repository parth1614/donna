import React from "react";

interface TldrProps {
  data:
    | {
        name: string;
        text: string;
      }[]
    | undefined;
}

const Tldr: React.FC<TldrProps> = ({ data }) => {
  return (
    <div>
      {data &&
        data?.length > 0 &&
        data?.map((item) => (
          <p key={item.name} className="my-4 text-lg">
            <span className="font-semibold">{item.name}: &nbsp;</span>
            {item.text}
          </p>
        ))}
    </div>
  );
};

export default Tldr;
