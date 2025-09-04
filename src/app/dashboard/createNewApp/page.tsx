"use client"

import React, { useState, ChangeEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextField, FileUploadArea } from "./components/forms"
import { StepIndicator } from "./components/layout"
import RichTextToolbar from "./components/rich-text-editor/RichTextToolbar"

// Types for form data
interface FormData {
  appName: string
  appHandle: string
  webhookUrl: string
  description: string
}

const CreateNewAppForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    appName: "",
    appHandle: "",
    webhookUrl: "",
    description: "",
  })

  // Formatting states
  const [textColor, setTextColor] = useState("#000000")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isUnorderedList, setIsUnorderedList] = useState(false)
  const [isOrderedList, setIsOrderedList] = useState(false)
  const [textAlign, setTextAlign] = useState("left")
  const [textStyle, setTextStyle] = useState("paragraph")

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTestConnection = (): void => {
    console.log("Testing connection...")
  }

  const handleNext = (): void => {
    // Grab latest HTML from the editor before saving
    const editor = document.getElementById("editor")
    if (editor) {
      handleInputChange("description", editor.innerHTML)
    }
    console.log("Form data:", formData)
  }

  // Function to update formatting states based on current cursor position
  const updateFormattingState = () => {
    try {
      setIsBold(document.queryCommandState('bold'))
      setIsItalic(document.queryCommandState('italic'))
      setIsUnderline(document.queryCommandState('underline'))
      setIsStrikethrough(document.queryCommandState('strikethrough'))
      setIsUnorderedList(document.queryCommandState('insertUnorderedList'))
      setIsOrderedList(document.queryCommandState('insertOrderedList'))
    } catch (error) {
      // Ignore errors - some browsers might not support all commands
    }
  }

  // Handle formatting commands
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    
    // Update formatting states after command execution
    setTimeout(() => {
      updateFormattingState()
    }, 10)
  }

  // Keep formData.description in sync if editor is manually updated
  useEffect(() => {
    const editor = document.getElementById("editor")
    if (editor) {
      editor.innerHTML = formData.description
      
      // Add event listeners to update formatting state
      const handleSelectionChange = () => {
        updateFormattingState()
      }
      
      const handleInput = () => {
        updateFormattingState()
      }
      
      editor.addEventListener('keyup', handleSelectionChange)
      editor.addEventListener('mouseup', handleSelectionChange)
      editor.addEventListener('input', handleInput)
      
      // Initial state update
      updateFormattingState()
      
      return () => {
        editor.removeEventListener('keyup', handleSelectionChange)
        editor.removeEventListener('mouseup', handleSelectionChange)
        editor.removeEventListener('input', handleInput)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-none sm:max-w-6xl mx-auto p-3 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
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
                <span className="text-red-500">*</span>
                <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />
              </div>
              <div className="relative">
                <Input
                  placeholder="https://api.yourserver.com/webhook"
                  className="pr-24 sm:pr-32"
                  value={formData.webhookUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("webhookUrl", e.target.value)
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestConnection}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-6 sm:h-7 text-xs px-2 sm:px-3"
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
            <Label className="text-sm font-medium text-gray-700">
              App Description <span className="text-red-500">*</span>
            </Label>

            {/* Rich Text Toolbar */}
            <RichTextToolbar
              editorId="editor"
              textStyle={textStyle}
              onTextStyleChange={setTextStyle}
              textAlign={textAlign}
              onTextAlignChange={setTextAlign}
              isBold={isBold}
              isItalic={isItalic}
              isUnderline={isUnderline}
              isStrikethrough={isStrikethrough}
              isUnorderedList={isUnorderedList}
              isOrderedList={isOrderedList}
              onUndo={() => handleFormat("undo")}
              onRedo={() => handleFormat("redo")}
              onFormat={handleFormat}
              textColor={textColor}
              onTextColorChange={setTextColor}
            />

            {/* Editable Rich Text Area */}
            <div
              id="editor"
              contentEditable
              className="border p-2 min-h-[150px] rounded-md focus:outline-none"
              onInput={(e) =>
                handleInputChange("description", (e.target as HTMLDivElement).innerHTML)
              }
            />
          </div>

          {/* Right Column - File Upload */}
          <div className="w-full lg:w-1/3 border border-gray-300 rounded-md">
            <FileUploadArea />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-start items-center pt-4 sm:pt-6">
          <Button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 sm:py-2.5 text-sm sm:text-base"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateNewAppForm
