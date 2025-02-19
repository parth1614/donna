import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

const AccesControl = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-start gap-5">
          <div>Should my meetings be private by default?</div>
          <RadioGroup defaultValue="yes">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="yes" />
              <Label htmlFor="yes">No</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccesControl;
