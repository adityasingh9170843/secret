"use client";
import { Message } from "@/model/User";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/MessageCard";
import { StatsCards } from "@/components/statsCard";
;
function Dashboard() {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);




  const handleDeleteMessage = (messageID: string) => {
    setMessages(messages.filter((message) => message._id !== messageID));
    setTotalMessages(totalMessages - 1);
  };

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const session = useSession();

  

  const fetchAcceptMessage = useCallback(async () => {
    try {
      setIsSwitchLoading(true);
      const response = await axios.get("/api/accept-messages");
      console.log("response", response);
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      console.log(error);
      toast.error("Error accepting messages");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get("/api/get-messages");

        setMessages(response.data.message || []);
        if (refresh) {
          toast.success("Messages refreshed");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching messages");
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );




  const fetchAnalysis = async () => {
    try{
      const response = await axios.get('/api/dashboard/analytics');
      console.log("response-analysis", response);
      setTotalMessages(response.data.messageCount);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    if (!session.data || !session.data.user) {
      return;
    }
    console.log("session", session);
    fetchAcceptMessage();
    fetchMessages();
    fetchAnalysis();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      console.log("response-after-switch", response);
      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error accepting messages");
    }
  };

  if (!session.data || !session.data.user) {
    return <div>You are not logged in</div>;
  }

  const { username } = session.data.user;
  //more research on this
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
      <Separator className="mt-4" />
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <StatsCards total={totalMessages} positive={0} negative={0}  />
      </div>
    </div>
  );
}

export default Dashboard;
