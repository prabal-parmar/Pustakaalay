import { Dimensions, StyleSheet } from "react-native";

const CARD_SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 8,
};

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFDF0",
  },

  header: {
    padding: 20,
    backgroundColor: "#FFFDF0",

    borderBottomWidth: 1,
    borderBottomColor: "#EFE8DA",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    backgroundColor: "#FBBF24",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  greeting: { fontSize: 10, color: "#777" },
  name: { fontSize: 20, fontWeight: "900" },

  searchBox: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: "#EEE8DC",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
  },

  input: { flex: 1, padding: 10 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    margin: 20,
  },

  readingCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,

    borderWidth: 1,
    borderColor: "#F0EDE6",

    ...CARD_SHADOW,
  },

  bookTitle: { fontSize: 16, fontWeight: "900" },
  author: { fontSize: 12, color: "#777" },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#EFE8DA",
    borderRadius: 6,
    marginTop: 6,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FBBF24",
    borderRadius: 6,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  trendingCard: {
    width: width / 2 - 30,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 28,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#F0EDE6",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 6,
  },

  heart: {
    position: "absolute",
    top: 12,
    right: 12,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  marketCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 22,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EEE8DC",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },

  marketRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  price: {
    fontWeight: "900",
    color: "#5c1616",
  },

  cta: {
    margin: 20,
    backgroundColor: "#1A1A1A",
    borderRadius: 32,
    padding: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 14,
  },

  ctaTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginVertical: 12,
    textAlign: "center",
  },

  ctaButton: {
    backgroundColor: "#FBBF24",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  ctaText: { fontWeight: "900" },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },

  close: {
    position: "absolute",
    top: 20,
    right: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 12,
  },

  modalAuthor: {
    color: "#777",
    marginBottom: 16,
  },

  modalDesc: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },

  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    gap: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },

  startText: {
    color: "#fff",
    fontWeight: "900",
    textTransform: "uppercase",
  },

  smallText: { fontSize: 11, color: "#777" },
});
