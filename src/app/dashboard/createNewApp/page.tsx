"use client";

import React, { useState, ChangeEvent, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextField, FileUploadArea } from "./components/forms"
import { StepIndicator } from "./components/layout"

// TypeScript interfaces
interface FormData {
  appName: string;
  appHandle: string;
  webhookUrl: string;
  description: string;
}

// Custom TextArea Component
const SafeTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full p-3 border-none outline-none resize-none text-sm leading-relaxed bg-white text-gray-950 overflow-y-auto"></div>
    );
  }

  return (
    <textarea
      {...props}
      suppressHydrationWarning
    />
  );
};

// Simple Text Editor Component
const SimpleTextEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden h-63"> 
      <SafeTextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-3 border-none outline-none resize-none text-sm leading-relaxed bg-white text-gray-950 overflow-y-auto focus:ring-0"
        placeholder="Enter short description for the new app"
      />
    </div>
  );
};

// Main Form Component  
const CreateNewAppForm: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    appName: "",
    appHandle: "",
    webhookUrl: "",
    description: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="w-full max-w-none sm:max-w-6xl mx-auto p-2 sm:p-6 lg:p-2" suppressHydrationWarning>
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
      <div className="space-y-6 sm:space-y-8" suppressHydrationWarning>
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* App Name */}
          {mounted && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  App Name
                </Label>
                <span className="text-grey-700">*</span>
                <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
              </div>
              <Input
                placeholder="Enter a unique app name"
                className="border border-gray-300 shadow-none focus:border-blue-500 focus:ring-0 text-gray-900 placeholder:text-gray-350"
                value={formData.appName}
                 style={{ fontSize: '12px' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("appName", e.target.value)
                }
              />
            </div>
          )}

          {/* App Handle */}
          {mounted && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  App Handle
                </Label>
                <span className="text-grey-700">*</span>
                <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
              </div>
              <Input
                placeholder="@exampleapp"
                className="border border-gray-300 shadow-none focus:border-blue-500 focus:ring-0 placeholder:text-gray-350"
                value={formData.appHandle}
                 style={{ fontSize: '12px' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("appHandle", e.target.value)
                }
              />
            </div>
          )}

          {/* Webhook URL */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Webhook URL
                </Label>
                <span className="text-grey-700">*</span>
                <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
              </div>
              {mounted && (
                <div className="relative">
                <Input
                  placeholder="https://api.yourserver.com/webhook"
                  className="pr-24 sm:pr-32 border border-gray-300 shadow-none focus:border-blue-500 focus:ring-0 placeholder:text-gray-350"
                  style={{ fontSize: '12px' }}
                  value={formData.webhookUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("webhookUrl", e.target.value)
                  }
                />
               <Button
                variant="outline"
                size="sm"
                onClick={handleTestConnection}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-5 sm:h-6 text-xs px-1.5 sm:px-2.5 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700"
                type="button"
                suppressHydrationWarning
              >
                <span className="hidden sm:inline">Test Connection</span>
                <span className="sm:hidden">Test</span>
              </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description and Upload Section */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Column - App Description */}
          <div className="w-full lg:w-2/3 space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              App Description 
              <span className="text-grey-700">*</span>
              <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
            </Label>

            {/* Simple Text Editor */}
            {mounted && (
              <SimpleTextEditor
                value={formData.description}
                onChange={(value) => handleInputChange("description", value)}
              />
            )}
          </div>

          {/* Right Column - File Upload */}
          <div className="w-full lg:w-1/3 border border-gray-300 rounded-lg h-70">
            <FileUploadArea />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-start items-center pt-1 sm:pt-1">
          <Button
          onClick={handleNext}
          className="border rounded-[18px] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
          type="button"
          suppressHydrationWarning
        >
          Next
        </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAppForm;