import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RichTextToolbar from './RichTextToolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  className = ''
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [textStyle, setTextStyle] = useState('normal');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Execute command with proper typing
  const execCommand = (command: string, showDefaultUI = false, value?: string) => {
    try {
      return (document as any).execCommand(command, showDefaultUI, value);
    } catch (error) {
      console.warn(`execCommand ${command} failed:`, error);
      return false;
    }
  };

  // Apply styles to newly created elements
  const applyElementStyles = (element: HTMLElement) => {
    const tagName = element.tagName.toLowerCase();
    
    // Remove any existing styles first
    element.removeAttribute('style');
    
    switch (tagName) {
      case 'h1':
        element.style.fontSize = '2rem';
        element.style.fontWeight = '700';
        element.style.lineHeight = '1.2';
        element.style.margin = '0.5rem 0';
        break;
      case 'h2':
        element.style.fontSize = '1.75rem';
        element.style.fontWeight = '600';
        element.style.lineHeight = '1.3';
        element.style.margin = '0.5rem 0';
        break;
      case 'h3':
        element.style.fontSize = '1.5rem';
        element.style.fontWeight = '600';
        element.style.lineHeight = '1.4';
        element.style.margin = '0.4rem 0';
        break;
      case 'h4':
        element.style.fontSize = '1.25rem';
        element.style.fontWeight = '600';
        element.style.lineHeight = '1.4';
        element.style.margin = '0.4rem 0';
        break;
      case 'h5':
        element.style.fontSize = '1.125rem';
        element.style.fontWeight = '600';
        element.style.lineHeight = '1.4';
        element.style.margin = '0.3rem 0';
        break;
      case 'h6':
        element.style.fontSize = '1rem';
        element.style.fontWeight = '600';
        element.style.lineHeight = '1.4';
        element.style.margin = '0.3rem 0';
        break;
      case 'blockquote':
        element.style.borderLeft = '4px solid #e5e7eb';
        element.style.paddingLeft = '1rem';
        element.style.margin = '0.5rem 0';
        element.style.fontStyle = 'italic';
        element.style.color = '#6b7280';
        break;
      case 'pre':
        element.style.backgroundColor = '#f3f4f6';
        element.style.borderRadius = '0.375rem';
        element.style.padding = '0.75rem';
        element.style.fontFamily = 'ui-monospace, SFMono-Regular, monospace';
        element.style.fontSize = '0.875rem';
        element.style.margin = '0.5rem 0';
        element.style.overflowX = 'auto';
        break;
    }
  };

  // Apply styles to all elements in the editor
  const applyAllStyles = () => {
    if (!editorRef.current) return;
    
    const elements = editorRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, blockquote, pre');
    elements.forEach(element => applyElementStyles(element as HTMLElement));
  };

  // Update formatting state based on current selection
  const updateFormattingState = useCallback(() => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    
    const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as HTMLElement;
    
    if (element) {
      setIsBold(element.tagName === 'B' || element.style.fontWeight === 'bold');
      setIsItalic(element.tagName === 'I' || element.style.fontStyle === 'italic');
      setIsUnderline(element.tagName === 'U' || element.style.textDecoration.includes('underline'));
      setIsStrikethrough(element.tagName === 'S' || element.style.textDecoration.includes('line-through'));
      
      const tagName = element.tagName.toLowerCase();
      if (tagName.startsWith('h')) {
        setTextStyle(tagName);
      } else if (tagName === 'blockquote') {
        setTextStyle('blockquote');
      } else if (tagName === 'code') {
        setTextStyle('code');
      } else {
        setTextStyle('normal');
      }
    }
  }, []);

  // Handle formatting commands
  const handleFormat = useCallback((command: string, value?: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    switch (command) {
      case 'bold':
        execCommand('bold', false);
        setIsBold(!isBold);
        break;
      case 'italic':
        execCommand('italic', false);
        setIsItalic(!isItalic);
        break;
      case 'underline':
        execCommand('underline', false);
        setIsUnderline(!isUnderline);
        break;
      case 'strikethrough':
        execCommand('strikethrough', false);
        setIsStrikethrough(!isStrikethrough);
        break;
      case 'removeFormat':
        execCommand('removeFormat', false);
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        setIsStrikethrough(false);
        setTextStyle('normal');
        break;
      case 'insertUnorderedList':
        execCommand('insertUnorderedList', false);
        break;
      case 'insertOrderedList':
        execCommand('insertOrderedList', false);
        break;
      case 'createLink':
        const url = prompt('Enter URL:');
        if (url) {
          execCommand('createLink', false, url);
        }
        break;
      case 'insertImage':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          execCommand('insertImage', false, imageUrl);
        }
        break;
      case 'insertCode':
        execCommand('formatBlock', false, '<pre>');
        setTimeout(applyAllStyles, 10);
        break;
      case 'insertBlockquote':
        execCommand('formatBlock', false, '<blockquote>');
        setTimeout(applyAllStyles, 10);
        break;
      case 'insertHorizontalRule':
        execCommand('insertHorizontalRule', false);
        break;
      default:
        break;
    }

    // Apply styles and update value
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }, 10);
  }, [isBold, isItalic, isUnderline, isStrikethrough, onChange]);

  // Handle text style changes
  const handleTextStyleChange = useCallback((style: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    setTextStyle(style);

    switch (style) {
      case 'normal':
        execCommand('formatBlock', false, '<p>');
        break;
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        execCommand('formatBlock', false, `<${style}>`);
        break;
      case 'blockquote':
        execCommand('formatBlock', false, '<blockquote>');
        break;
      case 'code':
        execCommand('formatBlock', false, '<pre>');
        break;
      default:
        break;
    }

    // Apply styles after a short delay to ensure the DOM is updated
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }, 10);
  }, [onChange]);

  // Handle undo/redo
  const handleUndo = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    execCommand('undo', false);
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }, 10);
  }, [onChange]);

  const handleRedo = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    execCommand('redo', false);
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }, 10);
  }, [onChange]);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    applyAllStyles();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Set initial content and apply styles
  useEffect(() => {
    if (editorRef.current && value && !isInitialized) {
      editorRef.current.innerHTML = value;
      setIsInitialized(true);
      
      // Apply styles to existing content
      setTimeout(applyAllStyles, 10);
      
      // Place cursor at the end of the content
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (editorRef.current.lastChild) {
        range.setStartAfter(editorRef.current.lastChild);
        range.collapse(true);
      } else {
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
      }
      
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [value, isInitialized]);

  // Handle focus to place cursor at the end
  const handleFocus = useCallback(() => {
    if (editorRef.current && !isInitialized) {
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (editorRef.current.lastChild) {
        range.setStartAfter(editorRef.current.lastChild);
        range.collapse(true);
      } else {
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
      }
      
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isInitialized]);

  return (
    <Card className={`border border-gray-200 rounded-md h-40 sm:h-48 ${className}`}>
      <RichTextToolbar
        onFormat={handleFormat}
        onUndo={handleUndo}
        onRedo={handleRedo}
        textStyle={textStyle}
        onTextStyleChange={handleTextStyleChange}
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
      />
      <CardContent className="p-0 h-full">
        <div
          ref={editorRef}
          contentEditable
          className="w-full h-full p-2 sm:p-3 border-0 resize-none focus:outline-none text-sm overflow-y-auto"
          style={{ 
            height: 'calc(100% - 40px)',
          }}
          onInput={handleContentChange}
          onFocus={handleFocus}
          onBlur={updateFormattingState}
          onKeyUp={updateFormattingState}
          onMouseUp={updateFormattingState}
          suppressContentEditableWarning
        />
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;