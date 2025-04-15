import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileSearch, Plus } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';

interface EmptyStateProps {
  title?: string;
  message?: string;
  showAddButton?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No jobs found',
  message = 'Try adjusting your filters or add a new job opportunity.',
  showAddButton = true,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FileSearch size={64} color={colors.textSecondary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {showAddButton && (
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/(tabs)/add')}
        >
          <Plus size={20} color="white" />
          <Text style={styles.buttonText}>Add Job</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default EmptyState;