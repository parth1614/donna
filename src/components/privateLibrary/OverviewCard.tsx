import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Meeting } from "~/@types/meeting";

interface OverviewCardProps {
  data: Meeting;
}
const OverviewCard: React.FC<OverviewCardProps> = ({
  data,
}: OverviewCardProps) => {
  console.log("sentData", data);

  function epochToDate(epochTime: number): string {
    const date = new Date(epochTime);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <>
      <Card className="">
        <CardHeader>
          {data.host_image ? (
            <img src={data.host_image} alt="Host Image" />
          ) : (
            <div className="h-40 w-full bg-slate-300"></div>
          )}
          <CardTitle>
            {data.title == "" ? "N/A" : data.title}
          </CardTitle>
          <CardDescription>
            {epochToDate(Number(data.meetingStartTime))}
            <br />
            <br />
            Attendees:
            <br />
            {data.attendees.length > 0
              ? data?.attendees?.map((speaker) => {
                  return speaker.name;
                })
              : "Donna Notetaker"}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between gap-2 p-0 px-3 pb-3">
          {/* <Link href={`/library/5884254a-fcdd-4470-9652-1726030596dd/view`}> */}
          <Link href={`/library/${data.callInstanceId}/view`}>
            <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default OverviewCard;
