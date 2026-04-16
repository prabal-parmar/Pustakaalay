import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  X,
  Heart,
  Eye,
  Bookmark,
  Star,
  Share2,
  RefreshCw,
  Layers,
  Search,
} from "lucide-react-native";
import { styles } from "@/components/styles/modalStyles/exchangeBookModalStyle"


export interface ExchangeBookData {
  book_id: string;
  name: string;
  author: string;
  image: string;
  category: string;
  genre?: string | null;
  condition: string;
  description: string;
  desired_category: string;
  desired_genre: string;
  wanted_condition: string;
  likes: number;
  saved: number;
  views: number;
  rating: number;
  liked?: boolean;
  saved_status?: boolean;
}

interface ExchangeModalProps {
  isVisible: boolean;
  onClose: () => void;
  book: ExchangeBookData | null;
  onExchange?: (book: ExchangeBookData) => void;
  onLikeToggle?: (id: string, isNowLiked: boolean) => void;
  onSaveToggle?: (id: string, isNowSaved: boolean) => void;
}

export const ExchangeBookDetailModal = ({
  isVisible,
  onClose,
  book,
  onExchange,
  onLikeToggle,
  onSaveToggle,
}: ExchangeModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (book && isVisible) {
      setIsLiked(!!book.liked);
      setIsSaved(!!book.saved_status);
    }
  }, [book, isVisible]);

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
            <View style={styles.swapBadge}>
              <RefreshCw size={14} color="#0D9488" strokeWidth={3} />
              <Text style={styles.swapBadgeText}>EXCHANGE LISTING</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.offeredSection}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.mainInfo}>
                <Text style={styles.bookLabel}>OFFERING</Text>
                <Text style={styles.bookTitle}>{book.name}</Text>
                <Text style={styles.authorText}>by {book.author}</Text>
                <View style={styles.conditionPill}>
                  <Text style={styles.conditionText}>
                    {book.condition.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.interactionRow}>
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={20}
                  color={isLiked ? "#F43F5E" : "#1A1A1A"}
                  fill={isLiked ? "#F43F5E" : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => setIsSaved(!isSaved)}
              >
                <Bookmark
                  size={20}
                  color={isSaved ? "#0D9488" : "#1A1A1A"}
                  fill={isSaved ? "#0D9488" : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Share2 size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.desiredCard}>
              <View style={styles.desiredHeader}>
                <Search size={18} color="#0D9488" />
                <Text style={styles.desiredTitle}>What I'm Looking For</Text>
              </View>

              <View style={styles.bentoGrid}>
                <View style={styles.bentoItem}>
                  <Text style={styles.bentoLabel}>CATEGORY</Text>
                  <Text style={styles.bentoValue}>{book.desired_category}</Text>
                </View>
                <View style={styles.bentoItem}>
                  <Text style={styles.bentoLabel}>GENRE</Text>
                  <Text style={styles.bentoValue}>
                    {book.desired_genre || "Any"}
                  </Text>
                </View>
                <View style={styles.bentoItem}>
                  <Text style={styles.bentoLabel}>WANTED CONDITION</Text>
                  <Text style={styles.bentoValue}>{book.wanted_condition}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsStrip}>
              <View style={styles.statChip}>
                <Eye size={12} color="#64748B" />
                <Text style={styles.statChipText}>{book.views} Views</Text>
              </View>
              <View style={styles.statChip}>
                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.statChipText}>{book.rating}</Text>
              </View>
              <View style={styles.statChip}>
                <Layers size={12} color="#64748B" />
                <Text style={styles.statChipText}>{book.category}</Text>
              </View>
            </View>

            <View style={styles.descriptionArea}>
              <Text style={styles.sectionHeading}>Notes from Owner</Text>
              <Text style={styles.descriptionText}>{book.description}</Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <SafeAreaView edges={["bottom"]} style={styles.footerRow}>
              <View style={styles.offerInfo}>
                <Text style={styles.offerLabel}>Value Match</Text>
                <Text style={styles.offerStatus}>High Likelihood</Text>
              </View>
              <TouchableOpacity
                style={styles.swapBtn}
                onPress={() => onExchange?.(book)}
                activeOpacity={0.8}
              >
                <Text style={styles.swapBtnText}>Propose Swap</Text>
                <RefreshCw size={18} color="white" />
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </Modal>
  );
};