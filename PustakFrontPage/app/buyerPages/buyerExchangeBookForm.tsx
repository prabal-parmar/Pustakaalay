import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  Check,
  Info,
  Book as BookIcon,
  User as UserIcon,
  AlignLeft,
  Sparkles,
  Repeat,
  Heart,
  Layers,
  X,
  Lock,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "@/components/styles/buyerStyles/addExchangeBookStyles";
import { router } from "expo-router";
import { addExchangeBook } from "@/api/buyerApis/ebookApi";

const CATEGORY_TYPE = [
  { value: "novel", label: "Novel" },
  { value: "historical", label: "Historical" },
  { value: "biography", label: "Biography" },
  { value: "scientific", label: "Scientific" },
  { value: "miscellaneous", label: "Miscellaneous" },
  { value: "other", label: "Other" },
];

const GENRE_TYPE = [
  { value: "fiction", label: "Fiction" },
  { value: "fantasy", label: "Fantasy" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "sci-fi", label: "Sci-fi" },
  { value: "thriller", label: "Thriller" },
];

const CONDITION_TYPE = [
  { value: "new", label: "New / Like New" },
  { value: "good", label: "Gently Used" },
  { value: "fair", label: "Fair (Visible wear)" },
  { value: "old", label: "Old / Collectible" },
];

type ExchangeForm = {
  myBookName: string;
  myAuthor: string;
  myCondition: string;
  myCategory: string;
  myGenre: string;
  myImageUri: string | null;
  desiredCategory: string;
  desiredGenre: string;
  desiredCondition: string;
  exchangeNotes: string;
};

