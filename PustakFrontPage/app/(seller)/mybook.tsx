import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  Alert,
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
import { fetchAllBooksOfSeller } from "@/api/sellerApis/myBooksApi";

export default function InventoryScreen() {
  const [activeType, setActiveType] = useState("Novel");
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter()

  const categoryMap: Record<string, string[]> = {
    Educational: ["All", "Science", "History", "Technology", "Mathematics", "Medicine"],
    Novel: ["All", "Fiction", "Fantasy", "Mystery", "Romance", "Sci-Fi", "Thriller"],
    Other: ["All", "Biography", "Hobby", "Magazine", "Journal", "Comics"],
  };

  const typeIcons: any = {
    Educational: <GraduationCap size={16} color={activeType === "Educational" ? "#FFF" : "#D4AF37"} />,
    Novel: <Library size={16} color={activeType === "Novel" ? "#FFF" : "#D4AF37"} />,
    Other: <MoreHorizontal size={16} color={activeType === "Other" ? "#FFF" : "#D4AF37"} />,
  };

  const [inventory, setInventory] = useState<any>([]);

useFocusEffect(
  useCallback(() => {
    const fetchBooksData = async () => {
      const [bookData, message, completed] = await fetchAllBooksOfSeller();
      if(completed){
        setInventory(bookData)
      }
      else{
        return Alert.alert(message)
      }
    }
    fetchBooksData()
  }, [inventory])
)
  const filteredBooks = useMemo(() => {
    return inventory.filter((book: any) => {
      const matchesType = book.type === activeType;
      const matchesGenre = activeGenre === "All" || book.genre === activeGenre;
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesGenre && matchesSearch;
    });
  }, [activeType, activeGenre, searchTerm, inventory]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>

        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>MANAGE YOUR COLLECTION</Text>
            <Text style={styles.title}>My Inventory</Text>
          </View>
          <Pressable style={styles.addBtn} onPress={() => router.push('/sellerPages/bookForm')}>
            <Plus size={24} color="#FFF" strokeWidth={3} />
          </Pressable>
        </View>

        <View style={styles.stickyWrapper}>
          <View style={styles.searchBox}>
            <Search size={18} color="#A5A58D" strokeWidth={2.5} />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder={`Search in ${activeType.toLowerCase()}...`}
              placeholderTextColor="#A5A58D99"
              style={styles.searchInput}
            />
            {searchTerm.length > 0 && (
              <Pressable onPress={() => setSearchTerm("")} style={styles.clearBtn}>
                <X size={14} color="#A5A58D" />
              </Pressable>
            )}
          </View>
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow} contentContainerStyle={{ paddingRight: 40 }}>
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
          <View style={styles.flexRowCenter}>
            <View style={styles.accentLine} />
            <Text style={styles.countText}>
              {filteredBooks.length} {activeType.toUpperCase()} ITEMS
            </Text>
          </View>
          <Filter size={16} color="#1A1A1A" opacity={0.6} />
        </View>

        <View style={styles.list}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book: any) => (
              <Pressable key={book.id} style={styles.card}>
                <View style={styles.cover}>
                  <Book size={24} color="#D4AF37" opacity={0.3} />
                  {book.condition === "Rare" && (
                    <View style={styles.rareBadge}>
                       <Sparkles size={10} color="#FFF" />
                    </View>
                  )}
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bookTitle}>{book.title.toUpperCase()}</Text>
                      <View style={styles.authorRow}>
                         <View style={styles.dot} />
                         <Text style={styles.bookAuthor}>{book.author.toUpperCase()}</Text>
                      </View>
                    </View>
                    <View style={styles.chevronBg}>
                      <ChevronRight size={14} color="#1A1A1A" strokeWidth={3} />
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.price}>{book.price}</Text>
                    <View style={styles.rating}>
                      <Star size={12} fill="#D4AF37" color="#D4AF37" />
                      <Text style={styles.ratingText}>4.9</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.empty}>
              <View style={styles.emptyIconCircle}>
                <BookOpen size={32} color="#D4AF37" opacity={0.4} />
              </View>
              <Text style={styles.emptyTitle}>No matching titles</Text>
              <Text style={styles.emptyText}>
                We couldn't find anything in your collection.
              </Text>
              <Pressable
                onPress={() => {
                  setActiveGenre("All");
                  setSearchTerm("");
                }}
                style={styles.resetBtn}
              >
                <Text style={styles.resetText}>RESET FILTERS</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}