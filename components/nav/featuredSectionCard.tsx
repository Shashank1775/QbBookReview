import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeaturedSectionCard({ title, author, year, description, cover }) {
  const truncateDescription = (text, wordLimit) => {
    if (!text) return ''; // Return an empty string if text is undefined or null
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="flex h-full ">
      <Card className="max-w-full mx-auto shadow-lg rounded-lg overflow-hidden max-h-100%">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{author}</span>
            <span>({year})</span>
          </div>
        </CardHeader>
        <CardContent className="flex">
          <div className="flex-1 pr-4">
            <CardDescription>
              {truncateDescription(description, 25)}
            </CardDescription>
          </div>
          <div className="flex-none w-32">
            <img src={cover} alt={title} className="object-cover w-full h-auto rounded-sm" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
