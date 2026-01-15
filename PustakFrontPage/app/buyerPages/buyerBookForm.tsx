import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  useWindowDimensions,
  Alert,
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
  BookMarked,
  X,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "@/components/styles/buyerStyles/addBookStyles";
import { router } from "expo-router";

interface FormData {
  name: string;
  author: string;
  description: string;
  price: string;
  category: string;
  genre: string;
  imageUri: string | null;
}

const CATEGORY_TYPE = [
  { value: "novel", label: "Novel" },
  { value: "historical", label: "Historical" },
  { value: "biography", label: "Biography" },
  { value: "scientific", label: "Scientific" },
  { value: "miscellaneous", label: "Miscellaneous" },
  { value: "other", label: "Other" },
];

const NOVEL_GENRE_TYPE = [
  { value: "fiction", label: "Fiction" },
  { value: "fantasy", label: "Fantasy" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "sci-fi", label: "Sci-fi" },
  { value: "thriller", label: "Thriller" },
];

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    author: "",
    description: "",
    price: "",
    category: "",
    genre: "",
    imageUri: null,
  });

  const [activeDropdown, setActiveDropdown] = useState<
    "category" | "genre" | null
  >(null);

  const handleInputChange = (field: keyof FormData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your photos to upload a book cover."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("imageUri", result.assets[0].uri);
    }
  };

  const selectOption = (field: "category" | "genre", value: string) => {
    handleInputChange(field, value);
    if (field === "category" && value === "novel") {
      setTimeout(() => setActiveDropdown("genre"), 200);
    } else {
      setActiveDropdown(null);
    }
    if (field === "category" && value !== "novel") {
      handleInputChange("genre", "");
    }
  };

  const horizontalPadding =
    windowWidth > 480 ? (windowWidth - 480) / 2 + 24 : 24;

  return (
    <SafeAreaView style={styles.safeArea}>
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
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingHorizontal: horizontalPadding },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <ArrowLeft size={22} color="#5c1616" strokeWidth={2.5} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <View style={styles.storefrontLabel}>
                <View style={styles.labelIndicator} />
                <Text style={styles.storefrontText}>Buyer's Book</Text>
              </View>
              <Text style={styles.mainTitle}>List New Book</Text>
            </View>
            <View style={styles.sparkleContainer}>
              <Sparkles size={20} color="#FBBF24" />
            </View>
          </View>

          <View style={styles.photoContainer}>
            <TouchableOpacity
              style={[
                styles.imagePicker,
                formData.imageUri ? styles.imagePickerActive : null,
              ]}
              onPress={pickImage}
              activeOpacity={0.9}
            >
              {formData.imageUri ? (
                <>
                  <Image
                    source={{ uri: formData.imageUri }}
                    style={styles.previewImage}
                  />
                  <TouchableOpacity
                    style={styles.removePhotoBtn}
                    onPress={() => handleInputChange("imageUri", null)}
                  >
                    <X size={16} color="white" />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.imagePickerContent}>
                  <View style={styles.cameraIconBg}>
                    <Camera size={28} color="#5c1616" />
                  </View>
                  <Text style={styles.imagePickerTitle}>Add Book Photos</Text>
                  <Text style={styles.imagePickerSub}>ADD PROPER IMAGE</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>BOOK TITLE</Text>
              <View style={styles.inputWrapper}>
                <BookIcon size={18} color="#A5A58D" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Revolution 20-20"
                  placeholderTextColor="#A5A58D60"
                  value={formData.name}
                  onChangeText={(t) => handleInputChange("name", t)}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>AUTHOR</Text>
              <View style={styles.inputWrapper}>
                <UserIcon size={18} color="#A5A58D" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Writer's name"
                  placeholderTextColor="#A5A58D60"
                  value={formData.author}
                  onChangeText={(t) => handleInputChange("author", t)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>PRICE (INR)</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput
                    style={[styles.input, { paddingLeft: 4 }]}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor="#A5A58D60"
                    value={formData.price}
                    onChangeText={(t) => {
                      const cleaned = t.replace(/[^0-9.]/g, "");
                      const parts = cleaned.split(".");
                      const finalValue =
                        parts.length > 2
                          ? `${parts[0]}.${parts.slice(1).join("")}`
                          : cleaned;
                      handleInputChange("price", finalValue);
                    }}
                  />
                </View>
              </View>

              <View style={[styles.field, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>CATEGORY</Text>
                <TouchableOpacity
                  style={styles.dropdownTrigger}
                  onPress={() =>
                    setActiveDropdown(
                      activeDropdown === "category" ? null : "category"
                    )
                  }
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.dropdownText,
                      !formData.category && { color: "#A5A58D60" },
                    ]}
                  >
                    {formData.category
                      ? CATEGORY_TYPE.find((c) => c.value === formData.category)
                          ?.label
                      : "Select"}
                  </Text>
                  <ChevronDown size={18} color="#A5A58D" />
                </TouchableOpacity>
              </View>
            </View>

            {activeDropdown === "category" && (
              <View style={styles.dropdownList}>
                {CATEGORY_TYPE.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.dropdownItem}
                    onPress={() => selectOption("category", item.value)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        formData.category === item.value && {
                          color: "#5c1616",
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {formData.category === item.value && (
                      <Check size={16} color="#5c1616" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {formData.category === "novel" && (
              <View style={styles.field}>
                <Text style={[styles.label, { color: "#5c1616" }]}>
                  SELECT GENRE <BookMarked size={10} color="#5c1616" />
                </Text>
                <TouchableOpacity
                  style={[
                    styles.dropdownTrigger,
                    activeDropdown === "genre" && { borderColor: "#5c1616" },
                  ]}
                  onPress={() =>
                    setActiveDropdown(
                      activeDropdown === "genre" ? null : "genre"
                    )
                  }
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      !formData.genre && { color: "#A5A58D60" },
                    ]}
                  >
                    {formData.genre
                      ? NOVEL_GENRE_TYPE.find((g) => g.value === formData.genre)
                          ?.label
                      : "Pick Genre"}
                  </Text>
                  <ChevronDown size={18} color="#A5A58D" />
                </TouchableOpacity>
                {activeDropdown === "genre" && (
                  <View style={styles.dropdownList}>
                    {NOVEL_GENRE_TYPE.map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.dropdownItem}
                        onPress={() => selectOption("genre", item.value)}
                      >
                        <Text
                          style={[
                            styles.itemText,
                            formData.genre === item.value && {
                              color: "#5c1616",
                            },
                          ]}
                        >
                          {item.label}
                        </Text>
                        {formData.genre === item.value && (
                          <Check size={16} color="#5c1616" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            <View style={styles.field}>
              <Text style={styles.label}>ABOUT THE BOOK</Text>
              <View
                style={[
                  styles.inputWrapper,
                  { height: 120, alignItems: "flex-start", paddingTop: 16 },
                ]}
              >
                <AlignLeft size={18} color="#A5A58D" style={styles.icon} />
                <TextInput
                  style={[styles.input, { textAlignVertical: "top" }]}
                  multiline
                  placeholder="Book is about..."
                  placeholderTextColor="#A5A58D60"
                  value={formData.description}
                  onChangeText={(t) => handleInputChange("description", t)}
                />
              </View>
            </View>
          </View>

          <View style={styles.tips}>
            <View style={styles.infoIcon}>
              <Info size={20} color="white" />
            </View>
            <Text style={styles.tipsText}>Keep it correct and detailed.</Text>
          </View>

          <TouchableOpacity style={styles.publishBtn} activeOpacity={0.8}>
            <Text style={styles.publishText}>PUBLISH LISTING</Text>
            <View style={styles.checkIcon}>
              <Check size={20} color="#5c1616" strokeWidth={3} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}