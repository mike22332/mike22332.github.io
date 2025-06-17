import React from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { BusinessCategory } from '@/types/business';
import Colors from '@/constants/colors';

interface CategoryButtonProps {
  category: {
    id: BusinessCategory;
    name: string;
  };
  isSelected?: boolean;
  onPress?: () => void;
}

export default function CategoryButton({ 
  category, 
  isSelected = false,
  onPress
}: CategoryButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/category/${category.id}`);
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
      ]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Filter by ${category.name} category`}
      accessibilityState={{ selected: isSelected }}
    >
      <Text 
        style={[
          styles.text,
          isSelected && styles.selectedText
        ]}
      >
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedContainer: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});