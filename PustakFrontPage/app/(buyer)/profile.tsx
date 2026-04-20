import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  User,
  ShieldCheck,
  Plus,
  Bell,
  Settings,
  Heart,
  RefreshCcw,
  History,
  Search,
  X,
  Book,
  ChevronRight,
  UserCircle,
  LogOut,
  Lock,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/profileStyles";
import { fetchBuyerProfileData, fetchBuyerTradeHistory } from "@/api/buyerApis/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { logout } from "@/api/authApis/loginUser";

type HistoryType = {
  id: string,
  title: string,
  to: string,
  date: string,
  type: string
}

export default function ReaderDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);

  const [reader, setReader] = useState({
    name: "",
    username: "",
    followers: "",
    following: "",
    description: "",
  });

  const handleLogout = async () => {
    const [completed, message] = await logout();
    if (completed) {
      router.replace("/(auth)/login");
      Alert.alert(message);
    } else {
      Alert.alert(message);
    }
  };

  const toggleSettings = () => {
    if(isNotificationActive){
      setIsNotificationActive(false);
    }
    setIsSettingsVisible(!isSettingsVisible)
  };

  const handleNotificationPress = () => {
    // To be added
    if(isSettingsVisible){
      setIsSettingsVisible(false);
    }
    setIsNotificationActive((prev) => !prev);
  };

  const settingsOptions = [
    {
      id: 1,
      label: "Account Settings",
      icon: <UserCircle size={20} color="#1A1A1A" />,
    },
    { id: 2, label: "Notifications", icon: <Bell size={20} color="#1A1A1A" /> },
    {
      id: 3,
      label: "Privacy & Security",
      icon: <Lock size={20} color="#1A1A1A" />,
    },
    {
      id: 4,
      label: "Logout",
      icon: <LogOut size={20} color="#D90429" />,
      isLogout: true,
    },
  ];

  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        const [message, buyerData] = await fetchBuyerProfileData(username);
        if (buyerData){
          setReader(buyerData);
        }
        else{
          await logout();
          return Alert.alert(message);
        }
      }
    };
    
    const fetchTradeHistory = async () => {
      const [message, data, completed] = await fetchBuyerTradeHistory();
      if (completed) {
        setHistory(data);
      }
      else {
        return Alert.alert(message);
      }
    }
    fetchProfile();
    fetchTradeHistory();
  }, []);

  const filtered = history.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.to.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.topSection}>
          <View style={styles.headerActions}>
            <Pressable
              style={[styles.iconBtn, isNotificationActive && { opacity: 0.5 }]}
              onPress={handleNotificationPress}
            >
              <Bell size={20} color="#fff" />
              <View style={styles.dot} />
            </Pressable>
            <Pressable
              style={[styles.iconBtn, isSettingsVisible && { opacity: 0.5 }]}
              onPress={toggleSettings}
            >
              <Settings size={20} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrap}>
              <User size={48} color="#5c1616" strokeWidth={1.5} />
              <Pressable style={styles.avatarPlus}>
                <Plus size={14} color="#fff" strokeWidth={3} />
              </Pressable>
            </View>
          </View>

          <View style={styles.identityBlock}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>{reader?.name}</Text>
              <ShieldCheck size={18} color="#FBBF24" fill="#5c1616" />
            </View>
            <Text style={styles.usernameText}>@{reader?.username}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{reader?.followers}</Text>
              <Text style={styles.statLabel}>FOLLOWERS</Text>
            </View>
            <View style={styles.statPipe} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{reader?.following}</Text>
              <Text style={styles.statLabel}>FOLLOWING</Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{reader?.description}</Text>
          </View>

          <View style={styles.buttonRow}>
            <Pressable 
              style={styles.btnPrimary}
              onPress={() => router.navigate('/buyerPages/favoriteBooks')}
            >
              <Heart size={16} color="#fff" fill="#fff" />
              <Text style={styles.btnTextPrimary}>FAVORITES</Text>
            </Pressable>
            <Pressable
              style={styles.btnSecondary}
              onPress={() => router.push("/buyerPages/buyerBookForm")}
            >
              <RefreshCcw size={16} color="#1A1A1A" />
              <Text style={styles.btnTextSecondary}>NEW TRADE</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleGroup}>
              <History size={20} color="#1A1A1A" />
              <Text style={styles.sectionTitle}>Trade History</Text>
            </View>
            <Text style={styles.historyCount}>
              {filtered.length} activities
            </Text>
          </View>

          <View style={styles.searchWrapper}>
            <Search size={18} color="#A5A58D" />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search trades..."
              placeholderTextColor="#A5A58D"
              style={styles.searchInput}
            />
            {searchTerm.length > 0 && (
              <Pressable onPress={() => setSearchTerm("")}>
                <X size={16} color="#A5A58D" />
              </Pressable>
            )}
          </View>

          <View style={styles.listContainer}>
            {filtered.map((item) => (
              <Pressable key={item.id} style={styles.historyItem}>
                <View style={styles.bookArt}>
                  <Book size={22} color="#B07D05" />
                  <View style={[styles.typeIndicator]} />
                </View>

                <View style={styles.historyDetails}>
                  <Text style={styles.historyBookTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>
                      {item.type === "sell" ? "Sold to" : item.type === "exchange" ? "Exchange with" : "Bought from"}
                    </Text>
                    <Text style={styles.metaUser}>@{item.to}</Text>
                    <View style={styles.miniDot} />
                    <Text style={styles.metaDate}>{item.date}</Text>
                  </View>
                </View>

                <ChevronRight size={16} color="#E5E0D5" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsVisible}
        onRequestClose={() => {
          toggleSettings();
          setIsNotificationActive(false);
        }}
      >
        <TouchableWithoutFeedback onPress={toggleSettings}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle} />
                  <Text style={styles.modalTitle}>Settings</Text>
                </View>

                <ScrollView style={styles.settingsList}>
                  {settingsOptions.map((option) => (
                    <Pressable
                      key={option.id}
                      style={styles.settingsItem}
                      onPress={() => {
                        if (option.isLogout) handleLogout();
                        setIsNotificationActive(false);
                        toggleSettings();
                      }}
                    >
                      <View style={styles.settingsItemLeft}>
                        {option.icon}
                        <Text
                          style={[
                            styles.settingsText,
                            option.isLogout && { color: "#D90429" },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </View>
                      {!option.isLogout && (
                        <ChevronRight size={18} color="#A5A58D" />
                      )}
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
