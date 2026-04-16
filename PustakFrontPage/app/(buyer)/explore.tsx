import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  Search,
  BookOpen,
  MapPin,
  X,
  Filter,
  Heart,
  UserCircle2,
  Tag,
  ArrowUp,
  Zap,
  RefreshCw,
  ShoppingBag,
  LayoutGrid,
  LucideIcon,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/exploreStyles";
import { useFocusEffect } from "expo-router";
import { fetchBooksEbooksForBuyer } from "@/api/buyerApis/exploreApi";
import BookDetailModal, { BookData } from "../modals/bookModal";
import { fetchBookOrEbookDataById } from "@/api/modalApis/buyerModalsApi";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  seller: string;
  condition: string;
  genre: string;
  category: "Buy" | "Ebook" | "Exchange";
  distance: string;
}

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  { id: "All", label: "All Items", icon: LayoutGrid },
  { id: "Buy", label: "Buy", icon: ShoppingBag },
  { id: "Ebook", label: "Ebooks", icon: Zap },
  { id: "Exchange", label: "Exchange", icon: RefreshCw },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<number[]>([301, 305]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  const [readerInventory, setReaderInventory] = useState<Book[]>([]);

  const fetchMarketplaceInventory = async () => {
    setIsLoading(true);
    try {
      const [message, data, completed] = await fetchBooksEbooksForBuyer();

      if (completed && data) {
        setReaderInventory(data);
      } else {
        Alert.alert(message);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error occurred";
      Alert.alert("Error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchMarketplaceInventory();
    }, [])
  );

  const filteredBooks = useMemo(() =>
      readerInventory.filter((b) => {
        const matchesSearch =
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.genre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          activeCategory === "All" || b.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [readerInventory, searchTerm, activeCategory]
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openBook = async (id: string, type: string) => {
    const [message, data, completed] = await fetchBookOrEbookDataById(id, type)
    if(completed){
      setSelectedBook(data);
    }
    else{
      return Alert.alert(message);
    }
    setModalVisible(true);
  };

  const toggleWishlistLike = async (id: string) => {
    // To add
  }

  const toggleWishlistSave = async (id: string) => {
    // To add
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff5500" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <BookDetailModal
              isVisible={modalVisible}
              book={selectedBook}
              onClose={() => setModalVisible(false)}
              onBuy={(book) => console.log('Buying:', book.name)}
              onLikeToggle={() => selectedBook && toggleWishlistLike(selectedBook.id)}
              onSaveToggle={() => selectedBook && toggleWishlistSave(selectedBook.id)}
            />
          </View>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.subHeader}>MARKETPLACE</Text>
                <Text style={styles.mainTitle}>Discovery</Text>
              </View>
              <TouchableOpacity style={styles.filterIcon}>
                <Filter size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
              <Search size={18} color="#A5A58D" strokeWidth={3} />
              <TextInput
                style={styles.input}
                placeholder="Search library, authors..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor="#A5A58D99"
              />
              {searchTerm.length > 0 && (
                <TouchableOpacity onPress={() => setSearchTerm("")}>
                  <X size={18} color="#A5A58D" />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.catWrapper}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  style={[
                    styles.catBtn,
                    activeCategory === cat.id && styles.catBtnActive,
                  ]}
                >
                  <cat.icon
                    size={14}
                    color={activeCategory === cat.id ? "#FFF" : "#6B705C"}
                    strokeWidth={3}
                  />
                  <Text
                    style={[
                      styles.catText,
                      activeCategory === cat.id && styles.catTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.resultsHeader}>
            <View style={styles.accentBar} />
            <Text style={styles.resultsText}>
              {filteredBooks.length}{" "}
              {activeCategory === "All" ? "Total" : activeCategory} Results
            </Text>
          </View>

          {filteredBooks.length > 0 ? (
            <View style={styles.bookGrid}>
              {filteredBooks.map((book) => (
                <View key={book.id} style={styles.bookCard}>
                  <View style={styles.imagePlaceholder}>
                    <BookOpen
                      size={48}
                      color="#D4AF37"
                      style={{ opacity: 0.2 }}
                    />

                    <View
                      style={[
                        styles.typeBadge,
                        {
                          backgroundColor:
                            book.category === "Ebook"
                              ? "#D4AF37"
                              : book.category === "Exchange"
                              ? "#721C24"
                              : "#1A1A1A",
                        },
                      ]}
                    >
                      <Text style={styles.badgeText}>{book.category}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.heartBtn}
                      onPress={() => toggleWishlist(book.id)}
                    >
                      <Heart
                        size={16}
                        color={
                          wishlist.includes(book.id) ? "#721C24" : "#A5A58D"
                        }
                        fill={
                          wishlist.includes(book.id) ? "#721C24" : "transparent"
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.bookDetails}>
                    <View style={styles.genreRow}>
                      <Tag size={10} color="#D4AF37" />
                      <Text style={styles.genreText}>
                        {book.genre.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.bookName} numberOfLines={1}>
                      {book.title}
                    </Text>
                    <View style={styles.posterRow}>
                      <UserCircle2 size={12} color="#6B705C" />
                      <Text style={styles.posterName}>@{book.seller}</Text>
                    </View>

                    <View style={styles.priceRow}>
                      <View>
                        <Text style={styles.priceText}>{book.price}</Text>
                        <View style={styles.locRow}>
                          <MapPin size={8} color="#A5A58D" />
                          <Text style={styles.locText}>{book.distance}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>
                          {book.category === "Ebook"
                            ? "READ"
                            : book.category === "Exchange"
                            ? "SWAP"
                            : "BUY"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Search size={48} color="#D4AF37" style={{ opacity: 0.2 }} />
              <Text style={styles.emptyTitle}>
                No results in {activeCategory}
              </Text>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                <Text style={styles.clearBtnText}>CLEAR FILTERS</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.topBtn} onPress={scrollToTop}>
            <Text style={styles.topBtnText}>BACK TO TOP</Text>
            <ArrowUp size={14} color="#1A1A1A" />
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
