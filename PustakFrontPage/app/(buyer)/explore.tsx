import React, { useState, useMemo, useRef } from "react";
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

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  poster: string;
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

const readerInventory: Book[] = [
  {
    id: 301,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "₹180",
    poster: "bookworm_ali",
    condition: "New",
    genre: "Thriller",
    category: "Buy",
    distance: "1.2 km",
  },
  {
    id: 302,
    title: "Deep Work",
    author: "Cal Newport",
    price: "Free",
    poster: "productivity_pro",
    condition: "Like New",
    genre: "Self-Help",
    category: "Exchange",
    distance: "3.5 km",
  },
  {
    id: 303,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: "₹99",
    poster: "Pustakaalay",
    condition: "HD Digital",
    genre: "History",
    category: "Ebook",
    distance: "Instant",
  },
  {
    id: 304,
    title: "Atomic Habits",
    author: "James Clear",
    price: "₹250",
    poster: "habit_tracker",
    condition: "New",
    genre: "Productivity",
    category: "Buy",
    distance: "4.2 km",
  },
  {
    id: 305,
    title: "Dune: Part One",
    author: "Frank Herbert",
    price: "Free",
    poster: "scifi_fan",
    condition: "Good",
    genre: "Sci-Fi",
    category: "Exchange",
    distance: "0.8 km",
  },
  {
    id: 306,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: "₹75",
    poster: "Pustakaalay",
    condition: "Epub",
    genre: "Fiction",
    category: "Ebook",
    distance: "Instant",
  },
];

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
  const scrollRef = useRef<ScrollView>(null);

  const filteredBooks = useMemo(
    () =>
      readerInventory.filter((b) => {
        const matchesSearch =
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.genre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          activeCategory === "All" || b.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [searchTerm, activeCategory]
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

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
                      <Text style={styles.posterName}>@{book.poster}</Text>
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
