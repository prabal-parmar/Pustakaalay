import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  X,
  Edit3,
  Trash2,
  Heart,
  Eye,
  Bookmark,
  Star,
  Layout,
  BookOpen,
  GraduationCap,
} from "lucide-react-native";
import { styles } from "@/components/styles/modalStyles/sellerMybookStyle";


export interface SellerBookData {
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

interface SellerBookDetailProps {
  isVisible: boolean;
  onClose: () => void;
  book: SellerBookData | null;
  onEdit: (book: SellerBookData) => void;
  onDelete: (book: SellerBookData) => void;
}

export const SellerBookDetailModal: React.FC<SellerBookDetailProps> = ({
  isVisible,
  onClose,
  book,
  onEdit,
  onDelete,
}) => {
  if (!book) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#1A1A1A" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.heroSection}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.mainDetails}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.name}
                </Text>
                <Text style={styles.authorText}>by {book.author}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>₹{book.price}</Text>
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>Qty: {book.quantity}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Heart size={16} color="#EF4444" fill="#EF4444" />
                <Text style={styles.statValue}>{book.likes}</Text>
                <Text style={styles.statLabel}>LIKES</Text>
              </View>
              <View style={styles.statBox}>
                <Eye size={16} color="#3B82F6" />
                <Text style={styles.statValue}>{book.views}</Text>
                <Text style={styles.statLabel}>VIEWS</Text>
              </View>
              <View style={styles.statBox}>
                <Bookmark size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.statValue}>{book.saved}</Text>
                <Text style={styles.statLabel}>SAVED</Text>
              </View>
              <View style={styles.statBox}>
                <Star size={16} color="#10B981" fill="#10B981" />
                <Text style={styles.statValue}>{book.rating}</Text>
                <Text style={styles.statLabel}>RATING</Text>
              </View>
            </View>

            <View style={styles.metaContainer}>
              <View style={styles.metaPill}>
                <Layout size={14} color="#5c1616" />
                <Text style={styles.metaText}>{book.category}</Text>
              </View>

              <View style={styles.metaPill}>
                <Text style={styles.metaLabel}>CONDITION: </Text>
                <Text style={styles.metaText}>{book.condition}</Text>
              </View>

              {book.genre && (
                <View style={[styles.metaPill, { backgroundColor: "#E0F2FE" }]}>
                  <BookOpen size={14} color="#0369A1" />
                  <Text style={[styles.metaText, { color: "#0369A1" }]}>
                    {book.genre}
                  </Text>
                </View>
              )}

              {book.educational_content && (
                <View style={[styles.metaPill, { backgroundColor: "#F0FDF4" }]}>
                  <GraduationCap size={14} color="#166534" />
                  <Text style={[styles.metaText, { color: "#166534" }]}>
                    {book.educational_type || "Educational"}
                  </Text>
                </View>
              )}
            </View>

            {book.description !== "None" && (
              <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>Listing Description</Text>
                <Text style={styles.descriptionText}>{book.description}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <SafeAreaView edges={["bottom"]} style={styles.footerContent}>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => onDelete(book)}
                activeOpacity={0.7}
              >
                <Trash2 size={22} color="#EF4444" strokeWidth={2} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => onEdit(book)}
                activeOpacity={0.8}
              >
                <Edit3 size={18} color="white" strokeWidth={2.5} />
                <Text style={styles.editBtnText}>Edit Listing</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </Modal>
  );
};
