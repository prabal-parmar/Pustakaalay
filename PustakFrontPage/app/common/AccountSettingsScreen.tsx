import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  StatusBar,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  User,
  MapPin,
  Bell,
  Moon,
  CreditCard,
  LogOut,
  ChevronRight,
  Camera,
  X,
  Phone,
} from "lucide-react-native";
import { logout } from "@/api/authApis/loginUser";
import { getUserDetails } from "@/api/commonPagesApis/commonPagesApis";
import { styles } from "@/components/styles/commonStyles/accountSettingStyles";


export default function AccountSettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [profilePhone, setProfilePhone] = useState("");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const [message, completed, data] = await getUserDetails();
        if (completed) {
          setProfileName(data.name);
          setProfileLocation(data.location);
          setProfilePhone(data.phone);
          setEmail(data.email);
        } else {
          Alert.alert(message);
        }
      } catch (error) {
        console.log("Error fetching details", error);
      }
    };
    fetchUserDetail();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              const [completed, message] = await logout();
              if (completed) {
                router.replace("/login");
              } else {
                Alert.alert(message);
                router.replace("/login");
              }
            } catch (error) {
              console.log("Error logging out", error);
            }
          },
        },
      ]
    );
  };

  const handleSaveProfile = () => {
    setIsEditProfileVisible(false);
    Alert.alert(
      "Profile Updated",
      "Your account details have been saved successfully."
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const SettingRow = ({
    icon: Icon,
    title,
    subtitle,
    valueText,
    onPress,
  }: any) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconBox}>
        <Icon size={20} color="#1A1A1A" />
      </View>
      
      <View style={styles.rowTextContainer}>
        {valueText ? (
          <>
            <Text style={styles.stackedLabel} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <Text style={styles.stackedValue}>
              {valueText}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.rowTitle} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.rowSubtitle} numberOfLines={2} ellipsizeMode="tail">
                {subtitle}
              </Text>
            )}
          </>
        )}
      </View>

      <View style={styles.chevronBox}>
        <ChevronRight size={18} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );

  const ToggleRow = ({
    icon: Icon,
    title,
    subtitle,
    value,
    onValueChange,
  }: any) => (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Icon size={20} color="#1A1A1A" />
      </View>
      <View style={styles.rowTextContainer}>
        <Text style={styles.rowTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.rowSubtitle} numberOfLines={2} ellipsizeMode="tail">
            {subtitle}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E2E8F0", true: "#0D9488" }}
        thumbColor={"#FFFFFF"}
        ios_backgroundColor="#E2E8F0"
        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerBtn}
          >
            <ArrowLeft size={22} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollPadding}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, styles.avatarInitialContainer]}>
                <Text style={styles.avatarInitialText}>
                  {profileName ? profileName.charAt(0).toUpperCase() : "A"}
                </Text>
              </View>
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Camera size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1} ellipsizeMode="tail">
                {profileName || "User Name"}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1} ellipsizeMode="tail">
                {email}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={() => setIsEditProfileVisible(true)}
            >
              <Text style={styles.editProfileText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <SectionHeader title="Personal Details" />
            <SettingRow
              icon={User}
              title="Full Name"
              valueText={profileName || "Not set"}
              onPress={() => setIsEditProfileVisible(true)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={Phone}
              title="Phone Number"
              valueText={profilePhone || "Not set"}
              onPress={() => setIsEditProfileVisible(true)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={MapPin}
              title="Location"
              valueText={profileLocation || "Not set"}
              onPress={() => setIsEditProfileVisible(true)}
            />
          </View>

          <View style={styles.card}>
            <SectionHeader title="App Preferences" />
            <ToggleRow
              icon={Bell}
              title="Push Notifications"
              subtitle="Alerts for messages and trades"
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
            />
            <View style={styles.divider} />
            <ToggleRow
              icon={Moon}
              title="Dark Mode"
              subtitle="Switch to dark theme"
              value={isDarkModeEnabled}
              onValueChange={setIsDarkModeEnabled}
            />
          </View>

          <View style={styles.card}>
            <SectionHeader title="Transactions & Shipping" />
            <SettingRow
              icon={CreditCard}
              title="Payment Methods"
              subtitle="Manage cards and UPI"
              onPress={() => console.log("Nav to Payments")}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={MapPin}
              title="Saved Addresses"
              subtitle="For physical book deliveries"
              onPress={() => console.log("Nav to Addresses")}
            />
          </View>

          <TouchableOpacity
            style={styles.logoutCard}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <View style={styles.logoutIconBox}>
              <LogOut size={22} color="#EF4444" />
            </View>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={isEditProfileVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsEditProfileVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity
                onPress={() => setIsEditProfileVisible(false)}
                style={styles.closeBtn}
              >
                <X size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <User size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#CBD5E1"
                  value={profileName}
                  onChangeText={setProfileName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Phone size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor="#CBD5E1"
                  keyboardType="phone-pad"
                  value={profilePhone}
                  onChangeText={setProfilePhone}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputWrapper}>
                <MapPin size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="City, Country"
                  placeholderTextColor="#CBD5E1"
                  value={profileLocation}
                  onChangeText={setProfileLocation}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleSaveProfile}
            >
              <Text style={styles.primaryBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}