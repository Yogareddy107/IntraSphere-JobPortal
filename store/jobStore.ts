import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job, JobType, ExperienceLevel, Domain } from '@/types/job';
import mockJobs from '@/mocks/jobs';

interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  searchQuery: string;
  selectedJobType: JobType | 'All';
  selectedExperienceLevel: ExperienceLevel | 'All';
  selectedDomain: Domain | 'All';
  
  // Actions
  addJob: (job: Omit<Job, 'id' | 'dateAdded'>) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedJobType: (jobType: JobType | 'All') => void;
  setSelectedExperienceLevel: (level: ExperienceLevel | 'All') => void;
  setSelectedDomain: (domain: Domain | 'All') => void;
  resetFilters: () => void;
  applyFilters: (jobs: Job[]) => Job[];
}

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      jobs: mockJobs,
      filteredJobs: mockJobs,
      searchQuery: '',
      selectedJobType: 'All',
      selectedExperienceLevel: 'All',
      selectedDomain: 'All',
      
      addJob: (job) => {
        const newJob: Job = {
          ...job,
          id: Date.now().toString(),
          dateAdded: new Date().toISOString(),
        };
        
        set((state) => {
          const updatedJobs = [newJob, ...state.jobs];
          return { 
            jobs: updatedJobs,
            filteredJobs: get().applyFilters(updatedJobs)
          };
        });
      },
      
      updateJob: (updatedJob) => {
        set((state) => {
          const updatedJobs = state.jobs.map((job) => 
            job.id === updatedJob.id ? updatedJob : job
          );
          return { 
            jobs: updatedJobs,
            filteredJobs: get().applyFilters(updatedJobs)
          };
        });
      },
      
      deleteJob: (id) => {
        set((state) => {
          const updatedJobs = state.jobs.filter((job) => job.id !== id);
          return { 
            jobs: updatedJobs,
            filteredJobs: get().applyFilters(updatedJobs)
          };
        });
      },
      
      setSearchQuery: (query) => {
        set((state) => {
          const updatedQuery = query;
          return { 
            searchQuery: updatedQuery,
            filteredJobs: get().applyFilters(state.jobs)
          };
        });
      },
      
      setSelectedJobType: (jobType) => {
        set((state) => {
          return { 
            selectedJobType: jobType,
            filteredJobs: get().applyFilters(state.jobs)
          };
        });
      },
      
      setSelectedExperienceLevel: (level) => {
        set((state) => {
          return { 
            selectedExperienceLevel: level,
            filteredJobs: get().applyFilters(state.jobs)
          };
        });
      },
      
      setSelectedDomain: (domain) => {
        set((state) => {
          return { 
            selectedDomain: domain,
            filteredJobs: get().applyFilters(state.jobs)
          };
        });
      },
      
      resetFilters: () => {
        set((state) => {
          return { 
            searchQuery: '',
            selectedJobType: 'All',
            selectedExperienceLevel: 'All',
            selectedDomain: 'All',
            filteredJobs: state.jobs
          };
        });
      },
      
      applyFilters: (jobs: Job[]): Job[] => {
        const { searchQuery, selectedJobType, selectedExperienceLevel, selectedDomain } = get();
        
        return jobs.filter((job: Job) => {
          // Search query filter
          const matchesSearch = 
            searchQuery === '' || 
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Job type filter
          const matchesJobType = 
            selectedJobType === 'All' || 
            job.jobType === selectedJobType;
          
          // Experience level filter
          const matchesExperience = 
            selectedExperienceLevel === 'All' || 
            job.experienceLevel === selectedExperienceLevel;
          
          // Domain filter
          const matchesDomain = 
            selectedDomain === 'All' || 
            job.domain === selectedDomain;
          
          return matchesSearch && matchesJobType && matchesExperience && matchesDomain;
        });
      }
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        jobs: state.jobs,
        // Don't persist UI state like filters and search query
      }),
    }
  )
);