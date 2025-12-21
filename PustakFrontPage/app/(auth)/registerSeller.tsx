import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  Mail,
  Lock,
  BookOpen,
  Sparkles,
  ChevronRight,
  Store,
  Library,
  Book,
  MoreHorizontal,
  AtSign,
} from "lucide-react-native";
import { styles } from "@/components/styles/authStyles/registerSellerStyle";
import { router } from "expo-router";

export default function SellerRegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    sellerType: "bookstore",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(rise, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const sellerTypes = [
    { id: "stationary", label: "Stationary", Icon: Store },
    { id: "library", label: "Library", Icon: Library },
    { id: "bookstore", label: "Bookstore", Icon: Book },
    { id: "other", label: "Other", Icon: MoreHorizontal },
  ];

  const handleChange = (key: any, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFFDF0", "#FFF4C2"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.card,
            { opacity: fade, transform: [{ translateY: rise }] },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <BookOpen size={32} color="#FBBF24" />
            </View>

            <Sparkles size={18} color="#F59E0B" style={styles.sparkle} />

            <Text style={styles.title}>Pustakaalay</Text>

            <View style={styles.subtitleRow}>
              <View style={styles.divider} />
              <Text style={styles.subtitle}>COLLECTOR REGISTRATION</Text>
              <View style={styles.divider} />
            </View>
          </View>

          <Text style={styles.description}>
            Fill in the details below to create your{" "}
            <Text style={styles.highlight}>Collector Account</Text> and start
            your journey.
          </Text>

          <Label text="Full Name" />
          <Input
            Icon={User}
            placeholder="Enter name"
            onChangeText={(v: any) => handleChange("name", v)}
          />

          <View style={styles.row}>
            <View style={styles.flex}>
              <Label text="Email Address" />
              <Input
                Icon={Mail}
                placeholder="mail@example.com"
                onChangeText={(v: any) => handleChange("email", v)}
              />
            </View>
            <View style={styles.flex}>
              <Label text="Username" />
              <Input
                Icon={AtSign}
                placeholder="username"
                onChangeText={(v: any) => handleChange("username", v)}
              />
            </View>
          </View>

          <Label text="Type of Collector" />
          <View style={styles.typeGrid}>
            {sellerTypes.map(({ id, label, Icon }) => {
              const active = formData.sellerType === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => handleChange("sellerType", id)}
                  style={[
                    styles.typeButton,
                    active && styles.typeButtonActive,
                  ]}
                >
                  <Icon
                    size={16}
                    color={active ? "#FBBF24" : "#6B705C"}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      active && styles.typeTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Label text="Password" />
          <View style={styles.inputBox}>
            <Lock size={18} color="#A5A58D" />
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Create Password"
              placeholderTextColor="#A5A58D"
              style={styles.input}
              onChangeText={(v) => handleChange("password", v)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <MoreHorizontal size={18} color="#1A1A1A" />
              ) : (
                <Sparkles size={18} color="#A5A58D" />
              )}
            </Pressable>
          </View>

          <Pressable
            disabled={isSubmitting}
            style={styles.submit}
            onPress={() => {
              setIsSubmitting(true);
              setTimeout(() => setIsSubmitting(false), 2000);
            }}
          >
            <Text style={styles.submitText}>
              {isSubmitting
                ? "CREATING ACCOUNT..."
                : "REGISTER AS COLLECTOR"}
            </Text>
            {!isSubmitting && (
              <ChevronRight size={20} color="#fff" />
            )}
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have a collector account?
            </Text>
            <Pressable onPress={() => router.navigate('/login')}>
              <Text style={styles.footerLink}>Log In</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>

      <Text style={styles.watermark}>PUSTAKAALAY</Text>
    </SafeAreaView>
  );
}

function Label({ text }: any) {
  return (
    <Text style={styles.label}>{text.toUpperCase()}</Text>
  );
}

function Input({ Icon, placeholder, onChangeText }: any) {
  return (
    <View style={styles.inputBox}>
      <Icon size={18} color="#A5A58D" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A5A58D"
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
}
