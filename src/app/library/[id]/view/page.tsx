"use client";
import React, { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useParams } from "next/navigation";
import Todo from "~/components/meetings/Todo";
import Keypoints from "~/components/meetings/Keypoints";
import Tldr from "~/components/meetings/Tldr";
import Player from "next-video/player";
// import { Video } from "~/components/meetings/video";

interface Synopsis {
  summary: string;
  keypoints: string[][];
  video: string;
  date: string;
  speakers: {
    name: string;
  }[];
  transcript: {
    name: string;
    text: string;
  }[];
  actionItems: string[];
}

function Page() {
  const [index, setIndex] = useState<number>(0);
  const params = useParams<{ id: string }>();
  const [synopsis, setSynopsis] = useState<Synopsis>();
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const getData = async () => {
    setLoading(true);
    const transcriptUrl =
      "https://api.goodmeetings.ai/v2/transcript/get?callInstanceId=";
    const instanceUrl =
      "https://api.goodmeetings.ai/v2/call/get-meeting-instance-info?callInstanceId=";
    try {
      const transcriptResponse = await fetch(transcriptUrl + params.id, {
        headers,
      });
      const instanceResponse = await fetch(instanceUrl + params.id, {
        headers,
      });

      const transcriptData = await transcriptResponse.json();
      const instanceData = await instanceResponse.json();

      console.log("transcriptData", transcriptData);
      console.log("instanceData", instanceData);
      const data: Synopsis = {
        transcript: transcriptData.data,
        summary:
          instanceData.data?.[0]?.summary?.summary_text?.[0] ?? undefined,
        keypoints:
          instanceData.data?.[0]?.summary?.summary_time_data ?? undefined,
        video:
          instanceData.data?.[0]?.recordings?.[0]?.recorded_video_url_aws ??
          undefined,
        actionItems: instanceData.data?.[0]?.summary?.action_items ?? undefined,
        date: epochToDate(instanceData.data?.[0]?.meetingStartTime as number),
        speakers: instanceData.data?.[0]?.speakers ?? undefined,
      };

      setSynopsis(data);
    } catch (error) {
      console.log("error", error);
      return { data: "error" };
    } finally {
      setLoading(false);
    }
  };

  function epochToDate(epochTime: number): string {
    if (!epochTime) return "";
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

  console.log("synopsis", synopsis, params.id);

  useEffect(() => {
    void getData();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="h-screen w-full">
        <div className="flex w-full flex-col gap-5 p-2 md:flex-row md:p-20">
          <Card className="w-full">
            <CardHeader>
              {synopsis?.video ? (
                <Player src={synopsis?.video} />
              ) : (
                <Player src="" />
              )}
            </CardHeader>
            <CardContent>
              <h1 className="mb-6 text-xl">Summary</h1>
              {loading ? (
                <p>Loading...</p>
              ) : synopsis?.summary ? (
                <>
                  <p>{synopsis.summary}</p>
                  <p className="my-4">{synopsis.date}</p>
                  <h1 className="mb-2 text-xl">Speakers</h1>
                  <div className="flex flex-wrap gap-2">
                    {synopsis?.speakers?.map((speaker, index) => (
                      <p key={index}>{speaker.name}</p>
                    ))}
                  </div>
                </>
              ) : (
                <p>Nothing to display here</p>
              )}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <div className="flex flex-row justify-center gap-5">
                  {/* <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(1);
                    }}
                  >
                    Keypoints
                  </Button> */}
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(0);
                    }}
                  >
                    Action Items
                  </Button>
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(3);
                    }}
                  >
                    Transcript
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full ">
                {index === 0 && (
                  <>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <>{<Todo data={synopsis?.actionItems ?? []} />}</>
                    )}
                  </>
                )}
                {index === 1 && (
                  <>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <>
                        <Keypoints data={synopsis?.keypoints?.[0]} />
                      </>
                    )}
                  </>
                )}
                {index === 3 && (
                  <>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <>
                        <Tldr data={synopsis?.transcript} />
                      </>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
