import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Building2 } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  logo: string;
  experience: string;
  location: string;
  isRemote: boolean;
  salary: string;
  description: string;
  postedTime: string;
}

export const JobCard = ({
  title,
  company,
  logo,
  experience,
  location,
  isRemote,
  salary,
  description,
  postedTime,
}: JobCardProps) => {
  return (
    <Card className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Logo + Posted time */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg border flex items-center justify-center bg-white">
            <img src={logo} alt={company} className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xs bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">
            {postedTime}
          </span>
        </div>

        {/* Title & Company */}
        <div className="mb-3">
          <h3 className="text-[16px] font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{company}</p>
        </div>

        {/* Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
            {isRemote && (
              <span className="text-xs ml-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Remote</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            <span>{salary}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Apply Button */}
        <div className="mt-4 flex justify-center">
          <button className="bg-[#00A6FF] text-white text-sm font-medium px-6 py-2 rounded-lg">
            Apply Now
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
