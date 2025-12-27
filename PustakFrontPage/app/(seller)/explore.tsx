import React, { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import {
  Search,
  BookOpen,
  ArrowUpRight,
  MapPin,
  X,
  Filter,
  Heart,
  UserCircle2,
  MessageSquare,
  Tag,
  ArrowUp,
  Sparkle,
} from "lucide-react-native";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  seller: string;
  condition: string;
  genre: string;
}
import { styles } from "@/components/styles/sellerStyles/exploreStyles";

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [wishlist, setWishlist] = useState<number[]>([301, 305]);
  const scrollViewRef = useRef<ScrollView>(null);

  const marketplaceInventory: Book[] = [
    {
      id: 301,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: "₹180",
      seller: "bookworm_ali",
      condition: "New",
      genre: "Thriller",
    },
    {
      id: 302,
      title: "Deep Work",
      author: "Cal Newport",
      price: "₹210",
      seller: "productivity_pro",
      condition: "Like New",
      genre: "Self-Help",
    },
    {
      id: 303,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: "₹320",
      seller: "history_buff",
      condition: "Used",
      genre: "History",
    },
    {
      id: 304,
      title: "Atomic Habits",
      author: "James Clear",
      price: "₹250",
      seller: "habit_tracker",
      condition: "New",
      genre: "Productivity",
    },
    {
      id: 305,
      title: "Man's Search for Meaning",
      author: "Viktor Frankl",
      price: "₹150",
      seller: "philosophy_hub",
      condition: "Good",
      genre: "Philosophy",
    },
    {
      id: 306,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: "₹140",
      seller: "dreamer_reads",
      condition: "Vintage",
      genre: "Fiction",
    },
  ];

  const filteredBooks = useMemo(
    () =>
      marketplaceInventory.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.genre.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF9F1" />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.kicker}>INVENTORY</Text>
            <Text style={styles.mainTitle}>Explore Books</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
            <Filter size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Search size={18} color="#A5A58D" />
          <TextInput
            style={styles.input}
            placeholder="Search title, genre..."
            placeholderTextColor="#A5A58D"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm("")}>
              <X size={18} color="#A5A58D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaRow}>
          <View style={styles.countContainer}>
            <View style={styles.accentLine} />
            <Text style={styles.countText}>
              {filteredBooks.length} AVAILABLE ITEMS
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#6B705C" />
            <Text style={styles.locationText}>NEARBY</Text>
          </View>
        </View>

        {filteredBooks.length > 0 ? (
          <View style={styles.bookGrid}>
            {filteredBooks.map((book) => (
              <View key={book.id} style={styles.bookCard}>
                <View style={styles.imagePlaceholder}>
                  <BookOpen
                    size={40}
                    color="#D4AF37"
                    style={{ opacity: 0.2 }}
                  />

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {book.condition.toUpperCase()}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => toggleWishlist(book.id)}
                    style={styles.heartButton}
                  >
                    <Heart
                      size={16}
                      color={wishlist.includes(book.id) ? "#721C24" : "#A5A58D"}
                      fill={
                        wishlist.includes(book.id) ? "#721C24" : "transparent"
                      }
                    />
                  </TouchableOpacity>

                  <View style={styles.externalLink}>
                    <ArrowUpRight size={14} color="#1A1A1A" strokeWidth={3} />
                  </View>
                </View>

                <View style={styles.contentPadding}>
                  <View style={styles.genreTag}>
                    <Tag size={8} color="#D4AF37" />
                    <Text style={styles.genreText}>
                      {book.genre.toUpperCase()}
                    </Text>
                  </View>

                  <Text style={styles.bookName} numberOfLines={1}>
                    {book.title}
                  </Text>

                  <View style={styles.sellerRow}>
                    <UserCircle2 size={12} color="#6B705C" />
                    <Text style={styles.sellerHandle}>@{book.seller}</Text>
                  </View>

                  <View style={styles.footerRow}>
                    <Text style={styles.priceTag}>{book.price}</Text>
                    <TouchableOpacity style={styles.buyButton}>
                      <Text style={styles.buyText}>BUY</Text>
                      <MessageSquare size={10} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Search size={48} color="#D4AF37" style={{ opacity: 0.2 }} />
            <Text style={styles.emptyText}>No matching finds</Text>
            <TouchableOpacity
              onPress={() => setSearchTerm("")}
              style={styles.resetBtn}
            >
              <Text style={styles.resetText}>RESET SEARCH</Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredBooks.length > 0 && (
          <View style={styles.footer}>
            <Sparkle size={20} color="#D4AF37" style={{ marginBottom: 12 }} />
            <Text style={styles.footerLabel}>END OF COLLECTION</Text>
            <TouchableOpacity onPress={scrollToTop} style={styles.topBtn}>
              <Text style={styles.topBtnText}>BACK TO TOP</Text>
              <ArrowUp size={14} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
