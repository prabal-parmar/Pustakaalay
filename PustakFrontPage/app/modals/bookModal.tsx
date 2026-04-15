import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  X,
  Heart,
  Eye,
  Bookmark,
  BookOpen,
  ShoppingBag,
  Star,
  Share2,
} from 'lucide-react-native';
import { styles } from '@/components/styles/modalStyles/bookDatamodalStyle';

export interface BookData {
  id: string;
  name: string;
  author: string;
  image: string;
  description: string;
  price: string | number;
  category: string;
  genre?: string;
  isEducational: boolean;
  totalLikes: number;
  totalViews: number;
  savedByCount: number;
  rating: number;
  liked?: boolean; 
  saved?: boolean;
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  book: BookData | null;
  onBuy?: (book: BookData) => void;
  onLikeToggle?: (id: string, isNowLiked: boolean) => void;
  onSaveToggle?: (id: string, isNowSaved: boolean) => void;
}

export const BookDetailModal = ({ 
  isVisible, 
  onClose, 
  book, 
  onBuy,
  onLikeToggle,
  onSaveToggle 
}: ModalProps) => {

  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isSavedLocal, setIsSavedLocal] = useState(false);

  useEffect(() => {
    if (book) {
      setIsLikedLocal(!!book.liked);
      setIsSavedLocal(!!book.saved);
    }
  }, [book, isVisible]);

  if (!book) return null;

  const handleLike = () => {
    const newState = !isLikedLocal;
    setIsLikedLocal(newState);
    onLikeToggle?.(book.id, newState);
  };

  const handleSave = () => {
    const newState = !isSavedLocal;
    setIsSavedLocal(newState);
    onSaveToggle?.(book.id, newState);
  };

  const renderBadge = () => {
    if (book.isEducational) {
      return (
        <View style={[styles.badge, styles.educationalBadge]}>
          <BookOpen size={12} color="#2563EB" strokeWidth={3} />
          <Text style={styles.educationalBadgeText}>EDUCATIONAL</Text>
        </View>
      );
    }
    const label = book.category === 'Novel' && book.genre ? `${book.genre}` : book.category;
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{label.toUpperCase()}</Text>
      </View>
    );
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
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <View style={styles.headerActionRow}>
                <View style={styles.ratingBadge}>
                    <Star size={14} color="#FBBF24" fill="#FBBF24" />
                    <Text style={styles.ratingText}>{book.rating}</Text>
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
                    <Image source={{ uri: book.image }} style={styles.bookImage} resizeMode="contain" />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.bentoActionContainer}>
                    <TouchableOpacity 
                      style={[styles.bentoActionBtn, isLikedLocal && styles.activeLike]} 
                      onPress={handleLike}
                      activeOpacity={0.7}
                    >
                        <Heart 
                          size={18} 
                          color={isLikedLocal ? "#F43F5E" : "#64748B"} 
                          fill={isLikedLocal ? "#F43F5E" : "transparent"} 
                        />
                        <Text style={[styles.bentoActionText, isLikedLocal && { color: "#F43F5E" }]}>
                          {isLikedLocal ? 'Liked' : 'Like'}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.bentoActionBtn, isSavedLocal && styles.activeSave]} 
                      onPress={handleSave}
                      activeOpacity={0.7}
                    >
                        <Bookmark 
                          size={18} 
                          color={isSavedLocal ? "#D97706" : "#64748B"} 
                          fill={isSavedLocal ? "#D97706" : "transparent"} 
                        />
                        <Text style={[styles.bentoActionText, isSavedLocal && { color: "#D97706" }]}>
                          {isSavedLocal ? 'Saved' : 'Save'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bentoActionBtn} activeOpacity={0.7}>
                        <Share2 size={18} color="#64748B" />
                        <Text style={styles.bentoActionText}>Share</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.bookTitle} numberOfLines={2}>{book.name}</Text>
                        <Text style={styles.authorText}>
                            by <Text style={styles.authorName}>{book.author}</Text>
                        </Text>
                    </View>
                </View>
              
                <View style={styles.badgeRow}>
                    {renderBadge()}
                    <View style={styles.dotSeparator} />
                    <Text style={styles.stockText}>In Stock</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFF1F2' }]}>
                            <Heart size={18} color="#F43F5E" fill={isLikedLocal ? "#F43F5E" : "transparent"} />
                        </View>
                        <Text style={styles.statValue}>
                          {isLikedLocal && !book.liked ? book.totalLikes + 1 : 
                           !isLikedLocal && book.liked ? book.totalLikes - 1 : book.totalLikes}
                        </Text>
                        <Text style={styles.statLabel}>LIKES</Text>
                    </View>
                    <View style={styles.statBox}>
                        <View style={[styles.iconCircle, { backgroundColor: '#F0F9FF' }]}>
                            <Eye size={18} color="#0EA5E9" />
                        </View>
                        <Text style={styles.statValue}>{book.totalViews}</Text>
                        <Text style={styles.statLabel}>VIEWS</Text>
                    </View>
                    <View style={styles.statBox}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFFBEB' }]}>
                            <Bookmark size={18} color="#D97706" fill={isSavedLocal ? "#D97706" : "transparent"} />
                        </View>
                        <Text style={styles.statValue}>
                          {isSavedLocal && !book.saved ? book.savedByCount + 1 : 
                           !isSavedLocal && book.saved ? book.savedByCount - 1 : book.savedByCount}
                        </Text>
                        <Text style={styles.statLabel}>SAVED</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionHeading}>About this book</Text>
                    <Text style={styles.descriptionText}>{book.description}</Text>
                </View>
            </View>
          </ScrollView>

          <View style={styles.footerContainer}>
            <SafeAreaView edges={['bottom']} style={styles.footerInner}>
              <View style={styles.priceSection}>
                <Text style={styles.priceTag}>TOTAL PRICE</Text>
                <Text style={styles.priceAmount}>₹{book.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.buyButton}
                onPress={() => onBuy?.(book)}
                activeOpacity={0.8}
              >
                <Text style={styles.buyButtonText}>Buy Now</Text>
                <View style={styles.buyIconCircle}>
                  <ShoppingBag size={18} color="#0F172A" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookDetailModal;