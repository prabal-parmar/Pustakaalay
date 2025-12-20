import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Animated,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BookOpen,
  User,
  Briefcase,
  Mail,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react-native";
import { styles } from "@/components/styles/authStyles/loginStyle";
import { router } from "expo-router";

export default function LoginScreen() {
  const [role, setRole] = useState<"Reader" | "Collector">("Reader");
  const [toggleWidth, setToggleWidth] = useState(0);

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

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#FFFDF0", "#FFF4C2"]}
        style={StyleSheet.absoluteFill}
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
          <View style={styles.brand}>
            <View style={styles.logoWrap}>
              <BookOpen size={32} color="#FBBF24" />
            </View>
            <Sparkles size={18} color="#F59E0B" style={styles.sparkle} />
            <Text style={styles.title}>Pustakaalay</Text>
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.subtitle}>Let's Read and Share</Text>
              <View style={styles.divider} />
            </View>
          </View>

          <View
            style={styles.switch}
            onLayout={(e) => setToggleWidth(e.nativeEvent.layout.width)}
          >
            {toggleWidth > 0 && (
              <View
                style={[
                  styles.switchBg,
                  {
                    width: toggleWidth / 2 - 8,
                    transform: [
                      {
                        translateX: role === "Reader" ? 4 : toggleWidth / 2 + 4,
                      },
                    ],
                  },
                ]}
              />
            )}

            <Pressable
              style={styles.switchBtn}
              onPress={() => setRole("Reader")}
            >
              <User size={18} color={role === "Reader" ? "#fff" : "#6B705C"} />
              <Text
                style={[
                  styles.switchText,
                  role === "Reader" && styles.switchTextActive,
                ]}
              >
                Reader
              </Text>
            </Pressable>

            <Pressable
              style={styles.switchBtn}
              onPress={() => setRole("Collector")}
            >
              <Briefcase
                size={18}
                color={role === "Collector" ? "#fff" : "#6B705C"}
              />
              <Text
                style={[
                  styles.switchText,
                  role === "Collector" && styles.switchTextActive,
                ]}
              >
                Collector
              </Text>
            </Pressable>
          </View>

          <Text style={styles.info}>
            Logging in to the <Text style={styles.role}>{role}</Text> dashboard
          </Text>

          <View style={styles.inputBox}>
            <Mail size={18} color="#A5A58D" />
            <TextInput
              placeholder="Username or Email"
              placeholderTextColor="#A5A58D"
              style={styles.input}
            />
          </View>

          <View style={styles.inputBox}>
            <Lock size={18} color="#A5A58D" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A5A58D"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Pressable style={styles.recover}>
            <Text style={styles.recoverText}>Forgot Password?</Text>
          </Pressable>

          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>Login</Text>
            <ChevronRight size={20} color="#fff" />
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New here?</Text>
            <Pressable>
              <TouchableOpacity onPressOut={() => router.navigate("/register")}>
                <Text style={styles.footerLink}>Let's Register</Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
