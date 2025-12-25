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
  Clock,
  Shield,
  ChevronRight,
  Info,
  MoreVertical,
} from "lucide-react-native";
import { styles } from "../../components/styles/buyerStyles/ebookStyles";

export default function MyEbooksScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const myEbooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      postedDate: "Oct 12, 2024",
      reads: 1240,
      genre: "Thriller",
      description:
        "A shocking psychological thriller of a woman's act of violence.",
    },
    {
      id: 2,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      postedDate: "Sept 28, 2024",
      reads: 3105,
      genre: "Self-Help",
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Ebooks</Text>
            <View style={styles.badgeRow}>
              <Shield size={10} color="#FBBF24" />
              <Text style={styles.badgeText}>SHARED PORTFOLIO</Text>
            </View>
          </View>

          <Pressable style={styles.postBtn}>
            <Plus size={16} color="#fff" />
            <Text style={styles.postText}>POST EBOOK</Text>
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <Search size={18} color="#A5A58D" />
          <TextInput
            placeholder="Search your uploads..."
            placeholderTextColor="#A5A58D"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
          />
          {searchTerm.length > 0 && (
            <Pressable onPress={() => setSearchTerm("")}>
              <X size={16} color="#A5A58D" />
            </Pressable>
          )}
        </View>

        <View style={styles.infoBanner}>
          <View style={styles.infoIcon}>
            <Info size={16} color="#FBBF24" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>IN-APP PROTECTION</Text>
            <Text style={styles.infoText}>
              Ebooks are read-only inside the app. Downloads are disabled.
            </Text>
          </View>
        </View>

        <Text style={styles.count}>
          {filtered.length} EBOOKS PUBLISHED
        </Text>

        <View style={styles.list}>
          {filtered.length > 0 ? (
            filtered.map((ebook) => (
              <View key={ebook.id} style={styles.card}>
                <View style={styles.cover}>
                  <FileText size={30} color="#FBBF24" />
                  <View style={styles.pdfBadge}>
                    <Text style={styles.pdfText}>PDF</Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.cardTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.genre}>{ebook.genre}</Text>
                      <Text style={styles.bookTitle}>{ebook.title}</Text>
                      <Text style={styles.author}>by {ebook.author}</Text>
                    </View>
                    <MoreVertical size={18} color="#A5A58D" />
                  </View>

                  <Text style={styles.description} numberOfLines={2}>
                    “{ebook.description}”
                  </Text>

                  <View style={styles.cardBottom}>
                    <View style={styles.metaRow}>
                      <View style={styles.meta}>
                        <Eye size={12} color="#B07D05" />
                        <Text style={styles.metaText}>{ebook.reads}</Text>
                      </View>
                      <View style={styles.meta}>
                        <Clock size={12} color="#A5A58D" />
                        <Text style={styles.metaMuted}>
                          {ebook.postedDate}
                        </Text>
                      </View>
                    </View>

                    <Pressable style={styles.openBtn}>
                      <Text style={styles.openText}>OPEN READER</Text>
                      <ChevronRight size={12} />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.empty}>
              <FileText size={24} color="#A5A58D" />
              <Text style={styles.emptyTitle}>No Ebooks Found</Text>
              <Text style={styles.emptyText}>
                You haven’t posted any ebooks yet.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
