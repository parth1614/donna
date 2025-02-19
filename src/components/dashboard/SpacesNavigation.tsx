"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Rocket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const SpacesNavigation = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/spaces');
  };

  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle>Explore Twitter Spaces</CardTitle>
        <CardDescription>
          Discover and analyze your favorite Twitter Spaces conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Twitter Spaces</h1>
          <h2>Access your Spaces dashboard</h2>
        </div>
        <Button onClick={handleClick} className="flex items-center">
          <Rocket className="mr-2" size={20} />
          Launch Spaces
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpacesNavigation;