
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ImageIcon, LayoutGrid, Film, MessageSquare } from 'lucide-react';

interface CalendarDay {
  day: string;
  content: string | null;
  type: string | null;
  phase: string | null;
}

interface ContentCalendarProps {
  calendar: CalendarDay[];
  onExport: () => void;
}

const ContentCalendar: React.FC<ContentCalendarProps> = ({ calendar, onExport }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Content Schedule</CardTitle>
        <CardDescription>
          Optimized posting schedule based on your project phases and audience engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {calendar.map((day, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-2 text-center border-b">
                <p className="text-sm font-medium">{day.day}</p>
              </div>
              <div className="p-3 h-28 flex flex-col items-center justify-center text-center">
                {day.content ? (
                  <>
                    <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${
                      day.phase === 'concept' ? 'bg-blue-100 text-blue-600' :
                      day.phase === 'inspiration' ? 'bg-purple-100 text-purple-600' :
                      day.phase === 'drawings' ? 'bg-green-100 text-green-600' :
                      day.phase === 'construction' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {day.type === 'carousel' ? <LayoutGrid className="w-4 h-4" /> : 
                       day.type === 'image' ? <ImageIcon className="w-4 h-4" /> :
                       day.type === 'video' ? <Film className="w-4 h-4" /> :
                       <MessageSquare className="w-4 h-4" />}
                    </div>
                    <p className="text-xs">{day.content}</p>
                    <p className="text-xs text-formaflow-muted-text mt-1">
                      {day.type === 'carousel' ? 'Carousel' : 
                       day.type === 'image' ? 'Single Image' :
                       day.type === 'video' ? 'Video' : 'Post'}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-formaflow-muted-text">No scheduled content</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Edit Schedule
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Calendar className="w-4 h-4 mr-2" />
          Export to Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCalendar;
