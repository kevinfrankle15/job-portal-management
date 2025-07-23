import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { jobsApi, CreateJobRequest } from "@/services/jobsApi";
import { ChevronRight, ChevronDown } from "lucide-react";

interface JobCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: () => void;
}

export const JobCreateModal = ({ isOpen, onClose, onJobCreated }: JobCreateModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryRange: "",
    applicationDeadline: "",
    jobDescription: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const parseSalaryRange = (salaryStr: string) => {
    const match = salaryStr.match(/(\d+)k?\s*-\s*(\d+)k?/i);
    if (match) {
      return {
        salary_min: parseInt(match[1]) * 1000,
        salary_max: parseInt(match[2]) * 1000,
      };
    }
    return { salary_min: undefined, salary_max: undefined };
  };

  const resetForm = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: "",
      salaryRange: "",
      applicationDeadline: "",
      jobDescription: "",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your job posting has been saved as a draft.",
    });
    onClose();
  };

  const handlePublish = async () => {
    if (!formData.jobTitle || !formData.companyName || !formData.jobDescription) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { salary_min, salary_max } = parseSalaryRange(formData.salaryRange);
      
      const jobData: CreateJobRequest = {
        title: formData.jobTitle,
        company_name: formData.companyName,
        location: formData.location,
        job_type: formData.jobType,
        salary_min,
        salary_max,
        description: formData.jobDescription,
        application_deadline: formData.applicationDeadline || undefined,
      };

      await jobsApi.createJob(jobData);
      
      toast({
        title: "Job Published",
        description: "Your job posting has been published successfully.",
      });
      
      resetForm();
      onClose();
      onJobCreated?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-fit max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Create Job Opening</DialogTitle>
        </DialogHeader>
        
<div className="space-y-6 py-4 px-2">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Job Title */}
    <div className="space-y-2">
      <Label htmlFor="jobTitle">Job Title</Label>
      <Input
        id="jobTitle"
        placeholder="Full Stack Developer"
        value={formData.jobTitle}
        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
        className="bg-background ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200"
      />
    </div>

    {/* Company Name */}
    <div className="space-y-2">
      <Label htmlFor="companyName">Company Name</Label>
      <Input
        id="companyName"
        placeholder="Amazon, Microsoft, Swiggy"
        value={formData.companyName}
        onChange={(e) => handleInputChange("companyName", e.target.value)}
        className="bg-background ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Location */}
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
        <SelectTrigger className="bg-background ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200">
          <SelectValue placeholder="Choose Preferred Location" />
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

    {/* Job Type */}
    <div className="space-y-2">
      <Label htmlFor="jobType">Job Type</Label>
      <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
        <SelectTrigger className="bg-background ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200">
          <SelectValue placeholder="FullTime" />
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
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Salary Range */}
    <div className="space-y-2">
      <Label htmlFor="salaryRange">Salary Range</Label>
      <Input
        id="salaryRange"
        placeholder="LT - 70"
        value={formData.salaryRange}
        onChange={(e) => handleInputChange("salaryRange", e.target.value)}
        className="bg-background ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200"
      />
    </div>

    {/* Application Deadline */}
    <div className="space-y-2">
      <Label htmlFor="applicationDeadline">Application Deadline</Label>
      <Input
        id="applicationDeadline"
        type="date"
        placeholder="LT 72,00,000"
        value={formData.applicationDeadline}
        onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
        className="bg-background ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200"
      />
    </div>
  </div>

  {/* Job Description */}
  <div className="space-y-2">
    <Label htmlFor="jobDescription">Job Description</Label>
    <Textarea
      id="jobDescription"
      placeholder="Please share a description to let the candidates know more about this job role"
      value={formData.jobDescription}
      onChange={(e) => handleInputChange("jobDescription", e.target.value)}
      className="min-h-[120px] bg-background resize-none ml-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none focus:ring-0 transition-colors duration-200"
    />
  </div>
</div>
        {/* Action Buttons - Fixed at bottom */}
        <div className="flex gap-3 pt-4 border-t bg-background">
<Button
  variant="outline"
  onClick={handleSaveDraft}
  disabled={isLoading}
  className="flex-1 h-12 border-black text-black hover:bg-transparent hover:text-black cursor-pointer"
>
  Save Draft
  <div className="flex flex-col items-center justify-center ml-2">
    <ChevronDown className="w-4 h-4" />
    <ChevronDown className="w-4 h-4 -mt-1" />
  </div>
</Button>

          <Button 
            onClick={handlePublish}
            disabled={isLoading}
            className="flex-1 h-12 gap-2"
            style={{ backgroundColor: '#00AAFF' }}
          >
            {isLoading ? "Publishing..." : "Publish"}
            <ChevronRight className="w-4 h-4" />
            <ChevronRight className="w-4 h-4 -ml-3" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};