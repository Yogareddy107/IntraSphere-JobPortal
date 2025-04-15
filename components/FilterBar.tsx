import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Filter } from 'lucide-react-native';
import colors from '@/constants/colors';
import { JobType, ExperienceLevel, Domain, jobTypes, experienceLevels, domains } from '@/types/job';

interface FilterBarProps {
  selectedJobType: JobType | 'All';
  selectedExperienceLevel: ExperienceLevel | 'All';
  selectedDomain: Domain | 'All';
  onSelectJobType: (jobType: JobType | 'All') => void;
  onSelectExperienceLevel: (level: ExperienceLevel | 'All') => void;
  onSelectDomain: (domain: Domain | 'All') => void;
  onResetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedJobType,
  selectedExperienceLevel,
  selectedDomain,
  onSelectJobType,
  onSelectExperienceLevel,
  onSelectDomain,
  onResetFilters,
}) => {
  const isFiltersActive = 
    selectedJobType !== 'All' || 
    selectedExperienceLevel !== 'All' || 
    selectedDomain !== 'All';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Filter size={18} color={colors.text} />
          <Text style={styles.title}>Filters</Text>
        </View>
        {isFiltersActive && (
          <TouchableOpacity onPress={onResetFilters}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Job Type</Text>
          <View style={styles.filterOptions}>
            <FilterChip 
              label="All" 
              isSelected={selectedJobType === 'All'} 
              onPress={() => onSelectJobType('All')} 
            />
            {jobTypes.map((type) => (
              <FilterChip 
                key={type} 
                label={type} 
                isSelected={selectedJobType === type} 
                onPress={() => onSelectJobType(type)} 
              />
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Experience</Text>
          <View style={styles.filterOptions}>
            <FilterChip 
              label="All" 
              isSelected={selectedExperienceLevel === 'All'} 
              onPress={() => onSelectExperienceLevel('All')} 
            />
            {experienceLevels.map((level) => (
              <FilterChip 
                key={level} 
                label={level} 
                isSelected={selectedExperienceLevel === level} 
                onPress={() => onSelectExperienceLevel(level)} 
              />
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Domain</Text>
          <View style={styles.filterOptions}>
            <FilterChip 
              label="All" 
              isSelected={selectedDomain === 'All'} 
              onPress={() => onSelectDomain('All')} 
            />
            {domains.map((domain) => (
              <FilterChip 
                key={domain} 
                label={domain} 
                isSelected={selectedDomain === domain} 
                onPress={() => onSelectDomain(domain)} 
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected && styles.selectedChip
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.chipText,
          isSelected && styles.selectedChipText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
    color: colors.text,
  },
  resetText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  filtersContainer: {
    paddingHorizontal: 12,
  },
  filterSection: {
    marginRight: 20,
    minWidth: 150,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.textSecondary,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedChipText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default FilterBar;