import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
// Removed incorrect import of Image from next/rect
import { X, Upload, File, Image as FileIconImage } from 'lucide-react';
import Image from 'next/image';

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

const FileUploadArea: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'application/zip'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      alert(`File type ${file.type} is not supported. Only .jpg, .png, .svg, and .zip files are allowed.`);
      return false;
    }
    
    if (file.size > maxFileSize) {
      alert(`File size must be less than 10MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
      return false;
    }
    
    return true;
  };

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (validateFile(file)) {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        
        // Create preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const newFile: UploadedFile = {
              file,
              id,
              preview: e.target?.result as string
            };
            
            setUploadedFiles(prev => [...prev, newFile]);
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files
          const newFile: UploadedFile = {
            file,
            id
          };
          setUploadedFiles(prev => [...prev, newFile]);
        }
      }
    });
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileIconImage className="w-4 h-4 text-blue-500" />;
    }
    return <File className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="space-y-2 mx-3 sm:mx-6 mt-3 sm:mt-4 mb-2 sm:mb-3">
      <Label className="text-sm font-medium text-gray-700">
        Upload App Logo (Optional)
      </Label>
      <div className="text-xs text-gray-500 mb-2 sm:mb-4">
        Recommended size: 512x512 px
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.svg,.zip"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* Drop zone */}
      <Card 
        className={`border border-dashed rounded-none h-24 sm:h-32 transition-colors cursor-pointer ${
          isDragOver 
            ? 'border-blue-800 bg-blue-50' 
            : 'border-blue-600 hover:border-blue-700 hover:bg-blue-25'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <CardContent className="flex flex-col items-center justify-center p-2 text-center h-full">
            <Image src="/icons/upload.svg" alt="upload image" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            
            <div className="text-xs text-gray-600 mb-1">
              {isDragOver ? 'Drop files here' : 'Drag files or'}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs px-2 sm:px-3 py-0.5 sm:py-1"
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
            >
              Browse files
            </Button>
        </CardContent>
      </Card>
      
      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label className="text-xs font-medium text-gray-600">Uploaded Files:</Label>
          {uploadedFiles.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                {uploadedFile.preview ? (
                  <Image
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-8 h-8 object-cover rounded border"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded border">
                    {getFileIcon(uploadedFile.file.type)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(uploadedFile.id)}
                className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                title="Remove file"
              >
                <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-2 sm:mt-4">
        Only support .jpg, .png, .svg and .zip files (Max 10MB each)
      </div>
    </div>
  );
};

export default FileUploadArea;