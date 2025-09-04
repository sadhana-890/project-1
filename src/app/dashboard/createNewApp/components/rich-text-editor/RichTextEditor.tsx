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
  const [textAlign, setTextAlign] = useState('left');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Execute command with proper typing - keeping your original approach
  const execCommand = (command: string, showDefaultUI = false, value?: string) => {
    try {
      return (document as any).execCommand(command, showDefaultUI, value);
    } catch (error) {
      console.warn(`execCommand ${command} failed:`, error);
      return false;
    }
  };

  // Modern styling system (keeping this improvement)
  const applyElementStyles = (element: HTMLElement) => {
    const tagName = element.tagName.toLowerCase();
    
    // Remove any existing styles first
    element.removeAttribute('style');
    
    const styles: Record<string, Record<string, string>> = {
      h1: { fontSize: '2rem', fontWeight: '700', lineHeight: '1.2', margin: '0.5rem 0' },
      h2: { fontSize: '1.75rem', fontWeight: '600', lineHeight: '1.3', margin: '0.5rem 0' },
      h3: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.4', margin: '0.4rem 0' },
      h4: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.4', margin: '0.4rem 0' },
      h5: { fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.4', margin: '0.3rem 0' },
      h6: { fontSize: '1rem', fontWeight: '600', lineHeight: '1.4', margin: '0.3rem 0' },
      blockquote: {
        borderLeft: '4px solid #e5e7eb',
        paddingLeft: '1rem',
        margin: '0.5rem 0',
        fontStyle: 'italic',
        color: '#6b7280'
      },
      pre: {
        backgroundColor: '#f3f4f6',
        borderRadius: '0.375rem',
        padding: '0.75rem',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: '0.875rem',
        margin: '0.5rem 0',
        overflowX: 'auto'
      }
    };

    const elementStyles = styles[tagName];
    if (elementStyles) {
      Object.entries(elementStyles).forEach(([property, value]) => {
        (element.style as any)[property] = value;
      });
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
    
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      
      const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as HTMLElement;
      
      if (element && editorRef.current.contains(element)) {
        // Check formatting states
        setIsBold(
          !!element.closest('b, strong') || 
          window.getComputedStyle(element).fontWeight === 'bold' ||
          window.getComputedStyle(element).fontWeight === '700'
        );
        setIsItalic(
          !!element.closest('i, em') || 
          window.getComputedStyle(element).fontStyle === 'italic'
        );
        setIsUnderline(
          !!element.closest('u') || 
          window.getComputedStyle(element).textDecoration.includes('underline')
        );
        setIsStrikethrough(
          !!element.closest('s, strike') || 
          window.getComputedStyle(element).textDecoration.includes('line-through')
        );
        
        // Check text style
        const blockElement = element.closest('h1, h2, h3, h4, h5, h6, blockquote, pre, p');
        if (blockElement) {
          const tagName = blockElement.tagName.toLowerCase();
          if (tagName.startsWith('h')) {
            setTextStyle(tagName);
          } else if (tagName === 'blockquote') {
            setTextStyle('blockquote');
          } else if (tagName === 'pre') {
            setTextStyle('code');
          } else {
            setTextStyle('normal');
          }
        } else {
          setTextStyle('normal');
        }
      }
    } catch (error) {
      console.warn('Error updating formatting state:', error);
    }
  }, []);

  // Handle formatting commands - back to your original approach
  const handleFormat = useCallback((command: string, value?: string) => {
    if (!editorRef.current) return;

    // Always focus first
    editorRef.current.focus();

    switch (command) {
      case 'bold':
        execCommand('bold', false);
        break;
      case 'italic':
        execCommand('italic', false);
        break;
      case 'underline':
        execCommand('underline', false);
        break;
      case 'strikethrough':
        execCommand('strikethrough', false);
        break;
      case 'removeFormat':
        execCommand('removeFormat', false);
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
        break;
      case 'insertBlockquote':
        execCommand('formatBlock', false, '<blockquote>');
        break;
      case 'insertHorizontalRule':
        execCommand('insertHorizontalRule', false);
        break;
    }

    // Apply styles and update after a short delay
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
      updateFormattingState();
    }, 10);
  }, [onChange, updateFormattingState]);

  // Handle text alignment changes
  const handleTextAlignChange = useCallback((align: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    setTextAlign(align);

    switch (align) {
      case 'left':
        execCommand('justifyLeft', false);
        break;
      case 'center':
        execCommand('justifyCenter', false);
        break;
      case 'right':
        execCommand('justifyRight', false);
        break;
      case 'justify':
        execCommand('justifyFull', false);
        break;
    }

    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
      updateFormattingState();
    }, 10);
  }, [onChange, updateFormattingState]);

  // Handle text style changes - back to your original approach
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
    }

    // Apply styles after a short delay
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
      updateFormattingState();
    }, 10);
  }, [onChange, updateFormattingState]);

  // Handle undo/redo - back to your original approach
  const handleUndo = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    execCommand('undo', false);
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
      updateFormattingState();
    }, 10);
  }, [onChange, updateFormattingState]);

  const handleRedo = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    execCommand('redo', false);
    setTimeout(() => {
      applyAllStyles();
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
      updateFormattingState();
    }, 10);
  }, [onChange, updateFormattingState]);

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
      setTimeout(() => {
        applyAllStyles();
        // Place cursor at the end of the content
        if (editorRef.current) {
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
      }, 10);
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
    updateFormattingState();
  }, [isInitialized, updateFormattingState]);

  // Add keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? e.metaKey : e.ctrlKey;

    if (modKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormat('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
          break;
        case 'y':
          e.preventDefault();
          handleRedo();
          break;
      }
    }
  }, [handleFormat, handleUndo, handleRedo]);

  return (
    <Card className={`border border-gray-200 rounded-md h-40 sm:h-48 ${className}`}>
      <RichTextToolbar
        onFormat={handleFormat}
        onUndo={handleUndo}
        onRedo={handleRedo}
        textStyle={textStyle}
        onTextStyleChange={handleTextStyleChange}
        textAlign={textAlign}
        onTextAlignChange={handleTextAlignChange}
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
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning
        />

      </CardContent>
    </Card>
  );
};

export default RichTextEditor;