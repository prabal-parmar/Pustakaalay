import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  BookOpen,
  Users,
  Book,
  MapPin,
  Settings,
  Plus,
  ShieldCheck,
  Star,
  Edit3,
  Share2,
  TrendingUp,
  Search,
  X,
} from "lucide-react-native";

import { styles } from "@/components/styles/sellerStyles/profileStyles"

export default function CollectorProfileScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const collector = {
    name: "Prabal Parmar",
    username: "prabal",
    followers: "1000",
    totalBooks: "30",
    description:
      "I am new here.",
    location: "Indore, India",
    rating: 4.8,
  };

  const myBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "Trade Only" },
    { id: 2, title: "1984", author: "George Orwell", price: "₹250" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", price: "-" },
    { id: 4, title: "Atomic Habits", author: "James Clear", price: "₹300" },
  ];

  const filteredBooks = myBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#FFFDF0", "#FFF4C2"]} style={styles.bg}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.cover}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  <User size={48} color="#5c1616" />
                </View>
              </View>

              <View style={styles.headerIcons}>
                <Pressable><Share2 size={18} color="#fff" /></Pressable>
                <Pressable><Settings size={18} color="#fff" /></Pressable>
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.rowBetween}>
                <View>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{collector.name}</Text>
                    <ShieldCheck size={18} color="#B07D05" />
                  </View>
                  <Text style={styles.username}>@{collector.username}</Text>
                </View>

                <Pressable style={styles.editBtn}>
                  <Edit3 size={14} />
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
              </View>

              <View style={styles.stats}>
                <Stat value={collector.followers} label="Followers" icon={<Users size={12} color="#FBBF24" />} />
                <Stat value={collector.totalBooks} label="My Books" icon={<BookOpen size={12} color="#FBBF24" />} />
                <Stat value={collector.rating} label="Rating" icon={<Star size={12} color="#FBBF24" />} />
              </View>

              <Text style={styles.bio}>“{collector.description}”</Text>

              <View style={styles.location}>
                <MapPin size={14} color="#B07D05" />
                <Text style={styles.locationText}>{collector.location}</Text>
              </View>

              <View style={styles.actions}>
                <PrimaryButton text="Add New Book" icon={<Plus size={16} color="#FFFFFF"/>} />
                <SecondaryButton text="Insights" icon={<TrendingUp size={16} />} />
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>My Library</Text>

          <View style={styles.searchBox}>
            <Search size={18} color="#A5A58D" />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search in your library..."
              style={styles.searchInput}
            />
            {searchTerm !== "" && (
              <Pressable onPress={() => setSearchTerm("")}>
                <X size={16} color="#A5A58D" />
              </Pressable>
            )}
          </View>

          <View style={styles.grid}>
            {filteredBooks.map((book) => (
              <View key={book.id} style={styles.bookCard}>
                <View style={styles.bookCover}>
                  <Book size={32} color="#FBBF24" />
                </View>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Text style={styles.bookPrice}>{book.price}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}


function Stat({ value, label, icon }: any) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statRow}>
        {icon}
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

function PrimaryButton({ text, icon }: any) {
  return (
    <Pressable style={styles.primaryBtn}>
      {icon}
      <Text style={styles.primaryText}>{text}</Text>
    </Pressable>
  );
}

function SecondaryButton({ text, icon }: any) {
  return (
    <Pressable style={styles.secondaryBtn}>
      {icon}
      <Text style={styles.secondaryText}>{text}</Text>
    </Pressable>
  );
}
