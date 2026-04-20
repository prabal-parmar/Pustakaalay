import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Heart,
  Star,
  ArrowLeft,
  Search,
  ArrowUpRight,
  Library,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/favoriteBooksStyles";
import { fetchAllLikedBooksData } from "@/api/buyerApis/profile";

if (Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TabType = "Books" | "E-books" | "Exchange";

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("Books");
  const [books, setBooks] = useState<any[]>([]);
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [exchanges, setExchanges] = useState<any[]>([]);

  useEffect(() => {
    const fetchLikedBooksEbooks = async () => {
      const [message, data, completed] = await fetchAllLikedBooksData();

      if (completed) {
        setBooks(data?.books || []);
        setEbooks(data?.ebooks || []);
        setExchanges(data?.exchangeBooks || []);
      } else {
        Alert.alert(message);
      }
    };

    fetchLikedBooksEbooks();
  }, []);

  const currentData = useMemo(() => {
    if (activeTab === "Books") return books;
    if (activeTab === "E-books") return ebooks;
    return exchanges;
  }, [activeTab, books, ebooks, exchanges]);

  const handleUnlike = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    if (activeTab === "Books")
      setBooks((prev) => prev.filter((b) => b.id !== id));
    else if (activeTab === "E-books")
      setEbooks((prev) => prev.filter((b) => b.id !== id));
    else setExchanges((prev) => prev.filter((b) => b.id !== id));
  };

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.gridCard,
        index % 2 !== 0 && { marginTop: 30 },
      ]}
      onPress={() => null}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: item.image || "https://via.placeholder.com/150",
          }}
          style={styles.bookImage}
        />

        {/* ❤️ Like Button */}
        <TouchableOpacity
          style={styles.floatingHeart}
          onPress={() => handleUnlike(item.id)}
        >
          <Heart size={15} color="#F43F5E" fill="#F43F5E" />
        </TouchableOpacity>

        {/* ⭐ Rating */}
        {item.rating !== undefined && item.rating !== null && (
          <View style={styles.floatingRating}>
            <Star size={11} color="#FBBF24" fill="#FBBF24" />
            <Text style={styles.ratingText}>
              {Number(item.rating).toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      {/* 📄 Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.bookName} numberOfLines={1}>
          {item.name || "Untitled"}
        </Text>

        <Text style={styles.authorName} numberOfLines={1}>
          {item.author || "Unknown"}
        </Text>

        <View style={styles.cardFooter}>
          {activeTab === "Books" ? (
            <Text style={styles.priceValue}>
              ₹{item.price || "0"}
            </Text>
          ) : activeTab === "E-books" ? (
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>E-BOOK</Text>
            </View>
          ) : (
            <View style={[styles.tagPill, styles.swapTag]}>
              <Text style={[styles.tagText, styles.swapText]}>
                SWAP
              </Text>
            </View>
          )}

          <View style={styles.arrowBtn}>
            <ArrowUpRight size={14} color="#5c1616" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF0" />

      <View style={styles.bgCircleOne} />
      <View style={styles.bgCircleTwo} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ArrowLeft size={22} color="#5c1616" />
          </TouchableOpacity>

          <View style={styles.centerHeader}>
            <Text style={styles.headerSub}>PUSTAKAALAY</Text>
            <Text style={styles.headerTitle}>Curated Shelf</Text>
          </View>

          <TouchableOpacity style={styles.headerBtn}>
            <Search size={20} color="#5c1616" />
          </TouchableOpacity>
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          {(["Books", "E-books", "Exchange"] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setActiveTab(tab);
              }}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.activeTabBtn,
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab && styles.activeTabLabel,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        <FlatList
          data={currentData}
          keyExtractor={(item) => `${activeTab}-${item.id}`}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listPadding}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Library size={44} color="#D4A373" />
              </View>

              <Text style={styles.emptyTitle}>
                Your shelf is quiet
              </Text>

              <Text style={styles.emptySub}>
                Discover books and save your favorites here.
              </Text>

              <TouchableOpacity
                style={styles.discoverBtn}
                onPress={() => router.replace("/(buyer)/explore")}
              >
                <Text style={styles.discoverText}>
                  Explore Collection
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}