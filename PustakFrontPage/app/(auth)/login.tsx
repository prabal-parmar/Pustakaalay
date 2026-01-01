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
import { loginBuyer } from "@/api/authApis/loginUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [role, setRole] = useState<"Reader" | "Collector">("Reader");
  const [toggleWidth, setToggleWidth] = useState(0);
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
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

  const loginUser = async () => {
    if(role == "Collector"){
      router.navigate('/(seller)/mybook')
    }
    else{
      const res = await loginBuyer({username, password});
      console.log(res[1]);
      if(res[0] == true){
        await AsyncStorage.setItem("role", "buyer");
        await AsyncStorage.setItem("username", username);
        return router.navigate('/(buyer)/home')
      }
    }
  }

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
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#A5A58D"
              style={styles.input}
            />
          </View>

          <View style={styles.inputBox}>
            <Lock size={18} color="#A5A58D" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#A5A58D"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Pressable style={styles.recover}>
            <Text style={styles.recoverText}>Forgot Password?</Text>
          </Pressable>

          <Pressable style={styles.cta} onPress={loginUser}>
            <Text style={styles.ctaText}>Login</Text>
            <ChevronRight size={20} color="#fff" />
          </Pressable>

          <View style={{ marginTop: 22, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#6B705C",
                marginBottom: 10,
              }}
            >
              New here?
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Pressable
                onPress={() => router.push("/registerSeller")}
                style={{ marginRight: 14 }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    color: "#1A1A1A",
                    textDecorationLine: "underline",
                  }}
                >
                  Register as Collector
                </Text>
              </Pressable>

              <Pressable onPress={() => router.push("/registerBuyer")}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    color: "#1A1A1A",
                    textDecorationLine: "underline",
                  }}
                >
                  Register as Reader
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
