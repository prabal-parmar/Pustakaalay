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
import { fetchBooksEbooksForBuyer, sendBuyBookRequest, toggleBuyerBookLiked } from "@/api/buyerApis/exploreApi";
import BookDetailModal, { BookData } from "../modals/bookModal";
import { fetchBookOrEbookDataById } from "@/api/modalApis/buyerModalsApi";
import { EbookData, EbookDetailModal } from "../modals/ebookModal";
import { ExchangeBookData, ExchangeBookDetailModal } from "../modals/exchangeBookModal";

interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  seller: string;
  condition: string;
  genre: string;
  category: "Buy" | "Ebook" | "Exchange";
  distance: string;
  liked: boolean;
  saved: boolean;
  buyRequest: boolean;
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
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const [bookModalVisible, setBookModalVisible] = useState(false);
  const [ebookModalVisible, setEbookModalVisible] = useState(false);
  const [exhangeBookModalVisible, setExhangeBookModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<EbookData | null>(null);
  const [selectedExchangeBook, setSelectedExchangeBook] = useState<ExchangeBookData | null>(null);
  const [readerInventory, setReaderInventory] = useState<Book[]>([]);

  const handleRead = () => {
    console.log("Reading...");
    setEbookModalVisible(false);
  }

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

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openBook = async (id: string, type: string) => {
    const [message, data, completed] = await fetchBookOrEbookDataById(id, type)
    if(completed){
      if(type=="Buy"){
         setSelectedBook(data);
         setBookModalVisible(true);
      }
      else if(type=="Ebook"){
        setSelectedEbook(data);
        setEbookModalVisible(true);
      }
      else if (type=="Exchange"){
        setSelectedExchangeBook(data);
        setExhangeBookModalVisible(true);
      }
      else{
        console.log("Type of book is wrong!")
      }
    }
    else{
      return Alert.alert(message);
    }
  };

  const toggleWishlistLike = async (id: string, type: string) => {
    const [message, data, completed] = await toggleBuyerBookLiked(id, type);
    if (completed){
      setReaderInventory((prev: any) => prev.map((b: any)=> b.id === id ? { ...b, liked: !b.liked } : b))
      toggleWishlist(id);
    }
    else{
      return Alert.alert(message);
    }
  }

  const toggleWishlistSave = async (id: string, type: string) => {
    // To add
  }

  const handleProposeSwap = async (id: string, type: string) => {
    // To add
  }
  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleBuyNow = (prevAmount: number, book_id: string) => {
    const previousPrice = prevAmount;

    Alert.prompt(
      "Confirm Purchase",
      "Proceed with the current price or negotiate a new amount.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: async (negotiatedAmount: any) => {
            console.log(`User confirmed at: $${negotiatedAmount}`);
            const [message, data, completed] = await sendBuyBookRequest(book_id, negotiatedAmount);
            if (completed){
              return null;
            }
            else{
              return Alert.alert(message)
            }
          }
        }
      ],
      "plain-text",
      previousPrice.toString(),
      "numeric"
    );
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
              isVisible={bookModalVisible}
              book={selectedBook}
              onClose={() => {setBookModalVisible(false); setSelectedBook(null);}}
              onBuy={(book) => handleBuyNow(Number(book.price), book.id)}
              onLikeToggle={() => selectedBook && toggleWishlistLike(selectedBook.id, selectedBook.category)}
              onSaveToggle={() => selectedBook && toggleWishlistSave(selectedBook.id, selectedBook.category)}
            />
            <EbookDetailModal
              isVisible={ebookModalVisible}
              ebook={selectedEbook}
              onClose={() => {setEbookModalVisible(false); setSelectedBook(null);}}
              onRead={handleRead}
              onLikeToggle={() => selectedEbook && toggleWishlistLike(selectedEbook.ebook_id, selectedEbook.category)}
              onSaveToggle={(id, saved) => console.log(id, saved)}
            />
            <ExchangeBookDetailModal
              isVisible={exhangeBookModalVisible}
              book={selectedExchangeBook}
              onClose={() => setExhangeBookModalVisible(false)}
              onExchange={() => selectedExchangeBook && handleProposeSwap(selectedExchangeBook?.book_id, selectedExchangeBook.category)}
              onLikeToggle={(id, liked) => console.log("Liked swap:", id, liked)}
              onSaveToggle={(id, saved) => console.log("Saved swap:", id, saved)}
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
                      onPress={() => toggleWishlistLike(book.id, book.category)}
                    >
                      <Heart
                        size={16}
                        color={book.liked ? "#721C24" : "#A5A58D"}
                        fill={
                          book.liked ? "#721C24" : "transparent"
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
                      <TouchableOpacity style={styles.actionBtn} onPressOut={() => openBook(book.id, book.category)}>
                        <Text style={styles.actionBtnText}>
                          {book.category === "Ebook"
                            ? "READ"
                            : book.category === "Exchange"
                            ? "SWAP"
                            : "VIEW"}
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
