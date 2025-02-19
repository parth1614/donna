import React from "react";
import KeypointsItems from "./items/KeypointsItems";

interface KeypointsProps {
  data: string[] | undefined;
}

const Keypoints: React.FC<KeypointsProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      {data
        ? data.map((item) => <KeypointsItems key={item[0]} data={item[0]!} />)
        : "Nothing to display here"}
    </div>
  );
};

export default Keypoints;
