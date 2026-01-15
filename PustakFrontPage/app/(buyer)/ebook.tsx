import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import {
  FileText,
  Plus,
  Search,
  X,
  Eye,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Info,
  MoreHorizontal,
  Tag,
  TrendingUp,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/ebookStyles";
import { router } from "expo-router";

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

type BookItem = LibraryItem | ListingItem;

const myEbooks: LibraryItem[] = [
  {
    id: 1,
    type: "library",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    postedDate: "Oct 12, 2024",
    reads: "1.2k",
    genre: "THRILLER",
    description:
      "A shocking psychological thriller of a woman's act of violence.",
  },
  {
    id: 2,
    type: "library",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    postedDate: "Sept 28, 2024",
    reads: "3.1k",
    genre: "SELF-HELP",
    description:
      "A landmark bestseller that has helped millions achieve success.",
  },
];

const myListings: ListingItem[] = [
  {
    id: 101,
    type: "selling",
    title: "Concept of Physics - Vol 1",
    author: "H.C. Verma",
    price: "450",
    status: "ACTIVE",
    views: "45",
    postedDate: "Jan 10, 2025",
    genre: "EDUCATION",
  },
  {
    id: 102,
    type: "selling",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: "200",
    status: "PENDING",
    views: "120",
    postedDate: "Jan 05, 2025",
    genre: "FINANCE",
  },
];

function isListing(item: BookItem): item is ListingItem {
  return item.type === "selling";
}

export default function MyBooksScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"library" | "selling">("library");

  const activeList: BookItem[] =
    activeTab === "library" ? myEbooks : myListings;

  const filtered = activeList.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigateToPage = () => {
    if (activeTab == "selling") {
      return router.push("/buyerPages/buyerBookForm");
    } else {
      return null;
    }
  };

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
              E-Book ({myEbooks.length})
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
              Selling ({myListings.length})
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
                  : "Search your listings..."
              }
              placeholderTextColor="#A5A58D"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.searchInput}
            />
            {searchTerm.length > 0 && (
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
                : "Seller Visibility"}
            </Text>
            <Text style={styles.infoText}>
              {activeTab === "library"
                ? "In-app viewing only. Downloads disabled."
                : "Your listings are visible to students near you."}
            </Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.countText}>
              {filtered.length}{" "}
              {activeTab === "library" ? "BOOKS OWNED" : "LISTINGS ACTIVE"}
            </Text>
            <View style={styles.divider} />
          </View>

          {filtered.map((item) => {
            const isItemListing = isListing(item);

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.coverSection}>
                  <View style={styles.cover}>
                    {activeTab === "library" ? (
                      <FileText size={28} color="#B07D05" strokeWidth={1.5} />
                    ) : (
                      <Tag size={28} color="#B07D05" strokeWidth={1.5} />
                    )}

                    <View
                      style={[
                        styles.pdfTag,
                        activeTab === "selling" && styles.sellTag,
                      ]}
                    >
                      <Text style={styles.pdfTagText}>
                        {activeTab === "library" ? "PDF" : "PHYSICAL"}
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
                    {!isItemListing && (
                      <MoreHorizontal size={18} color="#A5A58D" />
                    )}
                  </View>

                  <View>
                    <Text style={styles.bookTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.authorName}>by {item.author}</Text>
                  </View>

                  {!isItemListing ? (
                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : (
                    <View style={styles.priceRow}>
                      <Text style={styles.currency}>₹</Text>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                  )}

                  <View style={styles.cardFooter}>
                    <View style={styles.statsGroup}>
                      <View style={styles.statItem}>
                        {!isItemListing ? (
                          <Eye size={12} color="#6B705C" />
                        ) : (
                          <TrendingUp size={12} color="#6B705C" />
                        )}
                        <Text style={styles.statText}>
                          {!isItemListing ? item.reads : item.views}
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
                      ]}
                    >
                      <Text
                        style={[
                          styles.readBtnText,
                          activeTab === "selling" && styles.editBtnText,
                        ]}
                      >
                        {activeTab === "library" ? "READ" : "MANAGE"}
                      </Text>
                      <ChevronRight
                        size={12}
                        color={activeTab === "library" ? "#1A1A1A" : "#FFF"}
                        strokeWidth={4}
                      />
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
