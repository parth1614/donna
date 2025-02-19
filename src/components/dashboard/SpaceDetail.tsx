"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import Tree from "react-d3-tree";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { extractTwitterId } from "~/lib/extractTwitterId";

interface SpaceData {
  original_transcript: string | null;
  abstract: string | null;
  mind_map: string | null;
  summary: string | null;
}

interface Space {
  id: number;
  user_id: string | null;
  space_url: string | null;
  status: string | null;
  original_transcript: string | null;
  abstract: string | null;
  mind_map: string | null;
  summary: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

interface SpaceDetailProps {
  space: Space | undefined;
}

const SpaceDetail: React.FC<SpaceDetailProps> = ({ space }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<keyof SpaceData>("abstract");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const tabNames: Record<keyof SpaceData, string> = {
    abstract: "Abstract",
    original_transcript: "Transcript",
    mind_map: "Mind Map",
    summary: "Summary",
  };

  function constructAudioUrls(twitterId: string): string[] {
    const baseUrl =
      "https://uflankzxkhbqwblpsvxg.supabase.co/storage/v1/object/public/spaces-reduced-bucket/";
    return [`${baseUrl}${twitterId}.mp3`, `${baseUrl}${twitterId}.opus`];
  }

  async function findValidAudioUrl(urls: string[]): Promise<string | null> {
    for (const url of urls) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          return url;
        }
      } catch (error) {
        console.error(`Error checking URL ${url}:`, error);
      }
    }
    return null;
  }

  async function processTwitterUrl(url: string): Promise<string | null> {
    const id = extractTwitterId(url);
    if (id) {
      const possibleUrls = constructAudioUrls(id);
      return await findValidAudioUrl(possibleUrls);
    }
    return null;
  }

  useEffect(() => {
    if (space?.space_url) {
      void processTwitterUrl(space.space_url).then((url) => {
        setAudioUrl(url);
      });
    }
  }, [space?.space_url]);

  const renderMindMap = (mindMapJson: string | null) => {
    if (!mindMapJson) return null;
    try {
      const mindMapData = JSON.parse(mindMapJson);
      return (
        <div style={{ width: "100%", height: "600px", overflow: "hidden" }}>
          <Tree
            data={mindMapData}
            orientation="horizontal"
            translate={{ x: 150, y: 250 }}
            separation={{ siblings: 1.2, nonSiblings: 1.8 }}
            nodeSize={{ x: 220, y: 50 }}
            zoom={0.5}
            centeringTransitionDuration={800}
            scaleExtent={{ min: 0.1, max: 1 }}
          />
        </div>
      );
    } catch (error) {
      console.error("Error parsing mind map JSON:", error);
      return <p className="text-red-500">Invalid mind map data</p>;
    }
  };

  if (!space) {
    return <div className="mt-8 text-center">Space not found</div>;
  }

  return (
    <div className="container mx-auto min-h-screen bg-main p-0 sm:p-4">
      <Button variant="neutral" onClick={() => router.back()} className="m-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Spaces
      </Button>

      <CardHeader>
        <CardTitle className="truncate text-sm">{space.space_url}</CardTitle>
        <CardDescription>Status: {space.status}</CardDescription>
      </CardHeader>
      <CardContent className="sm:p-6 p-1">
        {audioUrl && (
          <audio controls className="mb-4 w-full">
            <source
              src={audioUrl}
              type={audioUrl.endsWith(".mp3") ? "audio/mpeg" : "audio/ogg"}
            />
            Your browser does not support the audio element.
          </audio>
        )}
        <div className="mb-4 flex gap-2">
          {(Object.keys(tabNames) as Array<keyof SpaceData>).map((key) => (
            <Button
              key={key}
              variant={activeTab !== key ? "default" : "noShadow"}
              onClick={() => setActiveTab(key)}
              className="px-2 py-1 text-xs font-medium"
              size={"sm"}
            >
              {tabNames[key]}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          {activeTab === "mind_map" ? (
            renderMindMap(space.mind_map)
          ) : (
            <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap rounded bg-gray-100 p-0 text-base sm:p-4 md:text-xl">
              {space[activeTab]?.split(". ").map((sentence, index) => (
                <span key={index}>
                  {sentence.trim()}
                  {index < space[activeTab]!.split(". ").length - 1 ? (
                    <>
                      . <br /> <br />
                    </>
                  ) : null}
                </span>
              ))}
            </pre>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default SpaceDetail;
