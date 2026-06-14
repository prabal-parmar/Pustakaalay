import React, { useState } from "react";
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
  ShieldCheck,
  KeyRound,
  Fingerprint,
  FileText,
  Trash2,
  ChevronRight,
  ShieldAlert,
  X,
  Lock,
  User,
} from "lucide-react-native";
import { styles } from "@/components/styles/commonStyles/privacySecurityStyles";

type ModalType = "password" | "privacy" | "tos" | "deleteAccount" | null;

export default function PrivacySecurityScreen() {
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [deleteUsername, setDeleteUsername] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const handleDeleteAccountInit = () => {
    setActiveModal("deleteAccount");
  };

  const confirmDeleteAccount = () => {
    if (!deleteUsername || !deletePassword) {
      Alert.alert(
        "Missing Fields",
        "Please enter both your username and password to confirm deletion.",
      );
      return;
    }

    Alert.alert(
      "Account Deleted",
      "Your Pustakaalay account has been permanently deleted.",
      [{ text: "OK", onPress: () => closeModals() }],
    );
  };

  const handlePasswordUpdate = () => {
    if (!oldPassword || !newPassword || !verifyPassword) {
      Alert.alert("Missing Fields", "Please fill in all password fields.");
      return;
    }
    if (newPassword !== verifyPassword) {
      Alert.alert("Mismatch", "New password and verify password do not match.");
      return;
    }

    Alert.alert("Success", "Your password has been securely updated.", [
      { text: "OK", onPress: () => closeModals() },
    ]);
  };

  const closeModals = () => {
    setActiveModal(null);
    setOldPassword("");
    setNewPassword("");
    setVerifyPassword("");
    setDeleteUsername("");
    setDeletePassword("");
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const SettingRow = ({ icon: Icon, title, subtitle, onPress }: any) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconBox}>
        <Icon size={22} color="#1A1A1A" />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
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
        <Icon size={22} color="#1A1A1A" />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E2E8F0", true: "#5c1616" }}
        thumbColor={"#FFFFFF"}
        ios_backgroundColor="#E2E8F0"
        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF0" />

      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerBtn}
          >
            <ArrowLeft size={22} color="#5c1616" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Security</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollPadding}
        >
          <View style={styles.heroSection}>
            <View style={styles.heroIconWrapper}>
              <View style={styles.heroIconInner}>
                <ShieldCheck size={50} color="#5c1616" strokeWidth={1.5} />
              </View>
            </View>
            <Text style={styles.heroTitle}>Account Secured</Text>
            <Text style={styles.heroText}>
              Your personal data and inventory are encrypted and safe.
            </Text>
          </View>

          <View style={styles.card}>
            <SectionHeader title="Login & Access" />
            <SettingRow
              icon={KeyRound}
              title="Change Password"
              subtitle="Update your current password"
              onPress={() => setActiveModal("password")}
            />
            <View style={styles.divider} />
            <ToggleRow
              icon={Fingerprint}
              title="App Lock"
              subtitle="Require Biometrics/PIN to open app"
              value={isAppLockEnabled}
              onValueChange={setIsAppLockEnabled}
            />
          </View>

          <View style={styles.card}>
            <SectionHeader title="About Pustakaalay" />
            <SettingRow
              icon={FileText}
              title="Privacy Policy"
              subtitle="How we handle your data"
              onPress={() => setActiveModal("privacy")}
            />
            <View style={styles.divider} />
            <SettingRow
              icon={ShieldAlert}
              title="Terms of Service"
              subtitle="Rules and agreements"
              onPress={() => setActiveModal("tos")}
            />
          </View>

          <TouchableOpacity
            style={styles.dangerCard}
            activeOpacity={0.8}
            onPress={handleDeleteAccountInit}
          >
            <View style={styles.dangerIconBox}>
              <Trash2 size={24} color="#EF4444" />
            </View>
            <View style={styles.dangerTextWrap}>
              <Text style={styles.dangerTitle}>Delete Account</Text>
              <Text style={styles.dangerSubtitle}>
                Permanently remove your account
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.versionText}>Pustakaalay v1.0.0</Text>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={activeModal === "password"}
        transparent
        animationType="slide"
        onRequestClose={closeModals}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Password</Text>
              <TouchableOpacity onPress={closeModals} style={styles.closeBtn}>
                <X size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              Create a strong, unique password to keep your Pustakaalay account
              safe.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter current password"
                  placeholderTextColor="#CBD5E1"
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
              </View>
              <TouchableOpacity style={styles.forgotPassBtn}>
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#CBD5E1"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Verify Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter new password"
                  placeholderTextColor="#CBD5E1"
                  secureTextEntry
                  value={verifyPassword}
                  onChangeText={setVerifyPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handlePasswordUpdate}
            >
              <Text style={styles.primaryBtnText}>Secure Account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={activeModal === "deleteAccount"}
        transparent
        animationType="slide"
        onRequestClose={closeModals}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: "#EF4444" }]}>
                Delete Account
              </Text>
              <TouchableOpacity onPress={closeModals} style={styles.closeBtn}>
                <X size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              This action is irreversible. Please verify your identity to
              proceed with account deletion.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <User size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor="#CBD5E1"
                  autoCapitalize="none"
                  value={deleteUsername}
                  onChangeText={setDeleteUsername}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#CBD5E1"
                  secureTextEntry
                  value={deletePassword}
                  onChangeText={setDeletePassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: "#EF4444" }]}
              onPress={confirmDeleteAccount}
            >
              <Text style={styles.primaryBtnText}>Permanently Delete</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={activeModal === "privacy" || activeModal === "tos"}
        transparent
        animationType="slide"
        onRequestClose={closeModals}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { height: "88%" }]}>
            <View style={styles.dragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {activeModal === "privacy"
                  ? "Privacy Policy"
                  : "Terms of Service"}
              </Text>
              <TouchableOpacity onPress={closeModals} style={styles.closeBtn}>
                <X size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
            >
              {activeModal === "privacy" ? (
                <>
                  <View style={styles.legalBlock}>
                    <View style={styles.legalSectionHeader}>
                      <View style={styles.legalBadge}>
                        <Text style={styles.legalBadgeText}>1</Text>
                      </View>
                      <Text style={styles.legalSectionTitle}>
                        Data Collection
                      </Text>
                    </View>
                    <Text style={styles.legalText}>
                      At Pustakaalay, we are committed to safeguarding your
                      privacy. We collect minimal personal information necessary
                      to facilitate book exchanges and purchases. This includes
                      your name, email, and basic location data to match you
                      with nearby traders.
                    </Text>
                  </View>

                  <View style={styles.legalBlock}>
                    <View style={styles.legalSectionHeader}>
                      <View style={styles.legalBadge}>
                        <Text style={styles.legalBadgeText}>2</Text>
                      </View>
                      <Text style={styles.legalSectionTitle}>
                        Security Measures
                      </Text>
                    </View>
                    <Text style={styles.legalText}>
                      Your data is encrypted in transit and at rest. We utilize
                      industry-standard cryptographic protocols to ensure that
                      your passwords, addresses, and payment tokens remain
                      inaccessible to unauthorized parties.
                    </Text>
                  </View>

                  <View style={styles.legalBlock}>
                    <View style={styles.legalSectionHeader}>
                      <View style={styles.legalBadge}>
                        <Text style={styles.legalBadgeText}>3</Text>
                      </View>
                      <Text style={styles.legalSectionTitle}>
                        Third-Party Sharing
                      </Text>
                    </View>
                    <Text style={styles.legalText}>
                      We do not sell your personal data. Information is only
                      shared with trusted third-party logistics partners
                      strictly for the purpose of fulfilling your physical book
                      deliveries.
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.legalBlock}>
                    <View style={styles.legalSectionHeader}>
                      <View style={styles.legalBadge}>
                        <Text style={styles.legalBadgeText}>1</Text>
                      </View>
                      <Text style={styles.legalSectionTitle}>User Conduct</Text>
                    </View>
                    <Text style={styles.legalText}>
                      By accessing Pustakaalay, you agree to engage in fair
                      trading practices. Any misrepresentation of book
                      conditions (e.g., listing a heavily damaged book as "Like
                      New") may result in permanent account suspension.
                    </Text>
                  </View>

                  <View style={styles.legalBlock}>
                    <View style={styles.legalSectionHeader}>
                      <View style={styles.legalBadge}>
                        <Text style={styles.legalBadgeText}>2</Text>
                      </View>
                      <Text style={styles.legalSectionTitle}>
                        Intellectual Property
                      </Text>
                    </View>
                    <Text style={styles.legalText}>
                      All digital E-books purchased or accessed through
                      Pustakaalay are protected by copyright law. You are
                      granted a personal, non-transferable license to read the
                      content. Redistribution or piracy is strictly prohibited.
                    </Text>
                  </View>

                  <View style={styles.legalBlock}>
                    <View style={styles.legalSectionHeader}>
                      <View style={styles.legalBadge}>
                        <Text style={styles.legalBadgeText}>3</Text>
                      </View>
                      <Text style={styles.legalSectionTitle}>
                        Account Termination
                      </Text>
                    </View>
                    <Text style={styles.legalText}>
                      Pustakaalay reserves the right to terminate or suspend
                      access to our services immediately, without prior notice,
                      for any conduct that we believe violates these Terms of
                      Service or is harmful to other users of the app.
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}