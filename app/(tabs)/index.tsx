// index.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { AdMobBanner } from 'expo-ads-admob'; // <-- Add this
import { useJobStore } from '@/store/jobStore';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import JobTypeSection from '@/components/JobTypeSection';
import EmptyState from '@/components/EmptyState';
import JobStats, { getRecentJobsCount } from '@/components/JobStats';
import colors from '@/constants/colors';
import { JobType, ExperienceLevel, Domain } from '@/types/job';

export default function HomeScreen() {
  const { 
    jobs, 
    filteredJobs,
    searchQuery, 
    setSearchQuery,
    selectedJobType,
    setSelectedJobType,
    selectedExperienceLevel,
    setSelectedExperienceLevel,
    selectedDomain,
    setSelectedDomain,
    resetFilters
  } = useJobStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const fullTimeJobs = filteredJobs.filter(job => job.jobType === 'Full-time');
  const partTimeJobs = filteredJobs.filter(job => job.jobType === 'Part-time');
  const contractJobs = filteredJobs.filter(job => job.jobType === 'Contract');
  const internshipJobs = filteredJobs.filter(job => job.jobType === 'Internship');
  
  const recentJobsCount = getRecentJobsCount(jobs);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearchActive(text.length > 0);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };
  
  const handleSelectJobType = (jobType: JobType | 'All') => {
    setSelectedJobType(jobType);
  };
  
  const handleSelectExperienceLevel = (level: ExperienceLevel | 'All') => {
    setSelectedExperienceLevel(level);
  };
  
  const handleSelectDomain = (domain: Domain | 'All') => {
    setSelectedDomain(domain);
  };
  
  const isFiltersActive = 
    selectedJobType !== 'All' || 
    selectedExperienceLevel !== 'All' || 
    selectedDomain !== 'All';
  
  const showEmptyState = filteredJobs.length === 0;
  
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={handleClearSearch}
      />
      
      <FilterBar 
        selectedJobType={selectedJobType}
        selectedExperienceLevel={selectedExperienceLevel}
        selectedDomain={selectedDomain}
        onSelectJobType={handleSelectJobType}
        onSelectExperienceLevel={handleSelectExperienceLevel}
        onSelectDomain={handleSelectDomain}
        onResetFilters={resetFilters}
      />
      
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {!showEmptyState && !isSearchActive && !isFiltersActive && (
          <JobStats totalJobs={jobs.length} recentJobs={recentJobsCount} />
        )}
        
        {showEmptyState ? (
          <EmptyState />
        ) : (
          <>
            {isSearchActive || isFiltersActive ? (
              <View style={styles.searchResultsContainer}>
                <Text style={styles.searchResultsTitle}>
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'} found
                </Text>
                
                {filteredJobs.map(job => (
                  <JobTypeSection
                    key={job.id}
                    title={job.jobType}
                    jobs={[job]}
                    jobType={job.jobType}
                    onViewAll={() => handleSelectJobType(job.jobType)}
                  />
                ))}
              </View>
            ) : (
              <>
                <JobTypeSection
                  title="Full-time Positions"
                  jobs={fullTimeJobs}
                  jobType="Full-time"
                  onViewAll={() => handleSelectJobType('Full-time')}
                />
                
                <JobTypeSection
                  title="Internship Opportunities"
                  jobs={internshipJobs}
                  jobType="Internship"
                  onViewAll={() => handleSelectJobType('Internship')}
                />
                
                <JobTypeSection
                  title="Contract Work"
                  jobs={contractJobs}
                  jobType="Contract"
                  onViewAll={() => handleSelectJobType('Contract')}
                />
                
                <JobTypeSection
                  title="Part-time Positions"
                  jobs={partTimeJobs}
                  jobType="Part-time"
                  onViewAll={() => handleSelectJobType('Part-time')}
                />
              </>
            )}
          </>
        )}
      </ScrollView>

      {/* AdMob Banner */}
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-4940119719361052/3982193172"
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(error) => console.log(error)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  searchResultsContainer: {
    paddingTop: 16,
  },
  searchResultsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
