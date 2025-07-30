import React from "react";
import { Progress } from "./ui/progress";

export default function UILoader({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-card text-card-foreground rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center">
        <Progress value={80} className="w-48 mb-4" />
        <span className="text-lg font-semibold text-primary animate-pulse">
          {message}
        </span>
      </div>
    </div>
  );
}
