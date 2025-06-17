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
  const [suggestions, setSuggestions] = useState([]);
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
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Send an Anonymous Message</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Write Your Message</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Type your message here..."
            className="input input-bordered w-full p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button disabled={!message} onClick={sendMessage}>Send Message</Button>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Button variant="outline" onClick={suggestMessage}>
          Suggest Questions (Click to get suggestions)
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {suggestions.map((suggestion, index) => (
            <Card
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 cursor-pointer"
            >
              <CardContent className="p-4 text-gray-800">
                {suggestion}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
