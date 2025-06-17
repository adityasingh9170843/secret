'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';
import messages from '@/messages.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      {/* Background gradient with glow */}
      <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-4 md:px-24 py-12 overflow-hidden">

        {/* Hero Section */}
        <section className="text-center z-10 animate-fade-in-up mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            💬 Dive into Anonymous Feedback
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Where honesty meets privacy. Share and receive unfiltered truths.
          </p>
          <div className="mt-6 space-x-4">
            <Link href="/sign-up">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl">Get Started</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className=" bg-indigo-800 border-gray-400 text-white hover:bg-white/10">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full max-w-3xl z-10">
          <Carousel plugins={[Autoplay({ delay: 2500 })]} className="w-full">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-md transition-transform hover:scale-[1.02]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4 text-white/90">
                      <Mail className="mt-1" />
                      <div>
                        <p className="mb-1">{message.content}</p>
                        <p className="text-xs text-gray-400">{message.received}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-between mt-4 px-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </section>

        {/* Decorative Glow / Blob Background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 rounded-full opacity-30 blur-3xl animate-pulse -z-10" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl animate-pulse delay-300 -z-10" />
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-black/70 backdrop-blur-sm text-gray-300 text-sm">
        © {new Date().getFullYear()} Secret. All rights reserved.
      </footer>
    </>
  );
}
