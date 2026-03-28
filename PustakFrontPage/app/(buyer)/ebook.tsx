import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import {
  FileText,
  Plus,
  Search,
  X,
  Eye,
  Calendar,
  ShieldCheck,
  Info,
  MoreHorizontal,
  Tag,
  TrendingUp,
  ArrowLeftRight,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/ebookStyles";
import { router, useFocusEffect } from "expo-router";
import {
  checkBuyerSeenEbook,
  fetchBuyerEbook,
  fetchBuyerSellBooksData,
} from "@/api/buyerApis/ebookApi";

interface BaseItem {
  id: number;
  title: string;
  author: string;
  postedDate: string;
  genre: string;
}

interface LibraryItem extends BaseItem {
  type: "library";
  reads: string;
  description: string;
}

interface ListingItem extends BaseItem {
  type: "selling";
  price: string;
  status: "ACTIVE" | "PENDING" | "SOLD";
  views: string;
}

interface ExchangeItem extends BaseItem {
  type: "exchange";
  condition: "NEW" | "GOOD" | "FAIR";
  preferredExchange: string;
  location: string;
}

type BookItem = LibraryItem | ListingItem | ExchangeItem;

function isListing(item: BookItem): item is ListingItem {
  return item.type === "selling";
}

function isExchange(item: BookItem): item is ExchangeItem {
  return item.type === "exchange";
}

export default function MyBooksScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "library" | "selling" | "exchange"
  >("library");

  const [myEbooks, setMyEbooks] = useState<LibraryItem[]>([]);

  const [myListings, setMyListings] = useState<ListingItem[]>([]);

  const [myExchanges, setMyExchanges] = useState<ExchangeItem[]>([
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      postedDate: "2 days ago",
      genre: "Fiction",
      type: "exchange",
      condition: "GOOD",
      preferredExchange: "Any Mystery Novel",
      location: "Delhi, India",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      postedDate: "1 week ago",
      genre: "Dystopian",
      type: "exchange",
      condition: "FAIR",
      preferredExchange: "Science Fiction",
      location: "Mumbai, India",
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      postedDate: "3 days ago",
      genre: "Classic",
      type: "exchange",
      condition: "NEW",
      preferredExchange: "Literary Fiction",
      location: "Bangalore, India",
    },
  ]);

  const activeList: BookItem[] =
    activeTab === "library"
      ? myEbooks
      : activeTab === "selling"
        ? myListings
        : myExchanges;

  const filtered = activeList.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClickEbook = async (ebook_id: string) => {
    const [message, data, completed] = await checkBuyerSeenEbook(ebook_id);

    if (completed) {
      ebook_id = data.book_id;
      setMyEbooks(prev => (prev.map(e => String(e.id) === ebook_id ? {...e, reads: e.reads += 1} : {...e})))
      Alert.alert(message);
      return null;
    } else {
      Alert.alert(message);
      return null;
    }
  };

  const handleNavigateToPage = () => {
    if (activeTab == "selling") {
      return router.push("/buyerPages/buyerBookForm");
    } else if (activeTab == "exchange") {
      return router.push('/buyerPages/buyerExchangeBookForm');
    } else {
      return router.push("/buyerPages/buyerEbookForm");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchBuyerEbookData = async () => {
        const [message, ebookData, completed] = await fetchBuyerEbook();
        if (completed) {
          setMyEbooks(ebookData);
          // return Alert.alert(message);
        } else {
          return Alert.alert(message);
        }
      };
      const fetchBooksData = async () => {
        const [message, bookData, completed] = await fetchBuyerSellBooksData();
        if (completed) {
          setMyListings(bookData);
          // return Alert.alert(message);
        } else {
          return Alert.alert(message);
        }
      };
      fetchBooksData();
      fetchBuyerEbookData();
    }, [myListings, myListings]),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <View style={styles.badgeRow}>
              <ShieldCheck size={12} color="#B07D05" />
              <Text style={styles.badgeText}>SECURE PORTFOLIO</Text>
            </View>
            <Text style={styles.title}>My Books</Text>
          </View>
          <Pressable
            style={styles.postBtn}
            onPress={() => handleNavigateToPage()}
          >
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === "library" && styles.activeTab]}
            onPress={() => {
              setActiveTab("library");
              setSearchTerm("");
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "library" && styles.activeTabText,
              ]}
            >
              E-Book ({myEbooks?.length})
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "selling" && styles.activeTab]}
            onPress={() => {
              setActiveTab("selling");
              setSearchTerm("");
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "selling" && styles.activeTabText,
              ]}
            >
              Selling ({myListings?.length})
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "exchange" && styles.activeTab]}
            onPress={() => {
              setActiveTab("exchange");
              setSearchTerm("");
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "exchange" && styles.activeTabText,
              ]}
            >
              Exchange ({myExchanges?.length})
            </Text>
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color="#9A9A8C" />
            <TextInput
              placeholder={
                activeTab === "library"
                  ? "Search your library..."
                  : activeTab === "selling"
                    ? "Search your listings..."
                    : "Search your exchanges..."
              }
              placeholderTextColor="#A5A58D"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
            />
            {searchTerm?.length > 0 && (
              <Pressable onPress={() => setSearchTerm("")}>
                <X size={18} color="#A5A58D" />
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.infoBanner}>
          <Info size={18} color="#B07D05" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              {activeTab === "library"
                ? "Read-Only Protection"
                : activeTab === "selling"
                  ? "Seller Visibility"
                  : "Exchange Community"}
            </Text>
            <Text style={styles.infoText}>
              {activeTab === "library"
                ? "In-app viewing only. Downloads disabled."
                : activeTab === "selling"
                  ? "Your listings are visible to students near you."
                  : "Connect with readers for book exchanges in your area."}
            </Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.countText}>
              {filtered?.length}{" "}
              {activeTab === "library"
                ? "BOOKS OWNED"
                : activeTab === "selling"
                  ? "LISTINGS ACTIVE"
                  : "EXCHANGES AVAILABLE"}
            </Text>
            <View style={styles.divider} />
          </View>

          {filtered.map((item) => {
            const isItemListing = isListing(item);
            const isItemExchange = isExchange(item);

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.coverSection}>
                  <View style={styles.cover}>
                    {activeTab === "library" ? (
                      <FileText size={28} color="#B07D05" strokeWidth={1.5} />
                    ) : activeTab === "selling" ? (
                      <Tag size={28} color="#B07D05" strokeWidth={1.5} />
                    ) : (
                      <TrendingUp size={28} color="#B07D05" strokeWidth={1.5} />
                    )}

                    <View
                      style={[
                        styles.pdfTag,
                        activeTab === "selling" && styles.sellTag,
                        activeTab === "exchange" && styles.exchangeTag,
                      ]}
                    >
                      <Text style={styles.pdfTagText}>
                        {activeTab === "library"
                          ? "PDF"
                          : activeTab === "selling"
                            ? "PHYSICAL"
                            : "EXCHANGE"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.genreTag}>{item.genre}</Text>
                    {isItemListing && (
                      <View
                        style={[
                          styles.statusBadge,
                          item.status === "PENDING" && styles.statusPending,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            item.status === "PENDING" &&
                              styles.statusTextPending,
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>
                    )}
                    {isItemExchange && (
                      <View
                        style={[
                          styles.conditionBadge,
                          item.condition === "NEW" && styles.conditionNew,
                          item.condition === "GOOD" && styles.conditionGood,
                          item.condition === "FAIR" && styles.conditionFair,
                        ]}
                      >
                        <Text
                          style={[
                            styles.conditionText,
                            item.condition === "NEW" && styles.conditionTextNew,
                            item.condition === "GOOD" &&
                              styles.conditionTextGood,
                            item.condition === "FAIR" &&
                              styles.conditionTextFair,
                          ]}
                        >
                          {item.condition}
                        </Text>
                      </View>
                    )}
                    {!isItemListing && !isItemExchange && (
                      <MoreHorizontal size={18} color="#A5A58D" />
                    )}
                  </View>

                  <View>
                    <Text style={styles.bookTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.authorName}>by {item.author}</Text>
                  </View>

                  {!isItemListing && !isItemExchange ? (
                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : isItemListing ? (
                    <View style={styles.priceRow}>
                      <Text style={styles.currency}>₹</Text>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                  ) : (
                    <View style={styles.exchangeInfo}>
                      <Text style={styles.exchangeLabel}>Looking for:</Text>
                      <Text style={styles.exchangeValue} numberOfLines={1}>
                        {item.preferredExchange}
                      </Text>
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                  )}

                  <View style={styles.cardFooter}>
                    <View style={styles.statsGroup}>
                      <View style={styles.statItem}>
                        {!isItemListing && !isItemExchange ? (
                          <Eye size={12} color="#6B705C" />
                        ) : isItemListing ? (
                          <TrendingUp size={12} color="#6B705C" />
                        ) : (
                          <ShieldCheck size={12} color="#6B705C" />
                        )}
                        <Text style={styles.statText}>
                          {!isItemListing && !isItemExchange
                            ? item.reads
                            : isItemListing
                              ? item.views
                              : "Verified"}
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Calendar size={11} color="#6B705C" />
                        <Text style={styles.statText}>{item.postedDate}</Text>
                      </View>
                    </View>

                    <Pressable
                      style={[
                        styles.readBtn,
                        activeTab === "selling" && styles.editBtn,
                        activeTab === "exchange" && styles.exchangeBtn,
                      ]}
                      onPressOut={() => activeTab === "library" ? handleClickEbook(String(item.id)): null}
                    >
                      <Text
                        style={[
                          styles.readBtnText,
                          activeTab === "selling" && styles.editBtnText,
                          activeTab === "exchange" && styles.exchangeBtnText,
                        ]}
                      >
                        {activeTab === "library" ? (
                          <FileText size={14} color="#000000" strokeWidth={3} />
                        ) : activeTab === "selling" ? (
                          "MANAGE"
                        ) : (
                          <ArrowLeftRight
                            size={14}
                            color="#ece9e9"
                            strokeWidth={4}
                          />
                        )}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
