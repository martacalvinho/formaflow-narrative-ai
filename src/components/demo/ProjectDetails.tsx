
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText } from 'lucide-react';

interface ProjectDetailsProps {
  projectName: string;
  setProjectName: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  client: string;
  setClient: (client: string) => void;
  concept: string;
  setConcept: (concept: string) => void;
  stage: string;
  setStage: (stage: string) => void;
  materials: string;
  setMaterials: (materials: string) => void;
  docName: string | null;
  handleDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isSaving: boolean;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ 
  projectName, 
  setProjectName,
  location,
  setLocation,
  client,
  setClient,
  concept,
  setConcept,
  stage,
  setStage,
  materials,
  setMaterials,
  docName,
  handleDocumentUpload,
  onSave,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g., Urban Loft Conversion"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Lisbon, Portugal"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="client">Client (optional)</Label>
        <Input
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="e.g., Private Client"
        />
        <p className="text-xs text-gray-500">Leave blank if confidential</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stage">Current Stage</Label>
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger id="stage">
            <SelectValue placeholder="Select project stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concept">Concept</SelectItem>
            <SelectItem value="inspiration">Inspiration</SelectItem>
            <SelectItem value="sketches">Sketches</SelectItem>
            <SelectItem value="drawings">Design Drawings</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="final">Final Photography</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="concept">Concept (optional)</Label>
        <Textarea
          id="concept"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Describe the concept behind your project..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="materials">Materials & Features</Label>
        <Textarea
          id="materials"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          placeholder="Describe key materials, features or interesting aspects of the project..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="document">Project Document (optional)</Label>
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="doc-upload"
            className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Existing Document</span>
            <input
              type="file"
              id="doc-upload"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleDocumentUpload}
            />
          </Label>
          {docName && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm">
              <FileText className="w-4 h-4 text-formaflow-purple" />
              <span className="truncate">{docName}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">Upload any existing project description document</p>
      </div>

      <Button 
        onClick={onSave} 
        className="w-full btn-primary"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Project Details"}
      </Button>
    </div>
  );
};

export default ProjectDetails;
