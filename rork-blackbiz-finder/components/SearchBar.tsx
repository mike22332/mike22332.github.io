import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Search businesses...",
  onSubmit
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.lightText} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        // Web accessibility
        accessibilityLabel="Search businesses"
        accessibilityHint="Enter business name or category to search"
        // Prevent potential double input issues on iOS/TestFlight
        autoCorrect={false}
        autoCapitalize="none"
        // Web-specific props
        {...(Platform.OS === 'web' && {
          autoComplete: 'off',
          spellCheck: false,
        })}
      />
      {value.length > 0 && (
        <Pressable 
          onPress={() => onChangeText('')} 
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <X size={18} color={Colors.lightText} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.text,
  },
  clearButton: {
    padding: 4,
  },
});