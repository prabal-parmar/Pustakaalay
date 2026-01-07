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
  AtSign,
  Phone,
  Calendar,
  Users,
  MapPin,
} from "lucide-react-native";
import { styles } from "@/components/styles/authStyles/registerBuyerStyle";
import { router } from "expo-router";
import { registerBuyer } from "@/api/authApis/registerBuyer";

export default function RegisterBuyerScreen() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    gender: "Other",
    age: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(30)).current;

  const handleRegisterBuyer = async () => {
    const [completed, message] = await registerBuyer(formData);
    setIsSubmitting(false);
    setFormData({first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    gender: "Other",
    age: "",
    city: "",})
    if(completed){
      return router.replace('/(auth)/login');
    }
    else{
      console.log(message);
    }
    // console.log(message, completed);
  }

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

  const genderOptions = ["Male", "Female", "Other"];

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAgeChange = (value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "");
    handleChange("age", digitsOnly);
  };

  const handleMobileChange = (value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "");
    handleChange("mobile", digitsOnly);
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
              <Text style={styles.subtitle}>READER REGISTRATION</Text>
              <View style={styles.divider} />
            </View>
          </View>

          <Text style={styles.description}>
            Join our community of readers and{" "}
            <Text style={styles.highlight}>explore worlds</Text>.
          </Text>
          <View style={styles.row}>
            <View style={styles.flex}>
              <Label text="First Name" />
              <Input
                Icon={User}
                placeholder="Firstname"
                value={formData.first_name}
                onChangeText={(v: string) => handleChange("first_name", v)}
              />
            </View>

            <View style={styles.flex}>
              <Label text="Last Name" />
              <Input
                Icon={User}
                placeholder="Lastname"
                value={formData.last_name}
                onChangeText={(v: string) => handleChange("last_name", v)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Label text="Email" />
              <Input
                Icon={Mail}
                placeholder="mail@example.com"
                value={formData.email}
                onChangeText={(v: string) => handleChange("email", v)}
              />
            </View>

            <View style={styles.flex}>
              <Label text="Mobile Number" />
              <Input
                Icon={Phone}
                placeholder="Mobile number"
                keyboardType="phone-pad"
                value={formData.mobile}
                onChangeText={handleMobileChange}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Label text="Username" />
              <Input
                Icon={AtSign}
                placeholder="username"
                value={formData.username}
                onChangeText={(v: string) => handleChange("username", v)}
              />
            </View>

            <View style={styles.flex}>
              <Label text="City" />
              <Input
                Icon={MapPin}
                placeholder="e.g. Delhi"
                value={formData.city}
                onChangeText={(v: string) => handleChange("city", v)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Label text="Age" />
              <Input
                Icon={Calendar}
                placeholder="Years"
                keyboardType="number-pad"
                value={formData.age}
                onChangeText={handleAgeChange}
              />
            </View>
          </View>

          <Label text="Gender" />
          <View style={styles.genderWrap}>
            {genderOptions.map((g) => {
              const active = formData.gender === g;
              return (
                <Pressable
                  key={g}
                  onPress={() => handleChange("gender", g)}
                  style={[
                    styles.genderButton,
                    active && styles.genderButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.genderText,
                      active && styles.genderTextActive,
                    ]}
                  >
                    {g}
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
              placeholder="Secure Password"
              placeholderTextColor="#A5A58D"
              style={styles.input}
              value={formData.password}
              onChangeText={(v) => handleChange("password", v)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Users size={18} color="#1A1A1A" />
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
              handleRegisterBuyer();
            }}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? "VERIFYING..." : "CREATE ACCOUNT"}
            </Text>
            {!isSubmitting && <ChevronRight size={20} color="#fff" />}
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already a member?</Text>
            <Pressable onPress={() => router.replace("/login")}>
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
  return <Text style={styles.label}>{text.toUpperCase()}</Text>;
}

function Input({ Icon, placeholder, value, onChangeText, keyboardType }: any) {
  return (
    <View style={styles.inputBox}>
      <Icon size={18} color="#A5A58D" />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#A5A58D"
        style={styles.input}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}
