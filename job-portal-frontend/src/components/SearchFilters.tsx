import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Briefcase } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    location: string;
    jobType: string;
    salaryRange: [number, number];
  }) => void;
}

export const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);

  const handleFiltersUpdate = (newFilters?: Partial<{
    search: string;
    location: string;
    jobType: string;
    salaryRange: [number, number];
  }>) => {
    const filters = {
      search,
      location,
      jobType,
      salaryRange,
      ...newFilters,
    };
    onFiltersChange(filters);
  };

  const handleSalaryChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setSalaryRange(newRange);
    handleFiltersUpdate({ salaryRange: newRange });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search By Job Title, Role"
            value={search}
            onChange={(e) => {
              const newSearch = e.target.value;
              setSearch(newSearch);
              handleFiltersUpdate({ search: newSearch });
            }}
            className="pl-10 h-12 bg-background border-border/50"
          />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
          <Select value={location} onValueChange={(value) => {
            setLocation(value);
            handleFiltersUpdate({ location: value });
          }}>
            <SelectTrigger className="h-12 pl-10 bg-background border-border/50">
              <SelectValue placeholder="Preferred Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="manchester">Manchester</SelectItem>
              <SelectItem value="birmingham">Birmingham</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type Filter */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
          <Select value={jobType} onValueChange={(value) => {
            setJobType(value);
            handleFiltersUpdate({ jobType: value });
          }}>
            <SelectTrigger className="h-12 pl-10 bg-background border-border/50">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Salary Per Month</label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>£{salaryRange[0]}k</span>
              <span>-</span>
              <span>{salaryRange[1]}k</span>
            </div>
          </div>
          
          <div className="px-2">
            <Slider
              value={salaryRange}
              onValueChange={handleSalaryChange}
              max={200}
              min={20}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};