import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Briefcase, Clock } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Job } from '@/types/job';

interface JobStatsProps {
  totalJobs: number;
  recentJobs: number;
}

const JobStats: React.FC<JobStatsProps> = ({ totalJobs, recentJobs }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <View style={styles.iconContainer}>
          <Briefcase size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.statValue}>{totalJobs}</Text>
          <Text style={styles.statLabel}>Total Jobs</Text>
        </View>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.iconContainer}>
          <Clock size={20} color={colors.secondary} />
        </View>
        <View>
          <Text style={styles.statValue}>{recentJobs}</Text>
          <Text style={styles.statLabel}>Recent Jobs</Text>
        </View>
      </View>
    </View>
  );
};

export const getRecentJobsCount = (jobs: Job[]): number => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return jobs.filter(job => {
    const jobDate = new Date(job.dateAdded);
    return jobDate >= oneWeekAgo;
  }).length;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 97, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default JobStats;