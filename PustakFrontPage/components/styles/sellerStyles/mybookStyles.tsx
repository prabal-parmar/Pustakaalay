import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFDF0" },

  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 22, fontWeight: "900", color: "#1A1A1A" },
  subtitle: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    color: "#B07D05",
    marginTop: 4,
  },

  addBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#1A1A1A",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
  },

  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },

  typeRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "#F4F1EA",
    padding: 6,
    borderRadius: 22,
    marginBottom: 16,
  },

  typeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 18,
  },

  typeBtnActive: { backgroundColor: "#1A1A1A" },

  typeText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6B705C",
  },

  typeTextActive: { color: "#fff" },

  genreRow: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  genrePill: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#F3EEE0",
  },

  genreActive: { backgroundColor: "#FBBF24" },

  genreText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6B705C",
    letterSpacing: 1,
  },

  genreTextActive: { color: "#1A1A1A" },

  countRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  countText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#6B705C",
  },

  list: { paddingHorizontal: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    gap: 14,
  },

  cover: {
    width: 60,
    height: 80,
    borderRadius: 18,
    backgroundColor: "#FFF9E5",
    alignItems: "center",
    justifyContent: "center",
  },

  sparkle: { position: "absolute", top: 4, right: 4 },

  cardContent: { flex: 1 },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bookTitle: { fontSize: 14, fontWeight: "900" },
  bookAuthor: { fontSize: 11, color: "#A5A58D", marginTop: 2 },

  cardFooter: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#F4F1EA",
    paddingTop: 8,
  },

  price: { fontWeight: "900", fontSize: 12 },

  rating: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontSize: 11, fontWeight: "900" },

  empty: {
    alignItems: "center",
    padding: 40,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#E5E0D5",
    borderRadius: 32,
  },

  emptyTitle: { marginTop: 10, fontWeight: "900" },
  emptyText: { fontSize: 11, color: "#6B705C", marginTop: 4 },
  reset: {
    marginTop: 16,
    fontSize: 10,
    fontWeight: "900",
    color: "#B07D05",
    letterSpacing: 2,
  },
});
