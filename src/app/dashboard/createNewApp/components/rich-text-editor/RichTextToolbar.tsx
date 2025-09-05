import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import FormatButton from "./FormatButton"
import TextStyleDropdown from "./TextStyleDropdown"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

interface RichTextToolbarProps {
  onFormat: (command: string, value?: string) => void
  onListToggle: (listType: 'ul' | 'ol') => void  // New prop for list handling
  onUndo: () => void
  onRedo: () => void
  textStyle: string
  onTextStyleChange: (style: string) => void
  textAlign: string
  onTextAlignChange: (align: string) => void
  isBold: boolean
  isItalic: boolean
  isUnderline: boolean
  isStrikethrough: boolean
  isUnorderedList?: boolean
  isOrderedList?: boolean
  textColor?: string
  onTextColorChange?: (color: string) => void
  editorId?: string
}

const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  onFormat,
  onListToggle,  // Use new prop instead of onFormat for lists
  onUndo,
  onRedo,
  textStyle,
  onTextStyleChange,
  textAlign,
  onTextAlignChange,
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  isUnorderedList = false,
  isOrderedList = false,
  textColor = "#000000",
  onTextColorChange,
  editorId,
}) => {
  const savedRangeRef = useRef<Range | null>(null)

  const alignOptions = [
    { value: "left", label: "Left", icon: "/icons/align-left.svg" },
    { value: "center", label: "Center", icon: "/icons/align-center.svg" },
    { value: "right", label: "Right", icon: "/icons/align-right.svg" },
    { value: "justify", label: "Justify", icon: "/icons/align-justify.svg" },
  ]

  const colorOptions = [
    { value: "#000000", label: "Black" },
    { value: "#FF0000", label: "Red" },
    { value: "#008000", label: "Green" },
    { value: "#0000FF", label: "Blue" },
    { value: "#FFA500", label: "Orange" },
    { value: "#800080", label: "Purple" },
  ]

  const saveSelection = () => {
    const sel = window.getSelection?.()
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange()
    }
  }

  const restoreSelectionAndFocus = () => {
    const el = editorId ? document.getElementById(editorId) : null
    el?.focus()
    const sel = window.getSelection?.()
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges()
      sel.addRange(savedRangeRef.current)
    }
  }

  const applyAlign = (align: string) => {
    const map: Record<string, string> = {
      left: "justifyLeft",
      center: "justifyCenter",
      right: "justifyRight",
      justify: "justifyFull",
    }
    restoreSelectionAndFocus()
    onFormat(map[align])
    onTextAlignChange(align)
  }

  const applyColor = (color: string) => {
    restoreSelectionAndFocus()
    try {
      document.execCommand("styleWithCSS", false, "true")
    } catch {}
    document.execCommand("foreColor", false, color)
    onTextColorChange?.(color)
  }

  return (
    <div className="flex items-center gap-0.5 p-2 border-b border-gray-200 bg-gray-50 min-h-[40px] overflow-x-auto">
      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            restoreSelectionAndFocus()
            onUndo()
          }}
        >
          <img src="/icons/undo.svg" alt="undo" className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            restoreSelectionAndFocus()
            onRedo()
          }}
        >
          <img src="/icons/redo.svg" alt="redo" className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Text Style Dropdown */}
      <div className="flex items-center">
        <TextStyleDropdown
          value={textStyle}
          onChange={(v) => {
            restoreSelectionAndFocus()
            onTextStyleChange(v)
          }}
        />
      </div>

      {/* Text Alignment Dropdown */}
      <div className="flex items-center">
        <Select
          value={textAlign}
          onOpenChange={(open) => {
            if (open) saveSelection()
          }}
          onValueChange={applyAlign}
        >
          <SelectTrigger className="w-[32px] h-7 p-0 border-none shadow-none focus:ring-0 focus:outline-none bg-transparent">
            <SelectValue>
              <img
                src={
                  alignOptions.find((opt) => opt.value === textAlign)?.icon ||
                  "/icons/align-left.svg"
                }
                alt={textAlign}
                className="w-3.5 h-3.5 mx-auto"
              />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {alignOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <img src={option.icon} alt={option.label} className="w-4 h-4" />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text Color Dropdown */}
      <div className="flex items-center">
        <Select
          value={textColor}
          onOpenChange={(open) => {
            if (open) saveSelection()
          }}
          onValueChange={(color) => applyColor(color)}
        >
          <SelectTrigger className="w-[32px] h-7 p-0 border-none shadow-none focus:ring-0 focus:outline-none bg-transparent">
            <SelectValue>
              <div
                className="w-3.5 h-3.5 mx-auto rounded-sm"
                style={{ backgroundColor: textColor }}
              />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm border"
                    style={{ backgroundColor: option.value }}
                  />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <FormatButton
          icon="/icons/bold.svg"
          alt="bold"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("bold")
          }}
          isActive={isBold}
        />
        <FormatButton
          icon="/icons/italic.svg"
          alt="italic"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("italic")
          }}
          isActive={isItalic}
        />
        <FormatButton
          icon="/icons/underline.svg"
          alt="underline"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("underline")
          }}
          isActive={isUnderline}
        />
        <FormatButton
          icon="/icons/strikethrough.svg"
          alt="strikethrough"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("strikethrough")
          }}
          isActive={isStrikethrough}
        />
        <FormatButton
          icon="/icons/clearFormat.svg"
          alt="clear formatting"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("removeFormat")
          }}
        />

        {/* List Buttons with Updated Handler */}
        <FormatButton
          icon="/icons/unorderedList.svg"
          alt="unordered list"
          onClick={() => onListToggle('ul')}  // Use new handler
          isActive={isUnorderedList}
        />
        <FormatButton
          icon="/icons/orderedList.svg"
          alt="ordered list"
          onClick={() => onListToggle('ol')}  // Use new handler
          isActive={isOrderedList}
        />
      </div>

      {/* Insert Elements */}
      <div className="flex items-center gap-0.5">
        <FormatButton
          icon="/icons/link.png"
          alt="link"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("createLink")
          }}
        />
        <FormatButton
          icon="/icons/image.svg"
          alt="image"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("insertImage")
          }}
        />
        <FormatButton
          icon="/icons/codeBrackets.svg"
          alt="code"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("insertCode")
          }}
        />
        <FormatButton
          icon="/icons/quote.png"
          alt="quote"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("insertBlockquote")
          }}
        />
        <FormatButton
          icon="/icons/separator.svg"
          alt="separator"
          onClick={() => {
            restoreSelectionAndFocus()
            onFormat("insertHorizontalRule")
          }}
        />
      </div>
    </div>
  )
}

export default RichTextToolbar