import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Share,
  Linking,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ExternalLink, 
  Calendar, 
  Edit2, 
  Trash2, 
  Share2,
  Save,
  X,
  Building,
  Globe,
  Briefcase,
  Award,
  Code,
} from 'lucide-react-native';
import { useJobStore } from '@/store/jobStore';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import Picker from '@/components/Picker';
import colors from '@/constants/colors';
import { jobTypes, experienceLevels, domains } from '@/types/job';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { jobs, updateJob, deleteJob } = useJobStore();
  
  const job = jobs.find(j => j.id === id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(job?.title || '');
  const [company, setCompany] = useState(job?.company || '');
  const [url, setUrl] = useState(job?.url || '');
  const [jobType, setJobType] = useState<typeof jobTypes[number]>(
    (job?.jobType as typeof jobTypes[number]) || jobTypes[0]
  );
  const [experienceLevel, setExperienceLevel] = useState<typeof experienceLevels[number]>(
    (job?.experienceLevel as typeof experienceLevels[number]) || experienceLevels[0]
  );
  const [domain, setDomain] = useState<typeof domains[number]>(
    (job?.domain as typeof domains[number]) || domains[0]
  );
  
  const [errors, setErrors] = useState({
    title: '',
    company: '',
    url: '',
  });
  
  useEffect(() => {
    if (!job) {
      Alert.alert('Error', 'Job not found');
      router.back();
    }
  }, [job, router]);
  
  if (!job) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleOpenUrl = async () => {
    try {
      const supported = await Linking.canOpenURL(job.url);
      
      if (supported) {
        await Linking.openURL(job.url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${job.url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the URL');
    }
  };
  
  const handleShare = async () => {
    try {
      const message = `Check out this job opportunity: ${job.title} at ${job.company}\n${job.url}`;
      await Share.share({
        message: message,
        url: job.url,
        title: `${job.title} at ${job.company}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share job opportunity');
    }
  };
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Job',
      'Are you sure you want to delete this job opportunity?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteJob(job.id);
            router.back();
          },
        },
      ]
    );
  };
  
  const toggleEdit = () => {
    if (isEditing) {
      // Cancel editing
      setTitle(job.title);
      setCompany(job.company);
      setUrl(job.url);
      setJobType(job.jobType as typeof jobTypes[number]);
      setExperienceLevel(job.experienceLevel as typeof experienceLevels[number]);
      setDomain(job.domain as typeof domains[number]);
      setErrors({
        title: '',
        company: '',
        url: '',
      });
    }
    setIsEditing(!isEditing);
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      company: '',
      url: '',
    };
    
    if (!title.trim()) {
      newErrors.title = 'Job title is required';
      isValid = false;
    }
    
    if (!company.trim()) {
      newErrors.company = 'Company name is required';
      isValid = false;
    }
    
    if (!url.trim()) {
      newErrors.url = 'Job URL is required';
      isValid = false;
    } else if (!isValidUrl(url)) {
      newErrors.url = 'Please enter a valid URL';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const isValidUrl = (urlString: string) => {
    try {
      // Add https:// if not present
      if (!urlString.match(/^https?:\/\//i)) {
        urlString = 'https://' + urlString;
      }
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSave = () => {
    if (validateForm()) {
      // Format URL if needed
      let formattedUrl = url;
      if (!formattedUrl.match(/^https?:\/\//i)) {
        formattedUrl = 'https://' + formattedUrl;
      }
      
      updateJob({
        ...job,
        title,
        company,
        url: formattedUrl,
        jobType,
        experienceLevel,
        domain,
      });
      
      setIsEditing(false);
      Alert.alert('Success', 'Job updated successfully!');
    }
  };
  
  const handleJobTypeChange = (value: string) => {
    if (jobTypes.includes(value as typeof jobTypes[number])) {
      setJobType(value as typeof jobTypes[number]);
    }
  };
  
  const handleExperienceLevelChange = (value: string) => {
    if (experienceLevels.includes(value as typeof experienceLevels[number])) {
      setExperienceLevel(value as typeof experienceLevels[number]);
    }
  };
  
  const handleDomainChange = (value: string) => {
    if (domains.includes(value as typeof domains[number])) {
      setDomain(value as typeof domains[number]);
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {isEditing ? (
            <View style={styles.editContainer}>
              <Text style={styles.sectionTitle}>Edit Job</Text>
              
              <FormInput
                label="Job Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="e.g. Frontend Developer"
                error={errors.title}
                autoCapitalize="words"
              />
              
              <FormInput
                label="Company Name"
                value={company}
                onChangeText={(text) => setCompany(text)}
                placeholder="e.g. TechCorp"
                error={errors.company}
                autoCapitalize="words"
              />
              
              <FormInput
                label="Job URL"
                value={url}
                onChangeText={(text) => setUrl(text)}
                placeholder="e.g. company.com/careers"
                error={errors.url}
                keyboardType="url"
              />
              
              <Picker
                label="Job Type"
                value={jobType}
                options={jobTypes}
                onValueChange={handleJobTypeChange}
              />
              
              <Picker
                label="Experience Level"
                value={experienceLevel}
                options={experienceLevels}
                onValueChange={handleExperienceLevelChange}
              />
              
              <Picker
                label="Domain"
                value={domain}
                options={domains}
                onValueChange={handleDomainChange}
              />
              
              <View style={styles.buttonContainer}>
                <Button
                  title="Cancel"
                  onPress={toggleEdit}
                  variant="outline"
                  icon={<X size={18} color={colors.primary} style={{ marginRight: 8 }} />}
                  style={{ flex: 1, marginRight: 8 }}
                />
                
                <Button
                  title="Save"
                  onPress={handleSave}
                  icon={<Save size={18} color="white" style={{ marginRight: 8 }} />}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.company}>{job.company}</Text>
                
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
              </View>
              
              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Building size={20} color={colors.textSecondary} />
                  <Text style={styles.infoText}>Company: {job.company}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Briefcase size={20} color={colors.textSecondary} />
                  <Text style={styles.infoText}>Job Type: {job.jobType}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Award size={20} color={colors.textSecondary} />
                  <Text style={styles.infoText}>Experience: {job.experienceLevel}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Code size={20} color={colors.textSecondary} />
                  <Text style={styles.infoText}>Domain: {job.domain}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Calendar size={20} color={colors.textSecondary} />
                  <Text style={styles.infoText}>Added: {formatDate(job.dateAdded)}</Text>
                </View>
                
                <TouchableOpacity style={styles.urlContainer} onPress={handleOpenUrl}>
                  <Globe size={20} color={colors.primary} />
                  <Text style={styles.urlText} numberOfLines={1}>{job.url}</Text>
                  <ExternalLink size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.actionsContainer}>
                <Button
                  title="Apply"
                  onPress={handleOpenUrl}
                  style={{ flex: 1, marginRight: 8 }}
                  icon={<ExternalLink size={18} color="white" style={{ marginRight: 8 }} />}
                />
                
                <Button
                  title="Share"
                  onPress={handleShare}
                  variant="secondary"
                  style={{ flex: 1 }}
                  icon={<Share2 size={18} color="white" style={{ marginRight: 8 }} />}
                />
              </View>
              
              <View style={styles.managementContainer}>
                <Button
                  title="Edit"
                  onPress={toggleEdit}
                  variant="outline"
                  icon={<Edit2 size={18} color={colors.primary} style={{ marginRight: 8 }} />}
                  style={{ flex: 1, marginRight: 8 }}
                />
                
                <Button
                  title="Delete"
                  onPress={handleDelete}
                  variant="danger"
                  icon={<Trash2 size={18} color="white" style={{ marginRight: 8 }} />}
                  style={{ flex: 1 }}
                />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: colors.info,
  },
  tagText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(67, 97, 238, 0.1)',
    borderRadius: 8,
  },
  urlText: {
    flex: 1,
    fontSize: 16,
    color: colors.primary,
    marginLeft: 12,
    marginRight: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  managementContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  editContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
});