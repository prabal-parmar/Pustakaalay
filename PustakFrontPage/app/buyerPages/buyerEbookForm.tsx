import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  ArrowLeft,
  UploadCloud,
  ChevronDown,
  Check,
  Info,
  Book,
  User,
  AlignLeft,
  Sparkles,
  FileText,
  Trash2,
  BookMarked,
} from "lucide-react-native";
import { styles } from "@/components/styles/buyerStyles/addEbookStyles";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { addBuyerNewEbook } from "@/api/buyerApis/ebookApi";

interface FileData {
  name: string;
  size: string;
  uri: string;
}

interface FormData {
  name: string;
  author: string;
  description: string;
  category: string;
  genre: string;
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    author: "",
    description: "",
    category: "",
    genre: "",
  });

  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<
    "category" | "genre" | null
  >(null);

  const handleSubmitForm = async () => {
    await addBuyerNewEbook(formData);
    router.replace('/(buyer)/ebook');
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectOption = (field: "category" | "genre", value: string) => {
    handleInputChange(field, value);
    if (field === "category" && value === "novel") {
      setActiveDropdown("genre");
    } else {
      setActiveDropdown(null);
    }

    if (field === "category" && value !== "novel") {
      handleInputChange("genre", "");
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const sizeInMB = file.size
          ? (file.size / (1024 * 1024)).toFixed(2) + " MB"
          : "Unknown size";

        setSelectedFile({
          name: file.name,
          size: sizeInMB,
          uri: file.uri,
        });
      }
    } catch (err) {
        Alert.alert("Error", "Failed to select document. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.blobContainer} pointerEvents="none">
        <View style={styles.blob1} />
        <View style={styles.blob2} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPressOut={() => router.back()}
            >
              <ArrowLeft size={22} color="#5c1616" strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.headerTitleGroup}>
              <View style={styles.headerBadge}>
                <View style={styles.badgeLine} />
                <Text style={styles.headerBadgeText}>DIGITAL PRESS</Text>
              </View>
              <Text style={styles.headerTitle}>Publish Ebook</Text>
            </View>

            <View style={[styles.iconButton, { borderColor: "#F3EEE0" }]}>
              <Sparkles size={20} color="#FBBF24" strokeWidth={2} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>MANUSCRIPT FILE</Text>
            {!selectedFile ? (
              <TouchableOpacity
                onPress={handleFileUpload}
                style={styles.uploadZone}
                activeOpacity={0.7}
              >
                <View style={styles.uploadIconContainer}>
                  <UploadCloud size={30} color="#5c1616" strokeWidth={2} />
                </View>
                <Text style={styles.uploadMainText}>Choose PDF or Word</Text>
                <Text style={styles.uploadSubText}>MAXIMUM SIZE: 25MB</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.fileCard}>
                <View style={styles.fileIconContainer}>
                  <FileText size={24} color="#5c1616" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {selectedFile.name}
                  </Text>
                  <Text style={styles.fileSize}>{selectedFile.size}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedFile(null)}
                  style={styles.trashBtn}
                >
                  <Trash2 size={18} color="#A5A58D" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EBOOK TITLE</Text>
              <View style={styles.inputWrapper}>
                <Book size={18} color="#A5A58D" style={styles.leftIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. The Art of Digital Press"
                  placeholderTextColor="#A5A58D60"
                  value={formData.name}
                  onChangeText={(val) => handleInputChange("name", val)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>AUTHOR</Text>
                <Text style={styles.optionalText}>OPTIONAL</Text>
              </View>
              <View style={styles.inputWrapper}>
                <User size={18} color="#A5A58D" style={styles.leftIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Writer's name"
                  placeholderTextColor="#A5A58D60"
                  value={formData.author}
                  onChangeText={(val) => handleInputChange("author", val)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CATEGORY</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() =>
                  setActiveDropdown(
                    activeDropdown === "category" ? null : "category",
                  )
                }
              >
                <Text
                  style={[
                    styles.dropdownValue,
                    formData.category
                      ? { color: "#1A1A1A" }
                      : { color: "#A5A58D" },
                  ]}
                >
                  {formData.category
                    ? CATEGORY_TYPE.find((c) => c.value === formData.category)
                        ?.label
                    : "Select Type"}
                </Text>
                <ChevronDown
                  size={18}
                  color="#A5A58D"
                  style={{
                    transform: [
                      {
                        rotate:
                          activeDropdown === "category" ? "180deg" : "0deg",
                      },
                    ],
                  }}
                />
              </TouchableOpacity>

              {activeDropdown === "category" && (
                <View style={styles.dropdownMenu}>
                  {CATEGORY_TYPE.map((opt) => (
                    <TouchableOpacity
                      key={opt.value}
                      onPress={() => selectOption("category", opt.value)}
                      style={styles.dropdownItem}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          formData.category === opt.value && {
                            color: "#5c1616",
                          },
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {formData.category === opt.value && (
                        <Check size={16} color="#5c1616" strokeWidth={3} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {formData.category === "novel" && (
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={[styles.label, { color: "#5c1616" }]}>
                    GENRE
                  </Text>
                  <BookMarked size={12} color="#5c1616" />
                </View>
                <TouchableOpacity
                  style={[
                    styles.dropdownTrigger,
                    activeDropdown === "genre" && { borderColor: "#5c1616" },
                  ]}
                  onPress={() =>
                    setActiveDropdown(
                      activeDropdown === "genre" ? null : "genre",
                    )
                  }
                >
                  <Text
                    style={[
                      styles.dropdownValue,
                      formData.genre
                        ? { color: "#1A1A1A" }
                        : { color: "#A5A58D" },
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
                  <View style={styles.dropdownMenu}>
                    {NOVEL_GENRE_TYPE.map((opt) => (
                      <TouchableOpacity
                        key={opt.value}
                        onPress={() => selectOption("genre", opt.value)}
                        style={styles.dropdownItem}
                      >
                        <Text
                          style={[
                            styles.itemText,
                            formData.genre === opt.value && {
                              color: "#5c1616",
                            },
                          ]}
                        >
                          {opt.label}
                        </Text>
                        {formData.genre === opt.value && (
                          <Check size={16} color="#5c1616" strokeWidth={3} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>ABOUT THE EBOOK</Text>
                <Text style={styles.optionalText}>OPTIONAL</Text>
              </View>
              <View
                style={[
                  styles.inputWrapper,
                  { height: 120, alignItems: "flex-start", paddingTop: 16 },
                ]}
              >
                <AlignLeft size={18} color="#A5A58D" style={styles.leftIcon} />
                <TextInput
                  style={[styles.textInput, { textAlignVertical: "top" }]}
                  multiline
                  numberOfLines={4}
                  placeholder="Provide a brief summary..."
                  placeholderTextColor="#A5A58D60"
                  value={formData.description}
                  onChangeText={(val) => handleInputChange("description", val)}
                />
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoIconCircle}>
              <Info size={20} color="white" strokeWidth={2.5} />
            </View>
            <Text style={styles.infoText}>
              EBOOKS ARE LISTED FOR INSTANT DIGITAL ACCESS. ENSURE YOUR FILE IS
              CORRECTLY FORMATTED.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.publishBtn}
            activeOpacity={0.8}
            onPress={() => {
              if (selectedFile) { // Need to alter after so temp for now
                Alert.alert(
                  "Wait!",
                  "Please select a manuscript file before publishing.",
                );
                return;
              }
              else{
                handleSubmitForm();
              }
            }}
          >
            <Text style={styles.publishBtnText}>Publish Ebook</Text>
            <View style={styles.checkIconBox}>
              <Check size={20} color="#5c1616" strokeWidth={3} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
