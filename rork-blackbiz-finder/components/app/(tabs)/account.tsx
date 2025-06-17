import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Store, Bell, MapPin, HelpCircle, Info, Settings, LogOut, User, Globe } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/hooks/useAuthStore';
import WebBrowserButton from '@/components/WebBrowserButton';

export default function AccountScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  
  const handleListBusiness = () => {
    router.push('/subscription');
  };
  
  const handleSignIn = () => {
    router.push('/auth');
  };
  
  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  const handleToggleLocation = () => {
    setLocationEnabled(!locationEnabled);
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: () => {
            logout();
            Alert.alert("Logged Out", "You have been logged out successfully.");
          }
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>
      
      {isAuthenticated && user ? (
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitials}>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          <Pressable style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.signInSection}>
          <View style={styles.signInContent}>
            <User size={48} color={Colors.primary} />
            <Text style={styles.signInTitle}>Sign In to Your Account</Text>
            <Text style={styles.signInSubtitle}>
              Access your favorite businesses, manage listings, and more
            </Text>
            <Pressable style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInButtonText}>Sign In / Sign Up</Text>
            </Pressable>
          </View>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business</Text>
        <Pressable style={styles.menuItem} onPress={handleListBusiness}>
          <Store size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>List Your Business</Text>
          <ChevronRight size={20} color={Colors.lightText} />
        </Pressable>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuItem}>
          <Bell size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
        <View style={styles.menuItem}>
          <MapPin size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Location Services</Text>
          <Switch
            value={locationEnabled}
            onValueChange={handleToggleLocation}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>
        <WebBrowserButton
          url="https://blackbusinessdirectory.com/help"
          title="Help & Support"
          subtitle="Get help with using the app"
          icon={<HelpCircle size={20} color={Colors.primary} />}
        />
        <WebBrowserButton
          url="https://blackbusinessdirectory.com/about"
          title="About Us"
          subtitle="Learn more about our mission"
          icon={<Info size={20} color={Colors.primary} />}
        />
        <WebBrowserButton
          url="https://blackbusinessdirectory.com/privacy"
          title="Privacy Policy"
          subtitle="How we protect your data"
          icon={<Globe size={20} color={Colors.primary} />}
        />
        <WebBrowserButton
          url="https://blackbusinessdirectory.com/terms"
          title="Terms of Service"
          subtitle="App usage terms and conditions"
          icon={<Globe size={20} color={Colors.primary} />}
        />
      </View>
      
      <View style={styles.section}>
        <Pressable style={styles.menuItem}>
          <Settings size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Settings</Text>
          <ChevronRight size={20} color={Colors.lightText} />
        </Pressable>
        {isAuthenticated && (
          <Pressable style={styles.menuItem} onPress={handleLogout}>
            <LogOut size={20} color={Colors.error} />
            <Text style={[styles.menuItemText, { color: Colors.error }]}>Log Out</Text>
          </Pressable>
        )}
      </View>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  profileSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.lightText,
  },
  editProfileButton: {
    backgroundColor: Colors.border,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  signInSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  signInContent: {
    padding: 24,
    alignItems: 'center',
  },
  signInTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  signInSubtitle: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  versionText: {
    textAlign: 'center',
    color: Colors.lightText,
    fontSize: 14,
    marginBottom: 24,
  },
});