
import React from 'react';

interface CompetitorData {
  followers: number;
  postTypes: {
    images: number;
    carousels: number;
    videos: number;
  };
  insights: string[];
}

interface CompetitorAnalysisProps {
  competitor: string;
  data: CompetitorData;
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ competitor, data }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">@{competitor}</h3>
        <div className="text-sm text-gray-500">
          {data.followers.toLocaleString()} followers
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Content Mix</h4>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-bold">{data.postTypes.images}%</p>
            <p className="text-xs text-gray-500">Images</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-bold">{data.postTypes.carousels}%</p>
            <p className="text-xs text-gray-500">Carousels</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="font-bold">{data.postTypes.videos}%</p>
            <p className="text-xs text-gray-500">Videos</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Key Insights</h4>
        <ul className="space-y-1 text-sm">
          {data.insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>{insight}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
