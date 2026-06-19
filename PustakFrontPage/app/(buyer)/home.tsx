import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import {
  Search,
  Bell,
  User,
  BookOpen,
  Flame,
  Star,
  ChevronRight,
  TrendingUp,
  Heart,
  Book,
  Plus,
  ArrowUpRight,
  Tag,
  MapPin,
  ScanLine,
  Clock,
  Sparkles,
  Calendar,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/homeStyles";
import { router } from "expo-router";
import {
  fetchBuyBookRequests,
  fetchHotEbooksData,
  fetchLocalExchangeData,
} from "@/api/buyerApis/homeApi";
import {
  ExchangeBookData,
  ExchangeBookDetailModal,
} from "../modals/exchangeBookModal";
import { fetchBookOrEbookDataById } from "@/api/modalApis/buyerModalsApi";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

type TrendingEbooks = {
  id: string;
  title: string;
  author: string;
  rating: number;
  reads: number;
};

type RecommendedBook = {
  id: string;
  title: string;
  author: string;
  type: string;
  price: number;
  distance: string;
  condition: string;
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<string[]>(["101"]);
  const [user, setUser] = useState({ name: "Prabal Parmar" });
  const [viewAll, setViewAll] = useState<Boolean>(false);
  const [exhangeBookModalVisible, setExhangeBookModalVisible] =
    useState<boolean>(false);
  const [selectedExchangeBook, setSelectedExchangeBook] =
    useState<ExchangeBookData | null>(null);
  const [trending, setTrending] = useState<TrendingEbooks[]>([]);
  const [recommended, setRecommended] = useState<RecommendedBook[]>([]);
  const [viewRequests, setViewRequests] = useState<Boolean>(false);

  // buy requests sample data
  const [buyRequests, setBuyRequests] = useState<any>([]);

  useEffect(() => {
    const fetchHotEbooks = async () => {
      const [message, data, completed] = await fetchHotEbooksData();
      if (completed) {
        setTrending(data);
        return null;
      } else {
        return Alert.alert(message);
      }
    };
    const fetchLocalExchange = async () => {
      const [message, data, completed] = await fetchLocalExchangeData();
      if (completed) {
        setRecommended(data);
      } else {
        return Alert.alert(message);
      }
    };
    const fetchBuyBooks = async () => {
      const [message, data, completed] = await fetchBuyBookRequests();
      if(completed) {
        setBuyRequests(data);
      } else {
        return Alert.alert(message);
      }
    };

    fetchHotEbooks();
    fetchLocalExchange();
    fetchBuyBooks();
  }, []);

  const handleProposeSwap = async (id: string, type: string) => {
    // To add API integration for proposing swaps / accepts
    Alert.alert("Action", `Propose swap/handle action for ${id} (${type})`);
  };

  const openBook = async (id: string, type: string) => {
    const [message, data, completed] = await fetchBookOrEbookDataById(id, type);
    if (completed) {
      if (type == "Buy") {
        // Later
      } else if (type == "Ebook") {
        // Later
      } else if (type == "Exchange") {
        setSelectedExchangeBook(data);
        setExhangeBookModalVisible(true);
      } else {
        console.log("Type of book is wrong!");
      }
    } else {
      return Alert.alert(message);
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // sample Continue Reading data (used for the Continue Reading section)
  const [readingNow] = useState([
    {
      id: "r1",
      title: "Deep Work",
      author: "Cal Newport",
      progress: 42,
      lastRead: "2h ago",
      color: "#FBBF24",
    },
    {
      id: "r2",
      title: "The Alchemist",
      author: "Paulo Coelho",
      progress: 12,
      lastRead: "Yesterday",
      color: "#A5A58D",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.bgBlob1} />
      <View style={styles.bgBlob2} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ExchangeBookDetailModal
            isVisible={exhangeBookModalVisible}
            book={selectedExchangeBook}
            onClose={() => setExhangeBookModalVisible(false)}
            onExchange={() =>
              selectedExchangeBook &&
              handleProposeSwap(
                selectedExchangeBook?.book_id,
                selectedExchangeBook.category,
              )
            }
            onLikeToggle={(id, liked) => console.log("Liked swap:", id, liked)}
            onSaveToggle={(id, saved) => console.log("Saved swap:", id, saved)}
          />

          <View style={styles.topRow}>
            <View style={styles.profileContainer}>
              <View style={styles.avatar}>
                <User size={scale(28)} color="#5c1616" strokeWidth={2.5} />
                <View style={styles.onlineDot} />
              </View>
              <View style={styles.welcomeText}>
                <Text style={styles.subLabel}>GOOD MORNING</Text>
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={scale(20)} color="#5c1616" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <Search size={scale(18)} color="#A5A58D" strokeWidth={3} />
            <TextInput
              placeholder="Search library, authors..."
              placeholderTextColor="#A5A58D"
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <ScanLine size={scale(18)} color="#A5A58D" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleGroup}>
              <View style={styles.buyRequestAccent} />
              <Text style={styles.sectionTitle}>Buy Requests</Text>
            </View>
            <TouchableOpacity onPressOut={() => setViewRequests(!viewRequests)}>
              <Text style={styles.viewAll}>
                {viewRequests ? "Hide All" : "View All"}
              </Text>
            </TouchableOpacity>
          </View>

          {buyRequests
            .map((request: any) => (
              <TouchableOpacity
                key={request.id}
                style={styles.requestCard}
                onPress={() =>
                  Alert.alert(
                    "Request",
                    `${request.requestor} wants ${request.book_name}`,
                  )
                }
              >
                <View style={styles.requestHeaderRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.requestBookTitle} numberOfLines={1}>
                      {request.book_name}
                    </Text>
                    {request.author && (
                      <Text style={styles.requestAuthor}>
                        by {request.author}
                      </Text>
                    )}
                  </View>
                  <View style={styles.chevronBox}>
                    <ChevronRight
                      size={scale(18)}
                      color="#5c1616"
                      strokeWidth={3}
                    />
                  </View>
                </View>

                <View style={styles.requestMetaRow}>
                  <View style={styles.metaBadge}>
                    <User size={scale(12)} color="#6B705C" />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {request.requestor}
                    </Text>
                  </View>
                  <View style={styles.metaBadge}>
                    <Calendar size={scale(12)} color="#6B705C" />
                    <Text style={styles.metaText}>{request.date}</Text>
                  </View>
                </View>

                <View style={styles.priceContainer}>
                  <View style={styles.priceRow}>
                    <Tag
                      size={scale(16)}
                      color="#1c5c16"
                      style={{ marginRight: scale(6) }}
                    />
                    <Text style={styles.offerLabel}>Offering:</Text>
                    <Text style={styles.negotiatedPrice}>
                      ${request.negotiated_price.toFixed(2)}
                    </Text>
                  </View>
                  {request.negotiated_price < request.real_price && (
                    <View style={styles.originalPriceBox}>
                      <Text style={styles.originalPriceText}>
                        Listed: ${request.real_price.toFixed(2)}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Continue Reading + other sections unchanged */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleGroup}>
              <View style={styles.titleAccent} />
              <Text style={styles.sectionTitle}>CONTINUE READING</Text>
            </View>
            <TouchableOpacity onPressOut={() => setViewAll(!viewAll)}>
              <Text style={styles.viewAll}>
                {viewAll ? "Hide All" : "View All"}
              </Text>
            </TouchableOpacity>
          </View>

          {readingNow.slice(0, viewAll ? 3 : 1).map((book) => (
            <TouchableOpacity
              key={book.id}
              style={[styles.readingCard, { marginBottom: 4 }]}
            >
              <View style={styles.bookIconBox}>
                <BookOpen
                  size={scale(32)}
                  color={book.color ?? "#FBBF24"}
                  strokeWidth={1.5}
                />
              </View>
              <View style={styles.readingInfo}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bookTitle} numberOfLines={1}>
                      {book.title}
                    </Text>
                    <Text style={styles.authorName}>by {book.author}</Text>
                  </View>
                  <View style={styles.chevronBox}>
                    <ChevronRight
                      size={scale(18)}
                      color="#5c1616"
                      strokeWidth={3}
                    />
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressLabelRow}>
                    <Text style={styles.progressText}>
                      {book.progress}% COMPLETED
                    </Text>
                    <View style={styles.timeRow}>
                      <Clock size={scale(10)} color="#A5A58D" />
                      <Text style={styles.timeText}>{book.lastRead}</Text>
                    </View>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${book.progress}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleGroup}>
              <View
                style={[styles.titleAccent, { backgroundColor: "#FBBF24" }]}
              />
              <Text style={styles.sectionTitle}>VIRAL PICKS</Text>
            </View>
            <View style={styles.hotBadge}>
              <Flame size={scale(12)} color="#5c1616" fill="#5c1616" />
              <Text style={styles.hotText}>HOT</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {trending.map((book) => (
              <View key={book.id} style={styles.trendingCard}>
                <View style={styles.bookCover}>
                  <Book
                    size={scale(48)}
                    color="#FBBF24"
                    style={{ opacity: 0.3 }}
                  />
                  <View style={styles.eBookBadge}>
                    <Text style={styles.eBookText}>E-BOOK</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.heartIcon}
                    onPress={() => toggleWishlist(book.id)}
                  >
                    <Heart
                      size={scale(16)}
                      color="#5c1616"
                      fill={
                        wishlist.includes(book.id) ? "#5c1616" : "transparent"
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.trendingTitle} numberOfLines={1}>
                  {book.title}
                </Text>
                <Text style={styles.authorName}>{book.author}</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Star size={scale(10)} color="#FBBF24" fill="#FBBF24" />
                    <Text style={styles.statText}>{book.rating}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <TrendingUp size={scale(10)} color="#A5A58D" />
                    <Text style={styles.statText}>{book.reads}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.marketplace}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleGroup}>
              <View
                style={[styles.titleAccent, { backgroundColor: "#B07D05" }]}
              />
              <Text style={styles.sectionTitle}>LOCAL EXCHANGE</Text>
            </View>
          </View>

          {recommended.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.exchangeCard}
              onPressOut={() => openBook(book.id, "Exchange")}
            >
              <View style={styles.exchangeIconBox}>
                <BookOpen size={scale(24)} color="#6B705C" />
                <View
                  style={[
                    styles.typeTag,
                    {
                      backgroundColor:
                        book.type === "Exchange" ? "#5c1616" : "#B07D05",
                    },
                  ]}
                >
                  <Text style={styles.typeTagText}>{book.type[0]}</Text>
                </View>
              </View>
              <View style={styles.exchangeInfo}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.authorName}>by {book.author}</Text>
                  </View>
                  <Text
                    style={[
                      styles.priceTag,
                      {
                        color: book.type === "Exchange" ? "#5c1616" : "#1A1A1A",
                      },
                    ]}
                  >
                    {book.price}
                  </Text>
                </View>
                <View style={styles.exchangeFooter}>
                  <View style={styles.tagGroup}>
                    <View style={styles.iconTag}>
                      <MapPin size={scale(10)} color="#6B705C" />
                      <Text style={styles.tagText}>{book.distance}</Text>
                    </View>
                    <View style={styles.iconTag}>
                      <Tag size={scale(10)} color="#6B705C" />
                      <Text style={styles.tagText}>{book.condition}</Text>
                    </View>
                  </View>
                  <ArrowUpRight size={scale(14)} color="#A5A58D" />
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.ctaBanner}
            onPressOut={() => router.push("/buyerPages/buyerBookForm")}
          >
            <View style={styles.ctaSparkle}>
              <Sparkles size={scale(80)} color="#FBBF24" opacity={0.1} />
            </View>
            <Text style={styles.ctaTitle}>Listing books?</Text>
            <Text style={styles.ctaSub}>
              Sell or trade your books in less than 30 seconds.
            </Text>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>POST NOW</Text>
              <View style={styles.plusBox}>
                <Plus size={scale(20)} color="#FFF" strokeWidth={3} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
