import React, { useState, useEffect } from "react";
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
  Heart,
  Eye,
  Bookmark,
  Star,
  Share2,
  BookMarked,
  Layout,
} from "lucide-react-native";
import { styles } from "@/components/styles/modalStyles/ebookModalStyle";

export interface EbookData {
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
  liked?: boolean;
  saved_status?: boolean;
}

interface EbookModalProps {
  isVisible: boolean;
  onClose: () => void;
  ebook: EbookData | null;
  onRead?: (ebook: EbookData) => void;
  onLikeToggle?: (id: string, isNowLiked: boolean) => void;
  onSaveToggle?: (id: string, isNowSaved: boolean) => void;
}

export const EbookDetailModal = ({
  isVisible,
  onClose,
  ebook,
  onRead,
  onLikeToggle,
  onSaveToggle,
}: EbookModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (ebook && isVisible) {
      setIsLiked(!!ebook.liked);
      setIsSaved(!!ebook.saved_status);
    }
  }, [ebook, isVisible]);

  if (!ebook) return null;

  const handleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    onLikeToggle?.(ebook.ebook_id, newState);
  };

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    onSaveToggle?.(ebook.ebook_id, newState);
  };

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
            <View style={styles.headerActionRow}>
              <View style={styles.ratingBadge}>
                <Star size={14} color="#D97706" fill="#FBBF24" />
                <Text style={styles.ratingText}>{ebook.rating.toFixed(1)}</Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <X size={22} color="#1E293B" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            <View style={styles.imageSection}>
              <View style={styles.imageShadowBox}>
                <Image
                  source={{ uri: ebook.image }}
                  style={styles.bookImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.bentoActionContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.bentoActionBtn, isLiked && styles.activeLike]}
                  onPress={handleLike}
                >
                  <Heart
                    size={18}
                    color={isLiked ? "#F43F5E" : "#64748B"}
                    fill={isLiked ? "#F43F5E" : "transparent"}
                  />
                  <Text
                    style={[
                      styles.bentoActionText,
                      isLiked && { color: "#F43F5E" },
                    ]}
                  >
                    {isLiked ? "Liked" : "Like"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.bentoActionBtn, isSaved && styles.activeSave]}
                  onPress={handleSave}
                >
                  <Bookmark
                    size={18}
                    color={isSaved ? "#D97706" : "#64748B"}
                    fill={isSaved ? "#D97706" : "transparent"}
                  />
                  <Text
                    style={[
                      styles.bentoActionText,
                      isSaved && { color: "#D97706" },
                    ]}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.bentoActionBtn}
                >
                  <Share2 size={18} color="#64748B" />
                  <Text style={styles.bentoActionText}>Share</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.titleRow}>
                <Text style={styles.bookTitle}>{ebook.name}</Text>
                <Text style={styles.authorText}>
                  by <Text style={styles.authorName}>{ebook.author}</Text>
                </Text>
              </View>

              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {ebook.category.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.dotSeparator} />
                <View style={styles.onlineBadge}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Instant Access</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#FFF1F2" }]}
                  >
                    <Heart
                      size={16}
                      color="#F43F5E"
                      fill={isLiked ? "#F43F5E" : "transparent"}
                    />
                  </View>
                  <Text style={styles.statValue}>
                    {isLiked && !ebook.liked
                      ? ebook.likes + 1
                      : !isLiked && ebook.liked
                        ? ebook.likes - 1
                        : ebook.likes}
                  </Text>
                  <Text style={styles.statLabel}>LIKES</Text>
                </View>

                <View style={styles.statBox}>
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#F0F9FF" }]}
                  >
                    <Eye size={16} color="#0EA5E9" />
                  </View>
                  <Text style={styles.statValue}>{ebook.views}</Text>
                  <Text style={styles.statLabel}>VIEWS</Text>
                </View>

                <View style={styles.statBox}>
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#FFFBEB" }]}
                  >
                    <Bookmark
                      size={16}
                      color="#D97706"
                      fill={isSaved ? "#D97706" : "transparent"}
                    />
                  </View>
                  <Text style={styles.statValue}>
                    {isSaved && !ebook.saved_status
                      ? ebook.saved + 1
                      : !isSaved && ebook.saved_status
                        ? ebook.saved - 1
                        : ebook.saved}
                  </Text>
                  <Text style={styles.statLabel}>SAVED</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.descriptionSection}>
                <View style={styles.sectionHeader}>
                  <Layout size={18} color="#1A1A1A" />
                  <Text style={styles.sectionHeading}>About this E-book</Text>
                </View>
                <Text style={styles.descriptionText}>
                  {ebook.description === "No Description"
                    ? "This book doesn't have a summary yet."
                    : ebook.description}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footerContainer}>
            <SafeAreaView edges={["bottom"]} style={styles.footerInner}>
              <View style={styles.formatSection}>
                <Text style={styles.formatLabel}>TYPE</Text>
                <Text style={styles.formatValue}>Digital</Text>
              </View>
              <TouchableOpacity
                style={styles.readButton}
                onPress={() => onRead?.(ebook)}
                activeOpacity={0.8}
              >
                <Text style={styles.readButtonText}>Start Reading</Text>
                <View style={styles.readIconCircle}>
                  <BookMarked size={18} color="#5c1616" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </Modal>
  );
};