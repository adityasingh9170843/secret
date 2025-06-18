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
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      toast.error("Error accepting messages");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/get-messages");
      setMessages(response.data.message || []);
      if (refresh) {
        toast.success("Messages refreshed");
      }
    } catch (error) {
      toast.error("Error fetching messages");
    } finally {
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get("/api/dashboard/analytics");
      setTotalMessages(response.data.messageCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!session.data || !session.data.user) return;
    fetchAcceptMessage();
    fetchMessages();
    fetchAnalysis();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error accepting messages");
    }
  };

  if (!session.data || !session.data.user) {
    return <div>You are not logged in</div>;
  }

  const { username } = session.data.user;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 space-y-8 border border-gray-300">
        <h1 className="text-4xl font-bold text-indigo-700">User Dashboard</h1>

        {/* Unique Shareable Link */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Copy Your Unique Link</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="w-full p-3 rounded-md border border-gray-300 bg-white/90 text-gray-800 focus:outline-none"
            />
            <Button onClick={copyToClipboard} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Copy
            </Button>
          </div>
        </div>

        {/* Accept Messages Switch */}
        <div className="flex items-center space-x-3">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="text-gray-700 font-medium">
            Accept Messages: {acceptMessages ? "On" : "Off"}
          </span>
        </div>

        <Separator />

        {/* Refresh Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Refresh Messages
              </>
            )}
          </Button>
        </div>

        {/* Message Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id as string}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p className="text-gray-500">No messages to display.</p>
          )}
        </div>

        <Separator />

        {/* Analytics Section */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">Analytics Dashboard</h1>
          <StatsCards total={totalMessages} positive={0} negative={0} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
