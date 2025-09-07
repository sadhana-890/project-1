"use client";

import React, { useState, ChangeEvent, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextField, FileUploadArea } from "./components/forms"
import { StepIndicator } from "./components/layout"
import ReactMarkdown from 'react-markdown'

// TypeScript interfaces
interface FormData {
  appName: string;
  appHandle: string;
  webhookUrl: string;
  description: string;
}

// Markdown Editor Component
const MarkdownEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex gap-6 text-sm text-gray-600">
        <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">File</span>
        <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Formatting</span>
        <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Theme</span>
      </div>

      {/* Editor Container */}
      <div className="flex min-h-[200px]">
        {/* Left Pane - Editor */}
        <div className="w-1/2 flex flex-col">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-3 border-none outline-none resize-none font-mono text-sm leading-relaxed bg-white text-gray-800 min-h-[200px] overflow-x-auto overflow-y-auto"
            placeholder="Write your app description in markdown..."
          />
        </div>

        {/* Right Pane - Preview */}
        <div className="w-1/2 border-l border-gray-200 bg-white overflow-y-auto overflow-x-auto">
          <div className="p-3 prose prose-gray max-w-none text-sm">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                h2: ({children}) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                h3: ({children}) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                h4: ({children}) => <h4 className="text-sm font-bold mb-2">{children}</h4>,
                h5: ({children}) => <h5 className="text-sm font-bold mb-2">{children}</h5>,
                h6: ({children}) => <h6 className="text-xs font-bold mb-2">{children}</h6>,
                p: ({children}) => <p className="mb-2 leading-relaxed text-sm">{children}</p>,
                strong: ({children}) => <strong className="font-bold">{children}</strong>,
                em: ({children}) => <em className="italic">{children}</em>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-gray-300 pl-3 italic mb-2 text-gray-600">
                    {children}
                  </blockquote>
                ),
                ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({children}) => <li className="mb-1 text-sm">{children}</li>,
                code: ({children, className}) => {
                  const isInline = !className
                  return isInline ? (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                      {children}
                    </code>
                  )
                }
              }}
            >
              {value || '*Preview will appear here...*'}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Form Component
const CreateNewAppForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    appName: "",
    appHandle: "",
    webhookUrl: "",
    description: "# h1 title\n## h2 title\n### h3 title\n#### h4 title\n##### h5 title\n###### h6 title\n\n**Bold text**\n*Italic text*\n***Italic bold text***\n\n> Blockquotes text\n-Not numbered list items\n-Not numbered list items\n-Not numbered list items\n1. Numbered list items\n2. Numbered list items\n3. Numbered list items\n*Not numbered list items\n*Not numbered list items\n*Not numbered list items\n\n![Image name](./src/images/001_image.jpg)\n\n```cpp\nstd::cout << \"Hello World!\" << std::endl;\n```",
  });

  const handleInputChange = useCallback((field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleTestConnection = useCallback((): void => {
    console.log("Testing connection...");
  }, []);

  const handleNext = useCallback((): void => {
    console.log("Form data:", formData);
  }, [formData]);

  return (
    <div className="w-full max-w-none sm:max-w-6xl mx-auto p-2 sm:p-6 lg:p-2">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 font-urbanist">
          Create a New App
        </h1>
      </div>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={1}
        totalSteps={3}
        stepLabel="Define Your App"
      />

      {/* Form */}
      <div className="space-y-6 sm:space-y-8">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* App Name */}
          <TextField
            label="App Name"
            placeholder="Enter a unique app name"
            required
            helpText
            value={formData.appName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("appName", e.target.value)
            }
          />

          {/* App Handle */}
          <TextField
          className="shadow-none"
            label="App Handle"
            placeholder="@exampleapp"
            required
            helpText
            value={formData.appHandle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("appHandle", e.target.value)
            }
          />

          {/* Webhook URL */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Webhook URL
                </Label>
                <span className="text-500">*</span>
                <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
              </div>
              <div className="relative">
                <Input
                  placeholder="https://api.yourserver.com/webhook"
                  className="pr-24 sm:pr-32 shadow-none"
                  value={formData.webhookUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("webhookUrl", e.target.value)
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestConnection}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-6 sm:h-7 text-xs px-2 sm:px-3 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700"
                  type="button"
                >
                  <span className="hidden sm:inline">Test Connection</span>
                  <span className="sm:hidden">Test</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Upload Section */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Column - App Description */}
          <div className="w-full lg:w-2/3 space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                App Description 
                <span className="text-grey-500">*</span>
                <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
              </Label>


            {/* Markdown Editor */}
            <MarkdownEditor
              value={formData.description}
              onChange={(value) => handleInputChange("description", value)}
            />
          </div>

          {/* Right Column - File Upload */}
          <div className="w-full lg:w-1/3 border-1 rounded-2xl h-70">
            <FileUploadArea />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-start items-center pt-4 sm:pt-6">
          <Button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 sm:py-2.5 text-sm sm:text-base"
            type="button"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAppForm;