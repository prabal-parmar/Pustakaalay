import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import {
  X,
  Edit3,
  Trash2,
  BarChart3,
  Package,
  BookOpen,
  Star,
  Layers,
  RefreshCw,
} from "lucide-react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export interface MyBookData {
  book_id: string;
  name: string;
  author: string;
  image: string;
  description: string;
  price: string | number;
  quantity: number;
  educational_content: boolean;
  category: string;
  condition: string;
  genre?: string | null;
  educational_type?: string | null;
  likes: number;
  saved: number;
  views: number;
  rating: string | number;
}

export interface MyEbookData {
  ebook_id: string;
  name: string;
  author: string;
  image: string;
  description: string;
  category: string;
  genre?: string | null;
  views: number;
  likes: number;
  saved: number;
  rating: number;
}

export interface MyExchangeData {
  book_id: string;
  name: string;
  author: string;
  image: string;
  category: string;
  genre?: string | null;
  condition: string;
  desired_category: string;
  desired_genre: string;
  wanted_condition: string;
  description: string;
  likes: number;
  saved: number;
  views: number;
  rating: number;
}

export const MyBookDetailModal = ({
  isVisible,
  onClose,
  book,
  onEdit,
  onDelete,
}: {
  isVisible: boolean;
  onClose: () => void;
  book: MyBookData | null;
  onEdit: (b: MyBookData) => void;
  onDelete: (b: MyBookData) => void;
}) => {
  if (!book) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, styles.bookSheet]}>
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={22} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.hero}>
              <Image
                source={{ uri: book.image }}
                style={styles.heroImage}
                resizeMode="contain"
              />
              <View style={styles.heroMeta}>
                <Text style={styles.title}>{book.name}</Text>
                <Text style={styles.author}>by {book.author}</Text>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>₹{book.price}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <BarChart3 size={18} color="#64748B" />
                <Text style={styles.statValue}>{book.views}</Text>
                <Text style={styles.statLabel}>VIEWS</Text>
              </View>
              <View style={styles.statItem}>
                <Package size={18} color="#64748B" />
                <Text style={styles.statValue}>{book.quantity}</Text>
                <Text style={styles.statLabel}>STOCK</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={18} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.statValue}>{book.rating}</Text>
                <Text style={styles.statLabel}>RATING</Text>
              </View>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>CONDITION</Text>
                <Text style={styles.gridValue}>{book.condition}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>CATEGORY</Text>
                <Text style={styles.gridValue}>{book.category}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descText}>{book.description}</Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => onDelete(book)}
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => onEdit(book)}
            >
              <Edit3 size={20} color="white" />
              <Text style={styles.editText}>Edit Listing</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const MyEbookDetailModal = ({
  isVisible,
  onClose,
  ebook,
  onEdit,
  onDelete,
}: {
  isVisible: boolean;
  onClose: () => void;
  ebook: MyEbookData | null;
  onEdit: (e: MyEbookData) => void;
  onDelete: (e: MyEbookData) => void;
}) => {
  if (!ebook) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, styles.ebookSheet]}>
          <View style={styles.header}>
            <View
              style={[styles.dragHandle, { backgroundColor: "#5c161633" }]}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={22} color="#5c1616" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.centeredHero}>
              <View style={styles.ebookFrame}>
                <Image
                  source={{ uri: ebook.image }}
                  style={styles.ebookImage}
                />
                <View style={styles.digitalBadge}>
                  <Text style={styles.digitalText}>E-BOOK</Text>
                </View>
              </View>
              <Text style={styles.titleCenter}>{ebook.name}</Text>
              <Text style={styles.authorCenter}>{ebook.author}</Text>
            </View>

            <View style={styles.analyticsRow}>
              <View style={styles.analyticBox}>
                <Text style={styles.aValue}>{ebook.views}</Text>
                <Text style={styles.aLabel}>Total Reads</Text>
              </View>
              <View style={styles.analyticBox}>
                <Text style={styles.aValue}>{ebook.likes}</Text>
                <Text style={styles.aLabel}>Total Likes</Text>
              </View>
            </View>

            <View style={styles.metaPillRow}>
              <View style={styles.pill}>
                <Layers size={14} color="#5c1616" />
                <Text style={styles.pillText}>{ebook.category}</Text>
              </View>
              {ebook.genre && (
                <View style={styles.pill}>
                  <BookOpen size={14} color="#5c1616" />
                  <Text style={styles.pillText}>{ebook.genre}</Text>
                </View>
              )}
            </View>

            <Text style={styles.descTextCenter}>{ebook.description}</Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => onDelete(ebook)}
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editBtn, { backgroundColor: "#5c1616" }]}
              onPress={() => onEdit(ebook)}
            >
              <Edit3 size={20} color="white" />
              <Text style={styles.editText}>Modify E-book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- 3. MY EXCHANGE MODAL ---

