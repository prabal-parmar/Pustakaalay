import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
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
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/profileStyles";

export default function ReaderDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const reader = {
    name: "Prabal Parmar",
    username: "parmar",
    followers: "1.2k",
    following: "600",
    description:
      "Avid reader of psychological thrillers and ancient history. Always down for a book trade!",
  };

  const history = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      to: "rahul_books",
      date: "2 days ago",
      type: "SENT",
    },
    {
      id: 2,
      title: "Normal People",
      to: "priya_readz",
      date: "1 week ago",
      type: "RECEIVED",
    },
  ];

  const filtered = history.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.topSection}>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconBtn}>
              <Bell size={20} color="#fff" />
              <View style={styles.dot} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
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
              <Text style={styles.nameText}>{reader.name}</Text>
              <ShieldCheck size={18} color="#FBBF24" fill="#5c1616" />
            </View>
            <Text style={styles.usernameText}>@{reader.username}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{reader.followers}</Text>
              <Text style={styles.statLabel}>FOLLOWERS</Text>
            </View>
            <View style={styles.statPipe} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{reader.following}</Text>
              <Text style={styles.statLabel}>FOLLOWING</Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{reader.description}</Text>
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.btnPrimary}>
              <Heart size={16} color="#fff" fill="#fff" />
              <Text style={styles.btnTextPrimary}>FAVORITES</Text>
            </Pressable>
            <Pressable style={styles.btnSecondary}>
              <RefreshCcw size={16} color="#1A1A1A" />
              <Text style={styles.btnTextSecondary}>NEW TRADE</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleGroup}>
              <History size={20} color="#1A1A1A" />
              <Text style={styles.sectionTitle}>Sharing History</Text>
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
                      {item.type === "SENT" ? "Sent to" : "From"}
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
    </SafeAreaView>
  );
}
