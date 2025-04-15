import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Job, JobType } from '@/types/job';
import JobCard from './JobCard';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';

interface JobTypeSectionProps {
  title: string;
  jobs: Job[];
  jobType: JobType;
  onViewAll: () => void;
}

const JobTypeSection: React.FC<JobTypeSectionProps> = ({ 
  title, 
  jobs, 
  jobType,
  onViewAll 
}) => {
  const router = useRouter();
  
  const getJobTypeColor = () => {
    switch (jobType) {
      case 'Full-time':
        return colors.fullTime;
      case 'Part-time':
        return colors.partTime;
      case 'Contract':
        return colors.contract;
      case 'Internship':
        return colors.internship;
      default:
        return colors.primary;
    }
  };

  const handleJobPress = (jobId: string) => {
    router.push(`/job/${jobId}`);
  };

  if (jobs.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View 
            style={[
              styles.dot, 
              { backgroundColor: getJobTypeColor() }
            ]} 
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewAllButton} 
          onPress={onViewAll}
        >
          <Text style={styles.viewAllText}>View all</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={jobs.slice(0, 3)}
        renderItem={({ item }) => (
          <JobCard job={item} onPress={() => handleJobPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.jobList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  jobList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
});

export default JobTypeSection;