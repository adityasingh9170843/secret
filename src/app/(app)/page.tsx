"use client";

import { Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import messages from "@/messages.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-4 md:px-12 py-16">
      {/* Hero Section */}
      <section className="text-center mb-12 max-w-3xl mx-auto">
        <Badge className="bg-indigo-600 text-white mb-4 px-3 py-1 rounded-full">
          Anonymous Feedback Platform
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Empowering Honest Conversations
        </h1>
        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          A place where truth is shared freely — no names, no judgment.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link href="/sign-up">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size={"lg"}
              variant="outline"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Tabs + Carousel Section */}
      <section className="max-w-4xl mx-auto z-10">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="flex justify-center mb-6 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
            <TabsTrigger className="py-3" value="messages">
              💌 Recent Messages
            </TabsTrigger>
            <TabsTrigger className="py-3" value="highlights">
              ✨ Highlights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <TabsContent value="messages">
              <div className="h-96 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-white/10">
                {messages.map((message, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-2xl hover:scale-[1.01] transition-all rounded-xl"
                  >
                    <CardHeader className="pb-1">
                      <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
                        <Mail size={18} className="text-indigo-400" />
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/90">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {message.received}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </TabsContent>

          <TabsContent value="highlights">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-tr from-indigo-700 via-purple-700 to-blue-700 text-white p-6 rounded-xl shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles size={20} />
                    User-Centric Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Built for simplicity, responsiveness, and accessibility across
                  all devices.
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 text-white p-6 rounded-xl shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles size={20} />
                    Real-Time Messaging
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Experience instant message delivery and refreshing feedback
                  insights.
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 opacity-30 rounded-full blur-3xl -z-10 animate-pulse delay-200" />

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-400 text-sm">
        © {new Date().getFullYear()} Secret. All rights reserved.
      </footer>
    </main>
  );
}
