import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Modal,
} from "react-native";
import {
  BookOpen,
  Plus,
  Image as ImageIcon,
  User,
  Tag,
  DollarSign,
  Hash,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Info,
  GraduationCap,
  Library,
  CheckCircle2,
  X,
} from "lucide-react-native";
import { router } from "expo-router";
import { styles } from "@/components/styles/sellerStyles/bookFormStyles";
import { addBookData } from "@/api/sellerApis/addBookForm";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const App = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "1",
    type: "Novel",
    genre: "Fiction",
    isEducational: false,
  });

  const handleBookForm = async () => {
    await addBookData(bookData);
  }

  const categories = [
    "Novel",
    "Historical Archive",
    "Biography",
    "Scientific Journal",
    "Miscellaneous",
  ];

  const handleInputChange = (name: string, value: any) => {
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    handleInputChange("price", cleaned);
  };

  const handleQuantityChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    handleInputChange("quantity", cleaned);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Modal animationType="slide" transparent={true} visible={isPickerVisible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity
                onPress={() => setIsPickerVisible(false)}
                style={styles.closeBtn}
              >
                <X size={moderateScale(20)} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.optionRow,
                  bookData.type === item && styles.optionRowActive,
                ]}
                onPress={() => {
                  handleInputChange("type", item);
                  setIsPickerVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    bookData.type === item && styles.optionTextActive,
                  ]}
                >
                  {item}
                </Text>
                {bookData.type === item && (
                  <CheckCircle2 size={moderateScale(20)} color="#D4AF37" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.navBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={moderateScale(18)} color="#6B705C" onPressOut={() => router.back()}/>
              <Text style={styles.backLabel}>GO BACK</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Add Book</Text>
            <Text style={styles.heroSub}>
              Add a new book to the library.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <BookOpen size={moderateScale(14)} color="#D4AF37" />
                <Text style={styles.labelText}>BOOK TITLE</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. The Midnight Library"
                value={bookData.title}
                onChangeText={(t) => handleInputChange("title", t)}
                placeholderTextColor="#A5A58D"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <User size={moderateScale(14)} color="#D4AF37" />
                <Text style={styles.labelText}>AUTHOR NAME</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Writer's Name"
                value={bookData.author}
                onChangeText={(t) => handleInputChange("author", t)}
                placeholderTextColor="#A5A58D"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <ImageIcon size={moderateScale(14)} color="#D4AF37" />
                <Text style={styles.labelText}>BOOK IMAGE</Text>
              </View>
              <TouchableOpacity style={styles.uploadBox}>
                <Plus size={moderateScale(24)} color="#A5A58D" />
                <Text style={styles.uploadText}>Upload Visual</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <View
                style={[
                  styles.inputGroup,
                  { flex: 1.2, marginRight: moderateScale(10) },
                ]}
              >
                <View style={styles.labelRow}>
                  <DollarSign size={moderateScale(14)} color="#D4AF37" />
                  <Text style={styles.labelText}>PRICE</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  value={bookData.price}
                  onChangeText={handlePriceChange}
                  placeholderTextColor="#A5A58D"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 0.8 }]}>
                <View style={styles.labelRow}>
                  <Hash size={moderateScale(14)} color="#D4AF37" />
                  <Text style={styles.labelText}>QTY</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  keyboardType="number-pad"
                  value={bookData.quantity}
                  onChangeText={handleQuantityChange}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Tag size={moderateScale(14)} color="#D4AF37" />
                <Text style={styles.labelText}>CATEGORY</Text>
              </View>
              <TouchableOpacity
                style={styles.selectorTrigger}
                onPress={() => setIsPickerVisible(true)}
              >
                <Text style={styles.selectorValue}>{bookData.type}</Text>
                <ChevronDown size={moderateScale(20)} color="#A5A58D" />
              </TouchableOpacity>
            </View>

            <View style={styles.toggleCard}>
              <View style={styles.toggleInfo}>
                <GraduationCap
                  size={moderateScale(22)}
                  color={bookData.isEducational ? "#D4AF37" : "#A5A58D"}
                />
                <View style={{ marginLeft: moderateScale(12) }}>
                  <Text style={styles.toggleMain}>Educational Content</Text>
                  <Text style={styles.toggleSub}>Academic manuscript</Text>
                </View>
              </View>
              <Switch
                value={bookData.isEducational}
                onValueChange={(v) => handleInputChange("isEducational", v)}
                trackColor={{ false: "#E5E0D5", true: "#D4AF37" }}
                thumbColor="#FFF"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Info size={moderateScale(14)} color="#D4AF37" />
                <Text style={styles.labelText}>DESCRIPTION</Text>
              </View>
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Tell the story of this manuscript..."
                value={bookData.description}
                onChangeText={(t) => handleInputChange("description", t)}
                placeholderTextColor="#A5A58D"
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
              <Text style={styles.submitText}>COMMIT TO ARCHIVE</Text>
              <View style={styles.submitCircle}>
                <Plus
                  size={moderateScale(24)}
                  color="#1A1A1A"
                  strokeWidth={3}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
