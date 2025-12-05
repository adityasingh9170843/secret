"use client";

import { Mail, Shield, Zap, Lock, User } from "lucide-react";
import Link from "next/link";
import messages from "@/messages.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse" />
            Now with AI Suggestions
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            True Feedback.
            <br />
            <span className="text-indigo-400">Zero Filters.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Collect anonymous messages, honest opinions, and candid confessions. Experience the freedom of uninhibited communication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
                Start Receiving Messages
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator className="bg-slate-800/50 max-w-6xl mx-auto" />

      {/* Features */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Secret?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built for privacy, designed for connection. Our platform ensures your identity remains protected while you connect with others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Shield className="w-6 h-6 text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Total Anonymity</CardTitle>
                <CardDescription>Say what you mean without revealing who you are.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Your identity is never revealed. Send and receive messages without fear of judgment or repercussions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Secure & Private</CardTitle>
                <CardDescription>Security-first architecture with smart privacy defaults.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  End-to-end encryption ensures your conversations stay between you and the recipient. No prying eyes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                  <Zap className="w-6 h-6 text-pink-400" />
                </div>
                <CardTitle className="text-xl text-white">Instant Delivery</CardTitle>
                <CardDescription>Real-time messaging that just works.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Messages are delivered in real-time. Get instant notifications and respond whenever you're ready.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Message Carousel */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">See What People Are Saying</h2>
              <p className="text-slate-400 text-lg mb-8">
                From heartfelt confessions to constructive feedback, see how our community uses Secret to communicate openly.
              </p>
              <div className="flex gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-medium text-slate-400"
                    >
                      <User size={16} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 flex items-center">Join 10,000+ users today</p>
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full max-w-sm mx-auto md:max-w-md">
                <CarouselContent>
                  {messages.map((message, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-lg font-medium text-indigo-300 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {message.title}
                            </CardTitle>
                            <CardDescription className="text-slate-500">{message.received}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-300 italic">"{message.content}"</p>
                          </CardContent>
                          <CardFooter>
                            <div className="text-xs text-slate-500">Anonymous User</div>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white" />
                  <CarouselNext className="bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-indigo-600/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of others who are already sharing their thoughts freely and securely.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="h-14 px-10 text-lg bg-white text-indigo-600 hover:bg-slate-100 hover:text-indigo-700 font-semibold">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-slate-950 text-center text-slate-500 text-sm">
        <div className="container mx-auto px-4">© {new Date().getFullYear()} Secret. All rights reserved.</div>
      </footer>
    </main>
  );
}