export const MyExchangeDetailModal = ({
  isVisible,
  onClose,
  book,
  onEdit,
  onDelete,
}: {
  isVisible: boolean;
  onClose: () => void;
  book: MyExchangeData | null;
  onEdit: (b: MyExchangeData) => void;
  onDelete: (b: MyExchangeData) => void;
}) => {
  if (!book) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, styles.exchangeSheet]}>
          <View style={styles.header}>
            <View
              style={[styles.dragHandle, { backgroundColor: "#0D948833" }]}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={22} color="#0D9488" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.subHeader}>YOUR OFFER</Text>
            <View style={styles.exchangeCard}>
              <Image source={{ uri: book.image }} style={styles.miniCover} />
              <View style={styles.exchangeInfo}>
                <Text style={styles.titleSmall}>{book.name}</Text>
                <Text style={styles.authorSmall}>{book.author}</Text>
                <Text style={styles.conditionSmall}>
                  Condition: {book.condition}
                </Text>
              </View>
            </View>

            <View style={styles.swapIconContainer}>
              <RefreshCw size={24} color="#0D9488" />
            </View>

            <Text style={styles.subHeader}>DESIRED BOOK CRITERIA</Text>
            <View style={styles.desiredBento}>
              <View style={styles.bentoRow}>
                <View style={styles.bentoBox}>
                  <Text style={styles.bLabel}>CATEGORY</Text>
                  <Text style={styles.bValue}>{book.desired_category}</Text>
                </View>
                <View style={styles.bentoBox}>
                  <Text style={styles.bLabel}>GENRE</Text>
                  <Text style={styles.bValue}>{book.desired_genre}</Text>
                </View>
              </View>
              <View style={styles.bentoBox}>
                <Text style={styles.bLabel}>WANTED CONDITION</Text>
                <Text style={styles.bValue}>{book.wanted_condition}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Your Swap Notes</Text>
            <Text style={styles.descText}>{book.description}</Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => onDelete(book)}
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editBtn, { backgroundColor: "#0D9488" }]}
              onPress={() => onEdit(book)}
            >
              <Edit3 size={20} color="white" />
              <Text style={styles.editText}>Edit Swap Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backdrop: { ...StyleSheet.absoluteFillObject },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    maxHeight: SCREEN_HEIGHT * 0.85,
    width: "100%",
    overflow: "hidden",
  },
  header: { paddingVertical: 15, alignItems: "center" },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
  },
  closeBtn: { position: "absolute", right: 20, top: 15, padding: 5 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 160 },

  bookSheet: { backgroundColor: "#F8FAFC" },
  hero: { flexDirection: "row", gap: 20, marginTop: 10 },
  heroImage: {
    width: 100,
    height: 140,
    borderRadius: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  heroMeta: { flex: 1, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "900", color: "#1A1A1A" },
  author: { fontSize: 14, color: "#64748B", marginTop: 4 },
  priceBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 12,
  },
  priceText: { color: "white", fontWeight: "800" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statItem: { alignItems: "center", flex: 1 },
  statValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A1A1A",
    marginTop: 4,
  },
  statLabel: { fontSize: 9, fontWeight: "800", color: "#94A3B8" },
  detailsGrid: { flexDirection: "row", gap: 12, marginTop: 20 },
  gridItem: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 4,
  },
  gridValue: { fontSize: 14, fontWeight: "900", color: "#1A1A1A" },

  ebookSheet: { backgroundColor: "#FFFDF0" },
  centeredHero: { alignItems: "center", marginTop: 10 },
  ebookFrame: {
    width: 140,
    height: 200,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  ebookImage: { width: "100%", height: "100%", borderRadius: 8 },
  digitalBadge: {
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    backgroundColor: "#5c1616",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  digitalText: { color: "white", fontSize: 10, fontWeight: "900" },
  titleCenter: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1A1A1A",
    marginTop: 25,
    textAlign: "center",
  },
  authorCenter: {
    fontSize: 16,
    color: "#5c1616",
    fontWeight: "700",
    marginTop: 5,
  },
  analyticsRow: { flexDirection: "row", gap: 15, marginTop: 25 },
  analyticBox: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3EEE0",
  },
  aValue: { fontSize: 20, fontWeight: "900", color: "#1A1A1A" },
  aLabel: { fontSize: 11, fontWeight: "700", color: "#A5A58D" },

  exchangeSheet: { backgroundColor: "#F0FDFA" },
  subHeader: {
    fontSize: 11,
    fontWeight: "900",
    color: "#0D9488",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  exchangeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    gap: 15,
    borderWidth: 1,
    borderColor: "#CCFBF1",
  },
  miniCover: { width: 50, height: 70, borderRadius: 6 },
  exchangeInfo: { flex: 1, justifyContent: "center" },
  titleSmall: { fontSize: 16, fontWeight: "900", color: "#1A1A1A" },
  authorSmall: { fontSize: 12, color: "#64748B" },
  conditionSmall: {
    fontSize: 11,
    color: "#0D9488",
    fontWeight: "700",
    marginTop: 2,
  },
  swapIconContainer: {
    alignSelf: "center",
    marginVertical: 15,
    backgroundColor: "#CCFBF1",
    padding: 10,
    borderRadius: 50,
  },
  desiredBento: { gap: 10 },
  bentoRow: { flexDirection: "row", gap: 10 },
  bentoBox: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCFBF1",
  },
  bLabel: { fontSize: 9, fontWeight: "800", color: "#94A3B8" },
  bValue: { fontSize: 14, fontWeight: "800", color: "#1A1A1A", marginTop: 2 },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  deleteBtn: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    flex: 1,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  editText: { color: "white", fontWeight: "900", fontSize: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A1A1A",
    marginTop: 25,
    marginBottom: 10,
  },
  descText: { fontSize: 14, color: "#64748B", lineHeight: 20 },
  descTextCenter: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    textAlign: "center",
    marginTop: 20,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F3EEE0",
  },
  pillText: { fontSize: 12, fontWeight: "700", color: "#5c1616" },
  metaPillRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "center",
  },
});
