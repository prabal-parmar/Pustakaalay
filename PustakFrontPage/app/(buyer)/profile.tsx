import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
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
  ArrowUpRight,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/profileStyles";

export default function ReaderDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const reader = {
    name: "Prabal Parmar",
    username: "parmar",
    followers: "1000",
    following: "600",
    description: "New here.",
  };

  const history = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      to: "rahul_books",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Normal People",
      to: "priya_readz",
      date: "1 week ago",
    },
  ];

  const filtered = history.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconBtn}>
              <Bell size={18} color="#fff" />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Settings size={18} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrap}>
            <User size={42} color="#5c1616" />
            <Pressable style={styles.avatarPlus}>
              <Plus size={12} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.nameBlock}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{reader.name}</Text>
              <ShieldCheck size={16} color="#FBBF24" />
            </View>

            <Text style={styles.username}>@{reader.username}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{reader.followers}</Text>
              <Text style={styles.statLabel}>FOLLOWERS</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.stat}>
              <Text style={styles.statValue}>{reader.following}</Text>
              <Text style={styles.statLabel}>FOLLOWING</Text>
            </View>
          </View>

          <Text style={styles.bio}>"{reader.description}"</Text>

          <View style={styles.actionsRow}>
            <Pressable style={styles.primaryBtn}>
              <Heart size={16} color="#fff" />
              <Text style={styles.primaryText}>MY FAVORITES</Text>
            </Pressable>

            <Pressable style={styles.secondaryBtn}>
              <RefreshCcw size={16} color="#1A1A1A" />
              <Text style={styles.secondaryText}>START TRADE</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sharing History</Text>
          <History size={16} color="#6B705C" />
        </View>

        <View style={styles.searchBox}>
          <Search size={18} color="#A5A58D" />
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search history or usernames..."
            placeholderTextColor="#A5A58D"
            style={styles.searchInput}
          />
          {searchTerm.length > 0 && (
            <Pressable onPress={() => setSearchTerm("")}>
              <X size={16} color="#A5A58D" />
            </Pressable>
          )}
        </View>

        {filtered.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.bookIcon}>
              <Book size={20} color="#FBBF24" />
            </View>

            <View style={styles.historyText}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <View style={styles.toRow}>
                <Text style={styles.toText}>@{item.to}</Text>
                <ArrowUpRight size={12} color="#B07D05" />
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
