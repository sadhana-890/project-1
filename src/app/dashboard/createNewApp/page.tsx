"use client";

import React, { useState, ChangeEvent, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextField, FileUploadArea } from "./components/forms"
import { StepIndicator } from "./components/layout"

// Lexical imports
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// Lexical nodes
import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';

// Lexical commands and utilities
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  $createParagraphNode,
  ElementFormatType,
  $getRoot,
} from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

// Lucide icons
import {
  Undo2,
  Redo2,
  ChevronDown,
  AlignJustify,
} from 'lucide-react';

// TypeScript interfaces
interface FormData {
  appName: string;
  appHandle: string;
  webhookUrl: string;
  description: string;
}

interface DropdownOption {
  value: string;
  label: string;
  action: () => void;
}

type ElementFormatOptions = 'left' | 'center' | 'right' | 'justify';
type HeadingLevel = 'h1' | 'h2' | 'h3';

// Lexical theme with text colors
const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'mb-1 text-sm leading-relaxed',
  quote: 'border-l-4 border-gray-400 pl-4 italic text-gray-600 my-2',
  heading: {
    h1: 'text-2xl font-bold mb-2',
    h2: 'text-xl font-bold mb-2',
    h3: 'text-lg font-bold mb-2',
  },
  list: {
    nested: { listitem: 'list-item' },
    ol: 'list-decimal list-inside mb-2',
    ul: 'list-disc list-inside mb-2',
    listitem: 'mb-1',
  },
  link: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono',
  },
  code: 'bg-gray-100 p-2 rounded font-mono text-sm my-2 block overflow-x-auto',
};

// Text Format Dropdown Component
const TextFormatDropdown: React.FC<{
  currentValue: string;
  onSelect: (type: string) => void;
}> = ({ currentValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: DropdownOption[] = [
    { value: 'paragraph', label: 'Normal text', action: () => onSelect('paragraph') },
    { value: 'h1', label: 'Heading 1', action: () => onSelect('h1') },
    { value: 'h2', label: 'Heading 2', action: () => onSelect('h2') },
    { value: 'h3', label: 'Heading 3', action: () => onSelect('h3') },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 h-8 rounded hover:bg-gray-200 text-sm text-gray-700 border border-gray-300 bg-white min-w-[120px]"
      >
        <span>{currentValue}</span>
        <ChevronDown size={12} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-[150px]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t last:rounded-b"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Text Alignment Dropdown Component
const AlignmentDropdown: React.FC<{
  currentAlignment: ElementFormatOptions;
  onSelect: (alignment: ElementFormatOptions) => void;
}> = ({ currentAlignment, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options = [
    { value: 'left' as ElementFormatOptions, label: 'Align Left' },
    { value: 'center' as ElementFormatOptions, label: 'Align Center' },
    { value: 'right' as ElementFormatOptions, label: 'Align Right' },
    { value: 'justify' as ElementFormatOptions, label: 'Justify' },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 h-8 rounded hover:bg-gray-200 text-sm text-gray-700 border border-gray-300 bg-white"
      >
        <AlignJustify size={16} />
        <ChevronDown size={12} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-[120px]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t last:rounded-b ${
                  currentAlignment === option.value ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Color Picker Dropdown Component
const ColorDropdown: React.FC<{
  onColorSelect: (color: string) => void;
}> = ({ onColorSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>('#000000');

  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    '#FF0000', '#FF6600', '#FFCC00', '#00FF00', '#0066FF', '#6600FF',
    '#FF0066', '#00FFFF', '#FF00FF', '#FFFF00', '#800080', '#008080',
  ];

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    onColorSelect(color);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 h-8 rounded hover:bg-gray-200 text-sm text-gray-700 border border-gray-300 bg-white"
      >
        <div 
          className="w-4 h-4 rounded-sm border border-gray-400" 
          style={{ backgroundColor: currentColor }}
        />
        <ChevronDown size={12} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          {/* Color Picker Menu */}
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 p-2">
            <div className="grid grid-cols-6 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Main Toolbar Component - Step by Step
function StepByStepToolbar() {
  const [editor] = useLexicalComposerContext();
  
  // State management
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [currentBlockType, setCurrentBlockType] = useState<string>('Normal text');
  const [currentAlignment, setCurrentAlignment] = useState<ElementFormatOptions>('left');

  // Register undo/redo listeners
  useEffect(() => {
    const unregisterUndo = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload: boolean) => {
        setCanUndo(payload);
        return false;
      },
      1
    );

    const unregisterRedo = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload: boolean) => {
        setCanRedo(payload);
        return false;
      },
      1
    );

    return () => {
      unregisterUndo();
      unregisterRedo();
    };
  }, [editor]);

  // Handle text format changes
  const handleTextFormat = useCallback((type: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (type === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
          setCurrentBlockType('Normal text');
        } else if (type.startsWith('h')) {
          $setBlocksType(selection, () => $createHeadingNode(type as HeadingLevel));
          setCurrentBlockType(`Heading ${type.charAt(1)}`);
        }
      }
    });
  }, [editor]);

  // Handle alignment changes
  const handleAlignment = useCallback((alignment: ElementFormatOptions) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
    setCurrentAlignment(alignment);
  }, [editor]);

  // Handle color changes
  const handleColorChange = useCallback((color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if (node.__type === 'text') {
            node.setStyle(`color: ${color}`);
          }
        });
      }
    });
  }, [editor]);

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
      {/* Step 1: Undo/Redo - Working perfectly */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        disabled={!canUndo}
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Undo"
      >
        <Undo2 size={16} />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        disabled={!canRedo}
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Redo"
      >
        <Redo2 size={16} />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Step 2: Text Format Dropdown - Normal, H1, H2, H3 */}
      <TextFormatDropdown
        currentValue={currentBlockType}
        onSelect={handleTextFormat}
      />

      {/* Step 3: Text Alignment Dropdown */}
      <AlignmentDropdown
        currentAlignment={currentAlignment}
        onSelect={handleAlignment}
      />

      {/* Step 4: Color Dropdown */}
      <ColorDropdown onColorSelect={handleColorChange} />
    </div>
  );
}

// Editor configuration
const editorConfig = {
  namespace: 'StepByStepEditor',
  theme,
  onError(error: Error) {
    console.error('Lexical Error:', error);
  },
  nodes: [
    LinkNode,
    ListNode,
    ListItemNode,
    HeadingNode,
    QuoteNode,
    CodeNode,
  ],
};

// Main Form Component
const CreateNewAppForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    appName: "",
    appHandle: "",
    webhookUrl: "",
    description: "",
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
            <Label className="text-sm font-medium text-gray-700">
              App Description <span className="text-red-500">*</span>
            </Label>

            {/* Lexical Rich Text Editor */}
            <div className="border rounded-md overflow-hidden">
              <LexicalComposer initialConfig={editorConfig}>
                <StepByStepToolbar />
                <div className="relative">
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable 
                        className="p-3 min-h-[200px] outline-none resize-none overflow-auto focus:ring-0"
                        style={{ fontSize: '14px' }}
                      />
                    }
                    placeholder={
                      <div className="text-gray-400 absolute top-3 left-3 pointer-events-none">
                        Enter your app description...
                      </div>
                    }
                    ErrorBoundary={() => (
                      <div className="p-3 text-red-500">
                        Editor error occurred
                      </div>
                    )}
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                  <LinkPlugin />
                  <ListPlugin />
                </div>
              </LexicalComposer>
            </div>
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