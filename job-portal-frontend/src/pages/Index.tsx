import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchFilters } from "@/components/SearchFilters";
import { JobCard } from "@/components/JobCard";
import { JobCreateModal } from "@/components/JobCreateModal";
import { jobsApi, Job } from "@/services/jobsApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    salaryRange: [50, 80] as [number, number],
  });

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const fetchedJobs = await jobsApi.getAllJobs({
        title: filters.search || undefined,
        location: filters.location || undefined,
        job_type: filters.jobType || undefined,
      });
      setJobs(fetchedJobs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.search, filters.location, filters.jobType]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company_name.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesJobType = !filters.jobType || job.job_type === filters.jobType;

      return matchesSearch && matchesLocation && matchesJobType;
    });
  }, [jobs, filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleJobCreated = () => {
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateJobClick={() => setIsCreateModalOpen(true)} />
      
      <main className="container mx-auto px-6 py-8">
        <SearchFilters onFiltersChange={handleFiltersChange} />
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading jobs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id.toString()}
                title={job.title}
                company={job.company_name}
                logo="/placeholder.svg"
                experience="1-3 yr Exp"
                location={job.location}
                isRemote={job.location.toLowerCase().includes("remote")}
                salary={job.salary_min && job.salary_max ? `£${job.salary_min/1000}k - £${job.salary_max/1000}k` : "Competitive"}
                description={job.description}
                postedTime="24h Ago"
              />
            ))}
          </div>
        )}

        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
          </div>
        )}
      </main>

      <JobCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </div>
  );
};

export default Index;
