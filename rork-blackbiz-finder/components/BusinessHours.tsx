import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusinessHours as HoursType } from '@/types/business';
import Colors from '@/constants/colors';

interface BusinessHoursProps {
  hours?: HoursType[];
}

export default function BusinessHours({ hours }: BusinessHoursProps) {
  if (!hours || hours.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noHoursText}>No business hours available</Text>
      </View>
    );
  }

  // Get current day of week
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <View style={styles.container}>
      {hours.map((hour, index) => (
        <View 
          key={index} 
          style={[
            styles.hourRow,
            hour.day === today && styles.todayRow
          ]}
        >
          <Text 
            style={[
              styles.day,
              hour.day === today && styles.todayText
            ]}
          >
            {hour.day}
          </Text>
          
          <Text 
            style={[
              styles.hours,
              hour.day === today && styles.todayText,
              hour.isClosed && styles.closedText
            ]}
          >
            {hour.isClosed ? 'Closed' : `${hour.open} - ${hour.close}`}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  todayRow: {
    backgroundColor: 'rgba(93, 74, 126, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  day: {
    fontSize: 16,
    color: Colors.text,
  },
  hours: {
    fontSize: 16,
    color: Colors.text,
  },
  todayText: {
    fontWeight: '600',
    color: Colors.primary,
  },
  closedText: {
    color: Colors.lightText,
  },
  noHoursText: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    padding: 16,
  },
});