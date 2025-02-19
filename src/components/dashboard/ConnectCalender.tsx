"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface ConnectCalendarProps {
  currentUserId: string;
}

const ConnectCalendar: React.FC<ConnectCalendarProps> = ({ currentUserId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;

    console.log(currentUserId + ' first check');

    // Check if the user is already authenticated
    const checkUserStatus = async () => {
      try {
        const response = await fetch(`https://auto.smartdonna.com/check-user?userId=${currentUserId}`);
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus().catch(error => console.error("Error in checkUserStatus:", error));
  }, [currentUserId]);

  const handleClick = () => {
    if (!currentUserId) return;

    const originUrl = encodeURIComponent(window.location.origin);

    // Call the auth endpoint
    window.location.href = `https://auto.smartdonna.com/auth?userId=${currentUserId}&originUrl=${originUrl}`;
  };

  if (isLoading) {
    return <div>Checking calendar status...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAuthenticated ? 'You have connected your calendar' : 'Connect to Calendar'}</CardTitle>
        {!isAuthenticated && (
          <CardDescription>
            Auto-invite notetaker to calendar events
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex w-full flex-row items-center justify-between">
          {isAuthenticated ? (
            <div className="flex border border-green-500 p-4 rounded-md w-full">
              <h1 className="text-l font-normal">Smart Donna can now automatically attend your meetings</h1>
              <span className="text-green-500 text-l ml-2">✅</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Google</h1>
                <h2>Connect your Google Calendar</h2>
              </div>
              <Button onClick={handleClick}>Connect</Button>
            </>
          )}
        </div>
      </CardContent>
      <div className="p-4 w-full">
        <p className="text-sm">
          When you connect your calendar you automatically agree to our
          <Link href={'https://smartdonna.com/privacy.html'} className="underline ml-1">
            privacy policy
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default ConnectCalendar;
