import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safe: { flex: 1 },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  blobTop: {
    position: "absolute",
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: "#FFE8A3",
    borderRadius: 999,
    top: -width * 0.25,
    right: -width * 0.3,
    opacity: 0.6,
  },

  blobBottom: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: "#FFF1C1",
    borderRadius: 999,
    bottom: -width * 0.3,
    left: -width * 0.3,
    opacity: 0.4,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#3D300F",
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },

  brand: {
    alignItems: "center",
    marginBottom: 24,
  },

  logoWrap: {
    width: 64,
    height: 64,
    backgroundColor: "#5c1616ff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  sparkle: {
    position: "absolute",
    top: 6,
    right: width / 2 - 70,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1A1A1A",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  divider: {
    height: 1,
    width: 28,
    backgroundColor: "#FBBF24",
  },

  subtitle: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "700",
    color: "#6B705C",
  },

  switch: {
    flexDirection: "row",
    backgroundColor: "#F4F1EA",
    borderRadius: 20,
    padding: 4,
    marginBottom: 18,
    position: "relative",
  },

  switchBg: {
    position: "absolute",
    top: 4,
    bottom: 4,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
  },

  switchBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
  },

  switchText: {
    fontWeight: "700",
    color: "#6B705C",
    fontSize: 13,
  },

  switchTextActive: {
    color: "#fff",
  },

  info: {
    textAlign: "center",
    fontSize: 12,
    color: "#7A6B44",
    marginBottom: 14,
    fontStyle: "italic",
  },

  role: {
    fontWeight: "800",
    color: "#B07D05",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E0D5",
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  recover: {
    alignItems: "flex-end",
    marginBottom: 18,
  },

  recoverText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1A1A1A",
    textDecorationLine: "underline",
  },

  cta: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  ctaText: {
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 1.5,
    fontSize: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    gap: 6,
  },

  footerText: {
    color: "#6B705C",
    fontSize: 12,
  },

  footerLink: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A1A1A",
  },
});