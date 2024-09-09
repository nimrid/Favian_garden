"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, RotateCw } from "lucide-react";
import { bulbLightningIcon } from "./_components/generate-page";

export default function HomePage() {
  const [text, setText] = React.useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <main className="container max-w-7xl mx-auto p-10">
      {/* Top Section */}
      <div className="flex items-center justify-end">
        <Button variant={"ghost"} size={"icon"} className="bg-accent-muted">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Generate Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl">Hi Soumitra</h1>
        <div className="relative group">
          <Textarea
            className="textarea-gradient bg-transparent text-white placeholder-gray-400 p-4 w-full h-40 rounded-lg border border-green-500/40 shadow-lg focus:ring-2 focus:ring-green-500 text-lg text-white/80"
            placeholder="Enter your Prompt..."
            maxLength={200}
            value={text} // Bind the value to the textarea
            onChange={handleTextChange} // Update state on text change
          />
          <div className="flex items-center justify-between mt-1">
            <Button variant={"ghost"} size={"icon"}>
              <RotateCw className="w-6 h-6 text-green-500" />
            </Button>
            <p className="text-end mt-1 text-sm text-muted-foreground">
              {text.length}/200
            </p>
          </div>

          {/* Inspire me button */}
          {text.length <= 100 && (
            <Button
              variant={"outline"}
              className="absolute left-3 bottom-14 rounded-xl border-green-500 transition-opacity duration-200 opacity-100"
            >
              <div className="flex space-x-2 items-center">
                {bulbLightningIcon()}
                <span>Inspire me</span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
