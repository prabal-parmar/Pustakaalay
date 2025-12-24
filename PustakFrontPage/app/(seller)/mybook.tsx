import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import {
  Book,
  Plus,
  Search,
  X,
  ChevronRight,
  Filter,
  BookOpen,
  Sparkles,
  GraduationCap,
  Library,
  MoreHorizontal,
  Star,
} from "lucide-react-native";
import { styles } from "@/components/styles/sellerStyles/mybookStyles";

export default function InventoryScreen() {
  const [activeType, setActiveType] = useState("Novel");
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categoryMap: Record<string, string[]> = {
    Educational: ["All", "Science", "History", "Technology", "Mathematics", "Medicine"],
    Novel: ["All", "Fiction", "Fantasy", "Mystery", "Romance", "Sci-Fi", "Thriller"],
    Other: ["All", "Biography", "Hobby", "Magazine", "Journal", "Comics"],
  };

  const typeIcons: any = {
    Educational: <GraduationCap size={18} color="#FBBF24" />,
    Novel: <Library size={18} color="#FBBF24" />,
    Other: <MoreHorizontal size={18} color="#FBBF24" />,
  };

  const inventory = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "Novel", genre: "Fiction", condition: "Rare", price: "Trade" },
    { id: 2, title: "A Brief History of Time", author: "Stephen Hawking", type: "Educational", genre: "Science", condition: "New", price: "₹850" },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", type: "Novel", genre: "Fantasy", condition: "Rare", price: "Trade" },
  ];

  const filteredBooks = useMemo(() => {
    return inventory.filter((book) => {
      const matchesType = book.type === activeType;
      const matchesGenre = activeGenre === "All" || book.genre === activeGenre;
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesGenre && matchesSearch;
    });
  }, [activeType, activeGenre, searchTerm]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Inventory</Text>
            <Text style={styles.subtitle}>MANAGE YOUR COLLECTION</Text>
          </View>

          <Pressable style={styles.addBtn}>
            <Plus size={22} color="#FBBF24" />
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <Search size={18} color="#A5A58D" />
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder={`Search in ${activeType}...`}
            placeholderTextColor="#A5A58D"
            style={styles.searchInput}
          />
          {searchTerm.length > 0 && (
            <Pressable onPress={() => setSearchTerm("")}>
              <X size={16} color="#A5A58D" />
            </Pressable>
          )}
        </View>

        <View style={styles.typeRow}>
          {Object.keys(categoryMap).map((type) => {
            const active = activeType === type;
            return (
              <Pressable
                key={type}
                onPress={() => {
                  setActiveType(type);
                  setActiveGenre("All");
                }}
                style={[styles.typeBtn, active && styles.typeBtnActive]}
              >
                {typeIcons[type]}
                <Text style={[styles.typeText, active && styles.typeTextActive]}>
                  {type}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
          {categoryMap[activeType].map((genre) => {
            const active = genre === activeGenre;
            return (
              <Pressable
                key={genre}
                onPress={() => setActiveGenre(genre)}
                style={[styles.genrePill, active && styles.genreActive]}
              >
                <Text style={[styles.genreText, active && styles.genreTextActive]}>
                  {genre}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.countRow}>
          <Text style={styles.countText}>
            {filteredBooks.length} {activeType} Found
          </Text>
          <Filter size={14} color="#6B705C" />
        </View>

        <View style={styles.list}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Pressable key={book.id} style={styles.card}>
                <View style={styles.cover}>
                  <Book size={22} color="#FBBF24" />
                  {book.condition === "Rare" && (
                    <Sparkles size={12} color="#B07D05" style={styles.sparkle} />
                  )}
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bookTitle}>{book.title}</Text>
                      <Text style={styles.bookAuthor}>{book.author}</Text>
                    </View>
                    <ChevronRight size={18} color="#E5E0D5" />
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.price}>{book.price}</Text>
                    <View style={styles.rating}>
                      <Star size={12} fill="#FBBF24" color="#FBBF24" />
                      <Text style={styles.ratingText}>4.9</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.empty}>
              <BookOpen size={26} color="#A5A58D" />
              <Text style={styles.emptyTitle}>No Books Found</Text>
              <Text style={styles.emptyText}>
                Try changing the genre or search term
              </Text>
              <Pressable
                onPress={() => {
                  setActiveGenre("All");
                  setSearchTerm("");
                }}
              >
                <Text style={styles.reset}>RESET FILTERS</Text>
              </Pressable>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
