import React from "react";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";

interface KeypointsItemsProps {
  data: string;
}

const KeypointsItems: React.FC<KeypointsItemsProps> = ({ data }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-md">{data}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default KeypointsItems;