export default function CreateExchange() {
  const { width: windowWidth } = useWindowDimensions();
  const [formData, setFormData] = useState<ExchangeForm>({
    myBookName: "",
    myAuthor: "",
    myCondition: "",
    myCategory: "",
    myGenre: "",
    myImageUri: null as string | null,
    desiredCategory: "",
    desiredGenre: "",
    desiredCondition: "",
    exchangeNotes: "",
  });

  const [modalVisible, setModalVisible] = useState<{
    field: string;
    options: any[];
  } | null>(null);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);

  const handleAddExchange = async () => {
    if (
      formData.myBookName &&
      formData.myAuthor &&
      formData.myCategory &&
      formData.desiredCategory
    ) {
      const [message, data, completed] = await addExchangeBook(formData);
      if (completed) {
        router.back();
        return Alert.alert(message);
      } else {
        return Alert.alert(message);
      }
    } else {
      console.log("Some fields are required!");
      return Alert.alert("Fill important details.");
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "myCategory") {
        if (value === "novel") {
          newData.desiredCategory = "novel";
          newData.desiredGenre = "";
        } else {
          newData.desiredCategory = "";
          newData.desiredGenre = "";
          newData.myGenre = "";
        }
      }
      if (field === "desiredCategory" && value !== "novel") {
        newData.desiredGenre = "";
      }
      return newData;
    });
  };

  const isBookDetailsComplete = () => {
    return formData.myBookName && formData.myCategory && formData.myCondition;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("myImageUri", result.assets[0].uri);
    }
  };

  const renderDropdown = (
    label: string,
    field: keyof typeof formData,
    options: any[],
    isDesiredSection = false,
    isNovelRestricted = false,
  ) => {
    let filteredOptions = options;
    if (
      isDesiredSection &&
      field === "desiredCategory" &&
      formData.myCategory !== "novel"
    ) {
      filteredOptions = options.filter((opt) => opt.value !== "novel");
    }

    const currentValue = filteredOptions.find(
      (o) => o.value === formData[field],
    );
    const isLocked = isNovelRestricted && formData.myCategory !== "novel";
    const isAutoLocked =
      field === "desiredCategory" &&
      formData.myCategory === "novel" &&
      formData.desiredCategory === "novel";

    return (
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Text
            style={[
              styles.label,
              isDesiredSection &&
                !isBookDetailsComplete() &&
                styles.disabledLabel,
            ]}
          >
            {label}
          </Text>
          {field === "desiredCategory" && (
            <TouchableOpacity
              onPress={() => setRulesModalVisible(true)}
              style={styles.infoIconBtn}
            >
              <Info size={14} color="#A5A58D" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.dropdown,
            (isLocked || isAutoLocked) && styles.lockedInput,
          ]}
          onPress={() =>
            !(isLocked || isAutoLocked) &&
            setModalVisible({ field, options: filteredOptions })
          }
        >
          <Text
            style={[
              styles.dropdownText,
              !currentValue && { color: "#A5A58D" },
              isDesiredSection &&
                !isBookDetailsComplete() &&
                styles.disabledText,
            ]}
          >
            {currentValue ? currentValue.label : "Select"}
          </Text>
          {isLocked || isAutoLocked ? (
            <Lock size={16} color="#A5A58D" />
          ) : (
            <ChevronDown size={18} color="#A5A58D" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[styles.blob, styles.blobTop, { right: -windowWidth * 0.2 }]}
      />
      <View
        style={[styles.blob, styles.blobBottom, { left: -windowWidth * 0.2 }]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconBtn}>
              <ArrowLeft
                size={22}
                color="#5c1616"
                strokeWidth={2.5}
                onPressOut={() => router.back()}
              />
            </TouchableOpacity>
            <View style={styles.headerTitleArea}>
              <View style={styles.badge}>
                <Repeat size={10} color="#FBBF24" />
                <Text style={styles.badgeText}>BOOK EXCHANGE</Text>
              </View>
              <Text style={styles.title}>Create Exchange</Text>
            </View>
            <View style={styles.iconBtnEmpty}>
              <Sparkles size={20} color="#FBBF24" />
            </View>
          </View>
        <View style={styles.navigationWrapper}>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.navigationTab]}
              onPress={() => router.replace("/buyerPages/buyerBookForm")}
            >
              <Text style={[styles.navigationTabText]}>SELL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navigationTab]}
              onPress={() => router.replace("/buyerPages/buyerEbookForm")}
            >
              <Text style={[styles.navigationTabText]}>EBOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navigationTab, styles.navigationTabActive]}
              onPress={() =>
                null
              }
            >
              <Text
                style={[
                  styles.navigationTabText,
                  styles.navigationTabTextActive,
                ]}
              >
                EXCHANGE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.sectionTitleRow}>
            <Layers size={18} color="#5c1616" />
            <Text style={styles.sectionTitle}>YOUR BOOK DETAILS</Text>
          </View>

          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.9}
            style={[
              styles.imageCard,
              formData.myImageUri && {
                borderStyle: "solid",
                borderColor: "#FBBF24",
              },
            ]}
          >
            {formData.myImageUri ? (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: formData.myImageUri }}
                  style={styles.fullImage}
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => handleInputChange("myImageUri", null)}
                >
                  <X size={16} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imagePlaceholder}>
                <View style={styles.cameraCircle}>
                  <Camera size={28} color="#5c1616" />
                </View>
                <Text style={styles.uploadMainText}>Upload Book Cover</Text>
                <Text style={styles.uploadSubText}>
                  CLEAR PHOTOS GET FASTER OFFERS
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>BOOK TITLE</Text>
              <View style={styles.inputWrapper}>
                <BookIcon size={18} color="#A5A58D" style={styles.inputIcon} />
                <TextInput
                  placeholder="The book you have..."
                  style={styles.input}
                  value={formData.myBookName}
                  onChangeText={(val) => handleInputChange("myBookName", val)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>AUTHOR</Text>
              <View style={styles.inputWrapper}>
                <UserIcon size={18} color="#A5A58D" style={styles.inputIcon} />
                <TextInput
                  placeholder="Who wrote this book?"
                  style={styles.input}
                  value={formData.myAuthor}
                  onChangeText={(val) => handleInputChange("myAuthor", val)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                {renderDropdown("CATEGORY", "myCategory", CATEGORY_TYPE)}
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                {renderDropdown("CONDITION", "myCondition", CONDITION_TYPE)}
              </View>
            </View>

            {formData.myCategory === "novel" && (
              <View style={styles.animatedIn}>
                {renderDropdown("MY BOOK GENRE ✨", "myGenre", GENRE_TYPE)}
              </View>
            )}

            <View style={[styles.sectionTitleRow, { marginTop: 30 }]}>
              <Heart size={18} color="#FBBF24" fill="#FBBF24" />
              <Text style={styles.sectionTitle}>DESIRED EXCHANGE</Text>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                {renderDropdown(
                  "DESIRED TYPE",
                  "desiredCategory",
                  CATEGORY_TYPE,
                  true,
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                {renderDropdown(
                  "WANTED CONDITION",
                  "desiredCondition",
                  CONDITION_TYPE,
                  true,
                )}
              </View>
            </View>

            {formData.desiredCategory === "novel" && (
              <View style={styles.animatedIn}>
                {renderDropdown(
                  "DESIRED GENRE",
                  "desiredGenre",
                  GENRE_TYPE,
                  true,
                )}
              </View>
            )}

            <View style={[styles.inputGroup, { marginTop: 10 }]}>
              <Text style={styles.label}>EXCHANGE NOTES (OPTIONAL)</Text>
              <View style={styles.textAreaWrapper}>
                <AlignLeft
                  size={18}
                  color="#A5A58D"
                  style={styles.textAreaIcon}
                />
                <TextInput
                  multiline
                  numberOfLines={4}
                  placeholder="e.g. Looking for anything by Kafka..."
                  style={styles.textArea}
                  value={formData.exchangeNotes}
                  onChangeText={(val) =>
                    handleInputChange("exchangeNotes", val)
                  }
                />
              </View>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoIcon}>
                <Info size={18} color="white" />
              </View>
              <Text style={styles.infoText}>
                {formData.myCategory !== "novel"
                  ? "SINCE YOUR BOOK IS NOT A NOVEL, YOU CAN'T REQUEST A NOVEL IN EXCHANGE."
                  : "EXCHANGE LISTINGS ALLOW OTHER READERS TO SWAP THEIR BOOKS FOR YOURS."}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleAddExchange}
            >
              <Text style={styles.primaryBtnText}>CREATE EXCHANGE</Text>
              <View style={styles.primaryBtnIcon}>
                <Repeat size={20} color="#5c1616" strokeWidth={3} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={!!modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(null)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <ScrollView>
              {modalVisible?.options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={styles.optionItem}
                  onPress={() => {
                    handleInputChange(modalVisible.field, opt.value);
                    setModalVisible(null);
                  }}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      formData[modalVisible.field as keyof typeof formData] ===
                        opt.value && { color: "#5c1616" },
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {formData[modalVisible.field as keyof typeof formData] ===
                    opt.value && <Check size={20} color="#5c1616" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={rulesModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRulesModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.rulesModal}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View style={styles.titleWrapper}>
                <View style={styles.headerIconBg}>
                  <Info size={18} color="white" strokeWidth={2.5} />
                </View>
                <Text style={styles.modalTitle}>Exchange Rules</Text>
              </View>
              <TouchableOpacity
                onPress={() => setRulesModalVisible(false)}
                style={styles.closeCircle}
              >
                <X size={20} color="#5c1616" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.rulesContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.introText}>
                To ensure a fair and high-quality swapping experience for
                everyone, please follow these guidelines:
              </Text>

              <View style={styles.ruleCard}>
                <View
                  style={[styles.ruleIconBg, { backgroundColor: "#FBBF24" }]}
                >
                  <Repeat size={16} color="#5c1616" />
                </View>
                <View style={styles.ruleTextContent}>
                  <Text style={styles.ruleTitle}>Fair Exchange System</Text>
                  <Text style={styles.ruleDescription}>
                    Selecting "Novel" in your details auto-matches the desired
                    category to maintain swap value.
                  </Text>
                </View>
              </View>

              <View style={styles.ruleCard}>
                <View
                  style={[styles.ruleIconBg, { backgroundColor: "#5c1616" }]}
                >
                  <Layers size={16} color="white" />
                </View>
                <View style={styles.ruleTextContent}>
                  <Text style={styles.ruleTitle}>Smart Locking</Text>
                  <Text style={styles.ruleDescription}>
                    Desired sections unlock only after your book details are
                    complete. This prevents invalid matches.
                  </Text>
                </View>
              </View>

              <View style={styles.ruleCard}>
                <View
                  style={[styles.ruleIconBg, { backgroundColor: "#A5A58D" }]}
                >
                  <Check size={16} color="white" />
                </View>
                <View style={styles.ruleTextContent}>
                  <Text style={styles.ruleTitle}>Verification</Text>
                  <Text style={styles.ruleDescription}>
                    All fields are required. Clear photos of the cover and spine
                    increase your chance of a successful swap.
                  </Text>
                </View>
              </View>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.understandBtn}
                  onPress={() => setRulesModalVisible(false)}
                >
                  <Text style={styles.understandBtnText}>I UNDERSTAND</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
