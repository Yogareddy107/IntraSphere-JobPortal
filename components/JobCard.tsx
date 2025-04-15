import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ExternalLink, Calendar } from 'lucide-react-native';
import { Job } from '@/types/job';
import colors from '@/constants/colors';

interface JobCardProps {
  job: Job;
  onPress: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  const getJobTypeColor = () => {
    switch (job.jobType) {
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

  const getExperienceLevelColor = () => {
    switch (job.experienceLevel) {
      case 'Entry':
        return colors.entry;
      case 'Mid':
        return colors.mid;
      case 'Senior':
        return colors.senior;
      case 'Lead':
        return colors.lead;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
        <ExternalLink size={16} color={colors.textSecondary} />
      </View>
      
      <Text style={styles.company} numberOfLines={1}>{job.company}</Text>
      
      <View style={styles.tagsContainer}>
        <View style={[styles.tag, { backgroundColor: getJobTypeColor() }]}>
          <Text style={styles.tagText}>{job.jobType}</Text>
        </View>
        
        <View style={[styles.tag, { backgroundColor: getExperienceLevelColor() }]}>
          <Text style={styles.tagText}>{job.experienceLevel}</Text>
        </View>
        
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.domain}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <Calendar size={14} color={colors.textSecondary} />
          <Text style={styles.dateText}>{formatDate(job.dateAdded)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    marginBottom: 8,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  company: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.info,
  },
  tagText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});

export default JobCard;