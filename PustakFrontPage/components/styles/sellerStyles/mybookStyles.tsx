import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FCF9F1" },

  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1A1A1A",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 4,
    color: "#D4AF37",
    marginBottom: 4,
  },

  addBtn: {
    width: 52,
    height: 52,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  stickyWrapper: {
    backgroundColor: "#FCF9F1",
    paddingBottom: 4,
  },

  searchBox: {
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: "#E5E0D5",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  clearBtn: {
    backgroundColor: "#FCF9F1",
    padding: 6,
    borderRadius: 8,
  },

  typeRow: {
    marginHorizontal: 24,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 4,
    borderRadius: 18,
    marginVertical: 20,
  },

  typeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
  },

  typeBtnActive: {
    backgroundColor: "#1A1A1A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  typeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B705C",
  },

  typeTextActive: { color: "#FFF" },

  genreRow: {
    paddingLeft: 24,
    marginBottom: 20,
  },

  genrePill: {
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E0D5",
  },

  genreActive: {
    backgroundColor: "#721C24",
    borderColor: "#721C24",
  },

  genreText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#6B705C",
    letterSpacing: 1,
  },

  genreTextActive: { color: "#FFF" },

  countRow: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  flexRowCenter: { flexDirection: "row", alignItems: "center" },

  accentLine: {
    width: 4,
    height: 14,
    backgroundColor: "#721C24",
    borderRadius: 2,
    marginRight: 8,
  },

  countText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#6B705C",
  },

  list: { paddingHorizontal: 24, paddingBottom: 40 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 32,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },

  cover: {
    width: 70,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#FCF9F1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E0D5",
  },

  rareBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#721C24",
    padding: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  cardContent: { flex: 1, justifyContent: "space-between" },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  bookTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },

  authorRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D4AF37",
    marginRight: 6,
  },
  bookAuthor: { fontSize: 12, fontWeight: "600", color: "#6B705C" },

  chevronBg: {
    width: 28,
    height: 28,
    backgroundColor: "#FCF9F1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E0D5",
  },

  cardFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    paddingTop: 10,
  },

  price: { fontWeight: "900", fontSize: 14, color: "#1A1A1A" },

  rating: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontSize: 11, fontWeight: "900", color: "#1A1A1A" },

  empty: {
    alignItems: "center",
    padding: 48,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4AF3750",
    borderRadius: 40,
    backgroundColor: "rgba(212, 175, 55, 0.02)",
  },

  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: { fontSize: 18, fontWeight: "900", color: "#1A1A1A" },
  emptyText: {
    fontSize: 13,
    color: "#6B705C",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },

  resetBtn: {
    marginTop: 24,
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  resetText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 2,
  },
});
