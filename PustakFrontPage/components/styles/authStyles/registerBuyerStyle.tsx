import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  blobTop: {
    position: "absolute",
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: "#FFE8A3",
    borderRadius: 999,
    top: -width * 0.3,
    right: -width * 0.3,
    opacity: 0.6,
  },

  blobBottom: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: "#FFF1C1",
    borderRadius: 999,
    bottom: -width * 0.35,
    left: -width * 0.3,
    opacity: 0.4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 22,
    shadowColor: "#3D300F",
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 12,
  },

  header: { alignItems: "center", marginBottom: 14 },

  logoWrap: {
    width: 64,
    height: 64,
    backgroundColor: "#5c1616",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
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

  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  divider: {
    height: 1,
    width: 28,
    backgroundColor: "#FBBF24",
    marginHorizontal: 6,
  },

  subtitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#6B705C",
  },

  description: {
    textAlign: "center",
    fontSize: 12,
    color: "#7A6B44",
    marginVertical: 14,
    fontStyle: "italic",
  },

  highlight: {
    fontWeight: "800",
    color: "#B07D05",
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#6B705C",
    marginLeft: 6,
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    marginBottom: 8,
  },

  flex: { flex: 1, marginHorizontal: 4 },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E0D5",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  genderWrap: {
    flexDirection: "row",
    backgroundColor: "#F4F1EA",
    borderRadius: 22,
    padding: 6,
    marginBottom: 12,
  },

  genderButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 18,
  },

  genderButtonActive: {
    backgroundColor: "#1A1A1A",
  },

  genderText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B705C",
    letterSpacing: 1,
  },

  genderTextActive: {
    color: "#FFFFFF",
  },

  submit: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    marginRight: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  footerText: {
    fontSize: 12,
    color: "#6B705C",
    marginRight: 6,
  },

  footerLink: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A1A1A",
    textDecorationLine: "underline",
  },

  watermark: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 4,
    opacity: 0.25,
    color: "#7A6B44",
  },
});
