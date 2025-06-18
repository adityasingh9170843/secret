"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Page() {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const param = useParams();

  const sendMessage = async () => {
    try {
      const response = await axios.post("/api/send-message", {
        username: param.username,
        content: message,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setMessage("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Send Error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  const suggestMessage = async () => {
    try {
      const response = await axios.get("/api/suggest-messages");
      setSuggestions(response.data.result.split("||"));
      toast.success("Suggestions received!");
    } catch (error: any) {
      console.error("Error fetching suggestions", error);
      const errMsg = error.response?.data?.error || "Error getting message";
      toast.error(errMsg);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl shadow-2xl p-8 space-y-8">
        <h1 className="text-4xl font-bold text-indigo-700 text-center">
          Send an Anonymous Message
        </h1>

        <Card className="bg-white/90 border border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Write Your Message
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              disabled={!message}
              onClick={sendMessage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Send Message
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={suggestMessage}
            className="border-indigo-300 text-indigo-700 hover:border-indigo-500"
          >
            Suggest Questions (Click to get suggestions)
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-indigo-500 cursor-pointer bg-white/90"
              >
                <CardContent className="p-4 text-gray-800">
                  {suggestion}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
