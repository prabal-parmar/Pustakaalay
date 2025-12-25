import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import {
  Search,
  Bell,
  User,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  Heart,
  ArrowRight,
  Tag,
  MapPin,
  ScanLine,
  X,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/homeStyles";

interface ReadingBook {
  id: number;
  title: string;
  author: string;
  progress: number;
  lastRead: string;
  description: string;
  color: string;
}

interface TrendingBook {
  id: number;
  title: string;
  author: string;
  rating: number;
  reads: string;
  genre: string;
  description: string;
}

interface MarketBook {
  id: number;
  title: string;
  author: string;
  type: "Buy" | "Exchange";
  price: string;
  distance: string;
  condition: string;
}

type Book = ReadingBook | TrendingBook;


const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<number[]>([101]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [user, setUser] = useState({name: "Prabal Parmar"})
  const readingNow: ReadingBook[] = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      progress: 65,
      color: "#5c1616",
      lastRead: "2h ago",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever.",
    },
  ];

  const trending: TrendingBook[] = [
    {
      id: 101,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.9,
      reads: "12.4k",
      genre: "Sci-Fi",
      description:
        "Ryland Grace is the sole survivor on a desperate, last-chance mission.",
    },
    {
      id: 102,
      title: "Circe",
      author: "Madeline Miller",
      rating: 4.8,
      reads: "8.1k",
      genre: "Mythology",
      description:
        "In the house of Helios, god of the sun, a daughter is born.",
    },
  ];

  const recommended: MarketBook[] = [
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

  const toggleWishlist = (id: number): void => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredTrending = useMemo(
    () =>
      trending.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const filteredRecommended = useMemo(
    () =>
      recommended.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.profile}>
              <View style={styles.avatar}>
                <User size={26} color="#5c1616" />
              </View>
              <View>
                <Text style={styles.greeting}>Good Morning</Text>
                <Text style={styles.name}>{user.name}</Text>
              </View>
            </View>

            <Pressable onPress={() => setNotifOpen(!notifOpen)}>
              <Bell size={22} color="#5c1616" />
            </Pressable>
          </View>

          <View style={styles.searchBox}>
            <Search size={18} color="#999" />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Titles, authors, or scans..."
              style={styles.input}
            />
            <ScanLine size={18} color="#aaa" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Continue Reading</Text>

        {readingNow.map((book) => (
          <Pressable
            key={book.id}
            style={styles.readingCard}
            onPress={() => setSelectedBook(book)}
          >
            <BookOpen size={40} color={book.color} />
            <View style={{ flex: 1 }}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.author}>by {book.author}</Text>

              <View style={styles.progressRow}>
                <Clock size={12} color="#999" />
                <Text style={styles.smallText}>{book.lastRead}</Text>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${book.progress}%` },
                  ]}
                />
              </View>
            </View>
            <ArrowRight size={20} color="#5c1616" />
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Viral Picks</Text>

        <View style={styles.grid}>
          {filteredTrending.map((book) => (
            <Pressable
              key={book.id}
              style={styles.trendingCard}
              onPress={() => setSelectedBook(book)}
            >
              <Pressable
                style={styles.heart}
                onPress={() => toggleWishlist(book.id)}
              >
                <Heart
                  size={16}
                  color={wishlist.includes(book.id) ? "#5c1616" : "#999"}
                  fill={wishlist.includes(book.id) ? "#5c1616" : "none"}
                />
              </Pressable>

              <BookOpen size={38} color="#FBBF24" />
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>

              <View style={styles.ratingRow}>
                <Star size={14} color="#FBBF24" />
                <Text>{book.rating}</Text>
                <TrendingUp size={14} color="#B07D05" />
                <Text>{book.reads}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Marketplace</Text>

        {filteredRecommended.map((book) => (
          <View key={book.id} style={styles.marketCard}>
            <BookOpen size={28} color="#666" />
            <View style={{ flex: 1 }}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>

              <View style={styles.marketRow}>
                <MapPin size={12} color="#999" />
                <Text style={styles.smallText}>{book.distance}</Text>
                <Tag size={12} color="#999" />
                <Text style={styles.smallText}>{book.condition}</Text>
              </View>
            </View>
            <Text style={styles.price}>{book.price}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={!!selectedBook} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Pressable
              style={styles.close}
              onPress={() => setSelectedBook(null)}
            >
              <X size={22} />
            </Pressable>

            <BookOpen size={60} color="#FBBF24" />
            <Text style={styles.modalTitle}>{selectedBook?.title}</Text>
            <Text style={styles.modalAuthor}>
              by {selectedBook?.author}
            </Text>
            <Text style={styles.modalDesc}>
              {selectedBook?.description}
            </Text>

            <Pressable style={styles.startBtn}>
              <Text style={styles.startText}>Start Reading</Text>
              <ArrowRight size={20} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;