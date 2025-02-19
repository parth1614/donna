"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface joinCallData {
  message: string;
  status: number;
}
interface JoinCallResponse {
  clientID: string;
  data: joinCallData;
}

interface JoinMeetingProps {
  currentUserId: string;
}

const JoinMeeting: React.FC<JoinMeetingProps> = ({ currentUserId }) => {
  const [meetLink, setMeetLink] = useState("");
  const [name, setName] = useState("Donna Notetaker");

  const joinMeet = async () => {
    if (
      meetLink.includes("zoom") ||
      meetLink.includes("google") ||
      meetLink.includes("teams")
    ) {
      toast("Donna Notetaker is joining your meeting in 60 seconds.", {
        duration: 10000,
      });

      try {
        const bearerToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";
        const response = await fetch(
          "https://api.goodmeetings.ai/v2/call/join",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({
              meetingUrl: meetLink,
              botName: name ?? "Donna Notetaker",
              client_client_id: currentUserId,
              workspace: "Smart_donna",
            }),
          },
        );

        const data: JoinCallResponse = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    } else {
      toast.error("Please enter a valid meeting link");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Copy paste the meeting link</CardTitle>
        <CardDescription>
          Invite notetaker ad hoc to a specific meeting
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-5">
        <Input
          value={meetLink}
          onChange={(e) => setMeetLink(e.target.value)}
          placeholder="Please enter a Zoom/Google Meet/Teams Meeting Link"
        />
        {/* <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bot Name"
        /> */}
        <Button onClick={joinMeet}>Join Meeting</Button>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Please note: It takes about a minute for Donna Notetaker to join.
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default JoinMeeting;
