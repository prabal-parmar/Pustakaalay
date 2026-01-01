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
  FileText,
  Plus,
  Search,
  X,
  Eye,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Info,
  MoreHorizontal,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/ebookStyles";

export default function MyEbooksScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const myEbooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      postedDate: "Oct 12, 2024",
      reads: "1.2k",
      genre: "THRILLER",
      description:
        "A shocking psychological thriller of a woman's act of violence.",
    },
    {
      id: 2,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      postedDate: "Sept 28, 2024",
      reads: "3.1k",
      genre: "SELF-HELP",
      description:
        "A landmark bestseller that has helped millions achieve success.",
    },
  ];

  const filtered = myEbooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <View style={styles.badgeRow}>
              <ShieldCheck size={12} color="#B07D05" />
              <Text style={styles.badgeText}>SECURE PORTFOLIO</Text>
            </View>
            <Text style={styles.title}>My Library</Text>
          </View>
          <Pressable style={styles.postBtn}>
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color="#9A9A8C" />
            <TextInput
              placeholder="Search library..."
              placeholderTextColor="#A5A58D"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
            />
            {searchTerm.length > 0 && (
              <Pressable onPress={() => setSearchTerm("")}>
                <X size={18} color="#A5A58D" />
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.infoBanner}>
          <Info size={18} color="#B07D05" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Read-Only Protection</Text>
            <Text style={styles.infoText}>
              In-app viewing only. Downloads disabled.
            </Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.countText}>
              {filtered.length} BOOKS PUBLISHED
            </Text>
            <View style={styles.divider} />
          </View>

          {filtered.map((ebook) => (
            <View key={ebook.id} style={styles.card}>
              <View style={styles.coverSection}>
                <View style={styles.cover}>
                  <FileText size={28} color="#B07D05" strokeWidth={1.5} />
                  <View style={styles.pdfTag}>
                    <Text style={styles.pdfTagText}>PDF</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.genreTag}>{ebook.genre}</Text>
                  <MoreHorizontal size={18} color="#A5A58D" />
                </View>

                <View>
                  <Text style={styles.bookTitle} numberOfLines={1}>
                    {ebook.title}
                  </Text>
                  <Text style={styles.authorName}>by {ebook.author}</Text>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                  {ebook.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.statsGroup}>
                    <View style={styles.statItem}>
                      <Eye size={12} color="#6B705C" />
                      <Text style={styles.statText}>{ebook.reads}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Calendar size={11} color="#6B705C" />
                      <Text style={styles.statText}>{ebook.postedDate}</Text>
                    </View>
                  </View>

                  <Pressable style={styles.readBtn}>
                    <Text style={styles.readBtnText}>READ</Text>
                    <ChevronRight size={12} color="#1A1A1A" strokeWidth={4} />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
