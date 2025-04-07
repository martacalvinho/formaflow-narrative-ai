
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

interface InsightItem {
  text: string;
}

interface InstagramInsightsProps {
  insights: InsightItem[];
  postingTime?: {
    weekday: string;
    time: string;
  };
}

const InstagramInsights: React.FC<InstagramInsightsProps> = ({ insights, postingTime }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          <span>Instagram Insights</span>
        </CardTitle>
        <CardDescription>
          FormaFlow analyzes your existing content to improve your new strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>{insight.text}</p>
            </li>
          ))}
          {postingTime && (
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-formaflow-purple mt-2" />
              <p>Optimal posting time based on your audience is {postingTime.weekday} at {postingTime.time}</p>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InstagramInsights;
