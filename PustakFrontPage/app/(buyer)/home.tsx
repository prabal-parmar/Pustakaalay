import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
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
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/homeStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([101]);
  const [user, setUser] = useState({ name: "Prabal Parmar" });

  const readingNow = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      progress: 65,
      color: "#5c1616",
      lastRead: "2h ago",
    },
  ];

  const trending = [
    {
      id: 101,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.9,
      reads: "12.4k",
    },
    {
      id: 102,
      title: "Circe",
      author: "Madeline Miller",
      rating: 4.8,
      reads: "8.1k",
    },
  ];

  const recommended = [
    {
      id: 201,
      title: "Sapiens: A Brief History",
      author: "Yuval Noah Harari",
      type: "Exchange",
      price: "Free",
      distance: "0.8 km",
      condition: "Good",
    },
    {
      id: 202,
      title: "Atomic Habits",
      author: "James Clear",
      type: "Buy",
      price: "₹250",
      distance: "1.2 km",
      condition: "Like New",
    },
  ];

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.bgBlob1} />
      <View style={styles.bgBlob2} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
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
              <View style={styles.titleAccent} />
              <Text style={styles.sectionTitle}>CONTINUE READING</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {readingNow.map((book) => (
            <TouchableOpacity key={book.id} style={styles.readingCard}>
              <View style={styles.bookIconBox}>
                <BookOpen
                  size={scale(32)}
                  color={book.color}
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
            <TouchableOpacity key={book.id} style={styles.exchangeCard}>
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

          <TouchableOpacity style={styles.ctaBanner}>
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
