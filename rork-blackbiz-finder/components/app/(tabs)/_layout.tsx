import React from "react";
import { Tabs } from "expo-router";
import { Home, Search, Heart, User } from "lucide-react-native";
import Colors from "@/constants/colors";
import { Platform, StyleSheet, Dimensions } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.lightText,
        tabBarStyle: [
          {
            borderTopColor: Colors.border,
            backgroundColor: Colors.background,
          },
          Platform.OS === 'web' && styles.webTabBar,
        ],
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: Colors.text,
        },
        headerShadowVisible: false,
        // Web-specific tab optimizations
        ...(Platform.OS === 'web' && {
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          tabBarAccessibilityLabel: "Discover businesses",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
          tabBarAccessibilityLabel: "Search businesses",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
          tabBarAccessibilityLabel: "Favorite businesses",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          tabBarAccessibilityLabel: "Account settings",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  webTabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
});