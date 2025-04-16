import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { 
  Moon, 
  Bell, 
  Trash2, 
  Download, 
  Upload,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { useJobStore } from '@/store/jobStore';
import Button from '@/components/Button';
import colors from '@/constants/colors';

export default function SettingsScreen() {
  const { jobs, resetFilters } = useJobStore();
  
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This will export all your job data as a JSON file.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => Alert.alert('Success', 'Data exported successfully!'),
        },
      ]
    );
  };
  
  const handleImportData = () => {
    Alert.alert(
      'Import Data',
      'This will replace your current data with the imported data.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Import',
          onPress: () => Alert.alert('Success', 'Data imported successfully!'),
        },
      ]
    );
  };
  
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your saved jobs. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All data has been cleared.'),
        },
      ]
    );
  };
  
  const handleAbout = () => {
    Alert.alert(
      'About IntraSphere',
      'IntraSphere v1.0.0\n\nA job opportunities dashboard app for tracking and managing job listings.\n\n© 2023 IntraSphere',
      [{ text: 'OK' }]
    );
  };
  
  const handleHelp = () => {
    Alert.alert(
      'Help & Support',
      'For help and support, please contact us at:\nsupport@intrasphere.app',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={colors.text} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.text} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleExportData}
          >
            <View style={styles.settingInfo}>
              <Download size={20} color={colors.text} />
              <Text style={styles.settingText}>Export Data</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleImportData}
          >
            <View style={styles.settingInfo}>
              <Upload size={20} color={colors.text} />
              <Text style={styles.settingText}>Import Data</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleClearData}
          >
            <View style={styles.settingInfo}>
              <Trash2 size={20} color={colors.error} />
              <Text style={[styles.settingText, { color: colors.error }]}>
                Clear All Data
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleHelp}
          >
            <View style={styles.settingInfo}>
              <HelpCircle size={20} color={colors.text} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleAbout}
          >
            <View style={styles.settingInfo}>
              <Info size={20} color={colors.text} />
              <Text style={styles.settingText}>About IntraSphere</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} saved
          </Text>
        </View>
        
        <Button
          title="Sign Out"
          onPress={() => Alert.alert('Sign Out', 'You have been signed out.')}
          variant="outline"
          icon={<LogOut size={18} color={colors.primary} style={{ marginRight: 8 }} />}
          style={styles.signOutButton}
        />

        {/* AdMob Banner */}
        <View style={styles.adContainer}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-4940119719361052/3982193172" // Replace with your actual Ad Unit ID
            servePersonalizedAds
            onDidFailToReceiveAdWithError={(error) => console.log(error)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 48,
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
    color: colors.text,
  },
  statsContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  statsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  signOutButton: {
    marginBottom: 24,
  },
  adContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
});
