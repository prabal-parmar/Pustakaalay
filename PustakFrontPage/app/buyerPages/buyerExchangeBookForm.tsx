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
} from "react-native";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  Check,
  Info,
  Book as BookIcon,
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

export default function CreateExchange() {
  const [formData, setFormData] = useState({
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
              <ArrowLeft size={22} color="#5c1616" strokeWidth={2.5} />
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
                <Text style={styles.label}>WANTED CONDITION</Text>
                <TextInput
                  placeholder="e.g. Readable"
                  style={styles.inputSimple}
                  value={formData.desiredCondition}
                  onChangeText={(val) =>
                    handleInputChange("desiredCondition", val)
                  }
                />
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

            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>CREATE EXCHANGE</Text>
              <View style={styles.primaryBtnIcon}>
                <Repeat size={20} color="#5c1616" strokeWidth={3} />
              </View>
            </TouchableOpacity>

            <View style={styles.footer}>
              <View style={styles.footerLine} />
              <Text style={styles.brand}>PUSTAKAALAY</Text>
              <Text style={styles.tagline}>SWAP • READ • REPEAT</Text>
            </View>
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
        animationType="fade"
        onRequestClose={() => setRulesModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.rulesModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Exchange Rules</Text>
              <TouchableOpacity onPress={() => setRulesModalVisible(false)}>
                <X size={20} color="#A5A58D" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.rulesContent}>
              <Text style={styles.rulesText}>
                📚 Fair Exchange System:{"\n"}• Selecting &quot;Novel&quot; in
                your book details auto-selects &quot;Novel&quot; in desired
                category{"\n"}• Complete your book details first to unlock
                desired book selection{"\n"}
                {"\n"}
                📖 Book Categories:{"\n"}• Fiction, Non-Fiction, Educational,
                Novels{"\n"}• Novels can only be exchanged with other novels
                {"\n"}• Auto-selection prevents category mismatches{"\n"}
                {"\n"}
                🔒 Auto-Locking:{"\n"}• Desired category auto-locks when
                &quot;Novel&quot; is selected{"\n"}• Prevents accidental changes
                to auto-selected values{"\n"}• Desired book section is locked
                until your book details are complete{"\n"}• Fill in book name,
                category, and condition to proceed{"\n"}
                {"\n"}✅ Validation:{"\n"}• All required fields must be filled
                {"\n"}• Category matching ensures fair exchanges{"\n"}• System
                prevents invalid exchange combinations{"\n"}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
