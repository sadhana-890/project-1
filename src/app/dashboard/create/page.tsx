"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import remarkGfm from "remark-gfm";

// Lazy-load react-markdown to avoid SSR issues
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default function CreateAppPage() {
  const router = useRouter();
  const [appName, setAppName] = useState("");
  const [markdown, setMarkdown] = useState<string>(
    `# App description\n\nWrite details about your app.\n\n## Features\n\n- Unordered item A\n- Unordered item B\n  - Nested child item\n\n1. Ordered item one\n2. Ordered item two\n   1. Nested ordered child\n   2. Another child\n\n`);

  const isValid = appName.trim().length > 0;


  return (
    <div className="min-h-screen bg-white text-slate-900 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Create a New App</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button disabled={!isValid} className="bg-[#8759FF] text-white">Save</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded-xl p-4 bg-white">
            <label className="block text-sm font-medium text-slate-700 mb-2">App Name</label>
            <input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="My Awesome App"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="mt-4 block text-sm font-medium text-slate-700 mb-2">Description (Markdown)</label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={16}
              className="w-full rounded-md border px-3 py-2 text-sm font-mono leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-2 text-xs text-slate-500">
              Supports unordered lists (-, *), ordered lists (1., 2.), task lists ([ ]), and more.
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700">Preview</h2>
            </div>

            {/* Prose styles ensure proper bullets/numbers and spacing */}
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

