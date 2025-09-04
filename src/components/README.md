# Components Documentation

This directory contains reusable React components organized by functionality.

## Component Structure

```
src/components/
├── ui/                    # shadcn/ui base components
├── rich-text-editor/      # Rich text editor components
├── forms/                 # Form input components
└── layout/                # Layout and navigation components
```

## Rich Text Editor Components

### RichTextEditor
A fully functional rich text editor with toolbar and content area.

**Features:**
- Bold, italic, underline, strikethrough formatting
- Headings (H1-H6), paragraphs, blockquotes, code blocks
- Ordered and unordered lists
- Link and image insertion
- Undo/redo functionality
- Real-time formatting state updates

**Usage:**
```tsx
import { RichTextEditor } from '@/components/rich-text-editor';

<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Start typing..."
/>
```

### RichTextToolbar
The toolbar component with all formatting buttons.

**Features:**
- All formatting buttons are clickable and functional
- Visual feedback for active formatting states
- Responsive design with horizontal scrolling
- Uses `document.execCommand()` for formatting

### FormatButton
Reusable button component for formatting options.

**Usage:**
```tsx
import { FormatButton } from '@/components/rich-text-editor';

<FormatButton
  icon="/icons/bold.svg"
  alt="bold"
  onClick={() => onFormat('bold')}
  isActive={isBold}
/>
```

### TextStyleDropdown
Dropdown for selecting text styles (headings, paragraphs, etc.).

## Form Components

### TextField
Standard text input field with label and help text support.

**Usage:**
```tsx
import { TextField } from '@/components/forms';

<TextField
  label="App Name"
  placeholder="Enter app name"
  required
  helpText
  value={value}
  onChange={handleChange}
/>
```

### TextareaField
Rich text editor wrapper for longer text content.

**Usage:**
```tsx
import { TextareaField } from '@/components/forms';

<TextareaField
  label="Description"
  placeholder="Enter description"
  required
  helpText
  value={description}
  onChange={setDescription}
/>
```

### FileUploadArea
File upload component with drag-and-drop support.

## Layout Components

### StepIndicator
Step counter component for multi-step forms.

**Usage:**
```tsx
import { StepIndicator } from '@/components/layout';

<StepIndicator
  currentStep={1}
  totalSteps={3}
  stepLabel="Define Your App"
/>
```

## How the Rich Text Editor Works

1. **Content Editable**: Uses HTML `contentEditable` div for rich text input
2. **Formatting Commands**: Leverages `document.execCommand()` for text formatting
3. **State Management**: Tracks formatting state (bold, italic, etc.) in real-time
4. **Event Handling**: Responds to user interactions and updates formatting buttons
5. **HTML Output**: Returns formatted HTML content that can be stored or processed

## Icon Requirements

The components expect these icons in the `/public/icons/` directory:
- `undo.svg`, `redo.svg`
- `list.svg`, `list-ordered.svg`
- `bold.svg`, `italic.svg`, `underline.svg`, `strikethrough.svg`
- `clearFormat.svg`
- `link.png`, `image.svg`
- `codeBrackets.svg`, `quote.png`, `separator.svg`
- `helpCircle.svg`, `upload.svg`

## Browser Compatibility

- Modern browsers with `contentEditable` support
- Uses `document.execCommand()` (deprecated but widely supported)
- For production use, consider using a library like Slate.js or Draft.js
