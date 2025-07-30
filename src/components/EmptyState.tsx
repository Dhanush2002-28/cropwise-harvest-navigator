import React from "react";
import { ArrowRight } from "lucide-react";

export default function EmptyState({
  message = "No recommendations yet. Fill the form to get started!",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ArrowRight className="w-12 h-12 text-primary mb-4 animate-bounce" />
      <p className="text-xl text-foreground font-medium text-center">
        {message}
      </p>
    </div>
  );
}
