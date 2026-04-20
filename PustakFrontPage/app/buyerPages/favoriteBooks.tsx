import React, { useState, useMemo } from "react";
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

if (Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TabType = "Books" | "E-books" | "Exchange";

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("Books");

  const [books, setBooks] = useState([
    {
      id: "b1",
      name: "The Psychology of Money",
      author: "Morgan Housel",
      price: "299",
      rating: 4.8,
      image: "https://m.media-amazon.com/images/I/71TRV79z6RL.jpg",
    },
    {
      id: "b2",
      name: "Atomic Habits",
      author: "James Clear",
      price: "450",
      rating: 4.9,
      image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      id: "b3",
      name: "Deep Work",
      author: "Cal Newport",
      price: "399",
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/417yjF+E5zL.jpg",
    },
  ]);

  const [ebooks, setEbooks] = useState([
    {
      id: "e1",
      name: "Digital Minimalism",
      author: "Cal Newport",
      rating: 4.6,
      image: "https://m.media-amazon.com/images/I/410mSAnS7vL.jpg",
    },
  ]);
  const [exchanges, setExchanges] = useState([
    {
      id: "ex1",
      name: "The Alchemist",
      author: "Paulo Coelho",
      want: "Sci-Fi",
      image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    },
  ]);

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
    else if (activeTab === "Exchange")
      setExchanges((prev) => prev.filter((b) => b.id !== id));
  };

  const renderItem = ({ item, index }: any) => (
    <View style={[styles.gridCard, index % 2 !== 0 && { marginTop: 35 }]}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.bookImage} />

        <TouchableOpacity
          style={styles.floatingHeart}
          onPress={() => handleUnlike(item.id)}
          activeOpacity={0.8}
        >
          <Heart size={15} color="#F43F5E" fill="#F43F5E" />
        </TouchableOpacity>

        {item.rating && (
          <View style={styles.floatingRating}>
            <Star size={11} color="#FBBF24" fill="#FBBF24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.bookName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.authorName} numberOfLines={1}>
          {item.author}
        </Text>

        <View style={styles.cardFooter}>
          {activeTab === "Books" ? (
            <Text style={styles.priceValue}>₹{item.price}</Text>
          ) : activeTab === "E-books" ? (
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>E-BOOK</Text>
            </View>
          ) : (
            <View style={[styles.tagPill, { backgroundColor: "#0D948815" }]}>
              <Text style={[styles.tagText, { color: "#0D9488" }]}>SWAP</Text>
            </View>
          )}
          <TouchableOpacity style={styles.arrowBtn}>
            <ArrowUpRight size={14} color="#5c1616" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF0" />

      <View style={styles.bgCircleOne} />
      <View style={styles.bgCircleTwo} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerBtn}
          >
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

        <View style={styles.tabContainer}>
          {(["Books", "E-books", "Exchange"] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setActiveTab(tab);
              }}
              style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
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

        <FlatList
          data={currentData}
          keyExtractor={(item) => `${activeTab}-${item.id}`}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.gridRow}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Library size={44} color="#D4A373" strokeWidth={1.5} />
              </View>
              <Text style={styles.emptyTitle}>Your shelf is quiet</Text>
              <Text style={styles.emptySub}>
                Discover our vast collection and save your favorites here.
              </Text>
              <TouchableOpacity
                style={styles.discoverBtn}
                onPress={() => router.replace("/")}
                activeOpacity={0.8}
              >
                <Text style={styles.discoverText}>Explore Collection</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}

