import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Search,
  Bell,
  User,
  Sparkles,
  ArrowRight,
  Book,
  BookOpen,
  Plus,
  ArrowUpRight,
  MapPin,
  Activity,
  Star,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  Handshake,
  MessageSquare,
  ScanLine,
  Wallet,
  LayoutGrid,
} from "lucide-react-native";
import { styles } from "@/components/styles/sellerStyles/homeStyles";

const { width } = Dimensions.get("window");

const s = (size: number) => {
  const scale = width / 375;
  return Math.min(size * scale, size * 1.15);
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({ name: "Prabal Parmar" });
  const pendingRequests = [
    {
      id: 1,
      title: "The Alchemist",
      requester: "rahul_07",
      offer: "₹150",
      time: "10m ago",
    },
    {
      id: 2,
      title: "Atomic Habits",
      requester: "priya_reads",
      offer: "₹220",
      time: "2h ago",
    },
    {
      id: 3,
      title: "Psychology of Money",
      requester: "amit_k",
      offer: "₹200",
      time: "4h ago",
    },
  ];

  const marketplaceBooks = [
    {
      id: 301,
      title: "The Silent Patient",
      seller: "bookworm_ali",
      price: "₹180",
      condition: "New",
    },
    {
      id: 302,
      title: "Deep Work",
      seller: "productivity_pro",
      price: "₹210",
      condition: "Like New",
    },
  ];

  const myListings = [
    { id: 201, title: "The Great Gatsby", price: "₹350", views: 42 },
    { id: 202, title: "Brief Answers", price: "₹400", views: 18 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.meshContainer}>
        <View style={styles.blob1} />
        <View style={styles.blob2} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <User size={s(22)} color="#D4AF37" strokeWidth={2.5} />
              </View>
              <View style={styles.onlineBadge}>
                <CheckCircle2 size={s(8)} color="white" strokeWidth={4} />
              </View>
            </View>
            <View style={{ marginLeft: s(10) }}>
              <Text style={styles.userRole}>Collector</Text>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={s(20)} color="#1A1A1A" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletDecor}>
            <Wallet size={s(100)} color="white" opacity={0.08} />
          </View>
          <View style={styles.walletInfo}>
            <View>
              <Text style={styles.walletLabel}>BOOKS AMOUNT TRADED</Text>
              <Text style={styles.walletAmount}>₹1,240.00</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.ratingBox}>
                <Star size={s(10)} color="#D4AF37" fill="#D4AF37" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
              <Text style={styles.ratingSub}>YOUR RATING</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Search size={s(16)} color="#A5A58D" strokeWidth={2.5} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search library..."
            placeholderTextColor="rgba(165,165,141,0.5)"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <View style={styles.scanBtn}>
            <ScanLine size={s(14)} color="#A5A58D" />
          </View>
        </View>

        <View style={styles.actionHub}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBoxDark}>
              <Plus size={s(24)} color="#D4AF37" strokeWidth={3} />
            </View>
            <Text style={styles.actionTitle}>Add Book</Text>
            <Text style={styles.actionHint}>INVENTORY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBoxLight}>
              <Activity size={s(22)} color="#1A1A1A" strokeWidth={2.5} />
            </View>
            <Text style={styles.actionTitle}>Analytics</Text>
            <Text style={styles.actionHint}>TRENDS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.rowAlignCenter}>
            <View style={[styles.indicator, { backgroundColor: "#721C24" }]} />
            <Text style={styles.sectionTitle}>BUY REQUESTS</Text>
          </View>
          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>{pendingRequests.length} TOTAL</Text>
          </View>
        </View>

        {pendingRequests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.accentBar} />
            <View style={styles.requestMain}>
              <View style={styles.rowAlignCenter}>
                <View style={styles.requestIcon}>
                  <Handshake size={s(24)} color="#721C24" />
                </View>
                <View style={{ flex: 1, marginLeft: s(12) }}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {req.title}
                  </Text>
                  <Text style={styles.subText}>From @{req.requester}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.priceHighlight}>{req.offer}</Text>
                  <Text style={styles.timeText}>{req.time}</Text>
                </View>
              </View>
              <View style={styles.requestButtons}>
                <TouchableOpacity style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>ACCEPT OFFER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <MessageSquare size={s(18)} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.dashedBtn}>
          <LayoutGrid size={s(14)} color="#A5A58D" />
          <Text style={styles.dashedBtnText}>SHOW ALL REQUESTS</Text>
          <ChevronRight size={s(14)} color="#A5A58D" />
        </TouchableOpacity>

        <View style={styles.radarContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.rowAlignCenter}>
              <View
                style={[styles.indicator, { backgroundColor: "#D4AF37" }]}
              />
              <Text style={styles.sectionTitle}>YOU CAN BUY</Text>
            </View>
            <TouchableOpacity style={styles.miniBtn}>
              <Text style={styles.miniBtnText}>FIND</Text>
            </TouchableOpacity>
          </View>

          {marketplaceBooks.map((book) => (
            <View key={book.id} style={styles.radarCard}>
              <View style={styles.bookThumb}>
                <BookOpen size={s(28)} color="#D4AF37" />
                <View style={styles.premiumLabel}>
                  <Text style={styles.premiumText}>NEW</Text>
                </View>
              </View>
              <View style={{ flex: 1, marginLeft: s(12) }}>
                <View style={styles.rowSpaceBetween}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {book.title}
                    </Text>
                    <Text style={styles.subText}>by {book.seller}</Text>
                  </View>
                  <Text style={styles.priceDark}>{book.price}</Text>
                </View>
                <View style={[styles.rowSpaceBetween, { marginTop: s(10) }]}>
                  <View style={styles.rowAlignCenter}>
                    <MapPin size={s(12)} color="#6B705C" />
                    <Text style={styles.locText}>1.2 KM AWAY</Text>
                  </View>
                  <TouchableOpacity style={styles.buyBtn}>
                    <ShoppingBag size={s(12)} color="white" />
                    <Text style={styles.buyBtnText}>BUY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.inventoryContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.rowAlignCenter}>
              <View
                style={[styles.indicator, { backgroundColor: "#1A1A1A" }]}
              />
              <Text style={styles.sectionTitle}>MY INVENTORY</Text>
            </View>
            <TouchableOpacity style={styles.miniBtnGray}>
              <Text style={styles.miniBtnTextGray}>MANAGE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inventoryGrid}>
            {myListings.map((item) => (
              <View key={item.id} style={styles.gridCard}>
                <View style={styles.gridImgPlaceholder}>
                  <Book size={s(32)} color="#D4AF37" />
                  <View style={styles.gridIconFloating}>
                    <ArrowUpRight
                      size={s(14)}
                      color="#1A1A1A"
                      strokeWidth={3}
                    />
                  </View>
                </View>
                <Text style={styles.gridTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.rowSpaceBetween}>
                  <Text style={styles.gridPrice}>{item.price}</Text>
                  <View style={styles.rowAlignCenter}>
                    <Activity size={s(10)} color="#A5A58D" />
                    <Text style={styles.gridStats}>{item.views}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.growthCard}>
          <View style={styles.sparkle}>
            <Sparkles size={s(120)} color="#D4AF37" opacity={0.15} />
          </View>
          <Text style={styles.growthLabel}>SCALE BUSINESS</Text>
          <Text style={styles.growthTitle}>Trade books near you</Text>
          <View style={styles.hubBtn}>
            <Text style={styles.hubBtnText}>EXPLORE</Text>
            <View style={styles.hubArrow}>
              <ArrowRight size={s(18)} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
