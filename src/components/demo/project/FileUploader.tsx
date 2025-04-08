
import React from 'react';
import { Plus, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  files: any[];
  currentPhase: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxFiles?: number;
  remainingFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  files, 
  currentPhase, 
  onFileChange,
  maxFiles = 10,
  remainingFiles = 10
}) => {
  const hasFiles = files.length > 0;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Files
        </h3>
        <label 
          htmlFor="file-upload" 
          className={`btn-secondary flex items-center gap-2 cursor-pointer text-sm py-2 ${remainingFiles === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Plus className="w-4 h-4" />
          <span>{remainingFiles === 0 ? "Limit Reached" : "Add Files"}</span>
          <input 
            type="file" 
            id="file-upload" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={onFileChange}
            disabled={remainingFiles === 0}
          />
        </label>
      </div>
      
      {remainingFiles < maxFiles && (
        <div className="mb-4 text-sm text-gray-500">
          <p>{remainingFiles} of {maxFiles} slots remaining</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {hasFiles ? (
          files.map(file => (
            <div key={file.id} className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 relative group">
              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{file.name}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full h-40 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No files in this phase yet</p>
            <label htmlFor="empty-upload" className="text-formaflow-purple text-sm mt-2 cursor-pointer">
              Upload Files
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                id="empty-upload" 
                className="hidden" 
                onChange={onFileChange}
                disabled={remainingFiles === 0}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
