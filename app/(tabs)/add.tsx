import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import { useJobStore } from '@/store/jobStore';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Picker from '@/components/Picker';
import colors from '@/constants/colors';
import { jobTypes, experienceLevels, domains } from '@/types/job';

export default function AddJobScreen() {
  const router = useRouter();
  const { addJob } = useJobStore();
  
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [url, setUrl] = useState('');
  const [jobType, setJobType] = useState<typeof jobTypes[number]>(jobTypes[0]);
  const [experienceLevel, setExperienceLevel] = useState<typeof experienceLevels[number]>(experienceLevels[0]);
  const [domain, setDomain] = useState<typeof domains[number]>(domains[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [errors, setErrors] = useState({
    title: '',
    company: '',
    url: '',
  });
  
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
  
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Format URL if needed
        let formattedUrl = url;
        if (!formattedUrl.match(/^https?:\/\//i)) {
          formattedUrl = 'https://' + formattedUrl;
        }
        
        addJob({
          title,
          company,
          url: formattedUrl,
          jobType,
          experienceLevel,
          domain,
        });
        
        // Reset form after successful submission
        resetForm();
        
        Alert.alert(
          'Success',
          'Job opportunity added successfully!',
          [
            {
              text: 'View Dashboard',
              onPress: () => router.push('/(tabs)/'),
            },
            {
              text: 'Add Another',
              style: 'cancel',
            },
          ]
        );
      } catch (error) {
        console.error('Error adding job:', error);
        Alert.alert(
          'Error',
          'Failed to add job. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setCompany('');
    setUrl('');
    setJobType(jobTypes[0]);
    setExperienceLevel(experienceLevels[0]);
    setDomain(domains[0]);
    setErrors({
      title: '',
      company: '',
      url: '',
    });
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
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Job Details</Text>
            
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
                onPress={resetForm}
                variant="outline"
                icon={<X size={18} color={colors.primary} style={{ marginRight: 8 }} />}
                style={{ flex: 1, marginRight: 8 }}
                disabled={isSubmitting}
              />
              
              <Button
                title="Add Job"
                onPress={handleSubmit}
                icon={<Check size={18} color="white" style={{ marginRight: 8 }} />}
                style={{ flex: 1 }}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </View>
          </View>
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
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
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