import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFDF0" },
  bg: { flex: 1 },

  container: {
    padding: 16,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 32,
    overflow: "hidden",
    marginBottom: 24,
  },

  cover: {
    height: 120,
    backgroundColor: "#5c1616",
  },

  avatarWrap: {
    position: "absolute",
    bottom: -52,
    left: 20,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 24,
  },

  avatar: {
    width: 96,
    height: 96,
    backgroundColor: "#FBBF24",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  headerIcons: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  content: {
    paddingTop: 68,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  name: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A1A1A",
  },

  username: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "700",
    color: "#6B705C",
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F4F1EA",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },

  editText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A1A1A",
  },

  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6B705C",
  },

  bio: {
    marginTop: 18,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: "italic",
    color: "#7A6B44",
    textAlign: "left",
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },

  locationText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B705C",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E0D5",
    paddingVertical: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  secondaryText: {
    fontWeight: "800",
    fontSize: 12,
    color: "#1A1A1A",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    color: "#1A1A1A",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },

  bookCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 12,
  },

  bookCover: {
    height: 120,
    backgroundColor: "#FFF9E5",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  bookTitle: {
    marginTop: 8,
    fontWeight: "800",
    fontSize: 13,
    color: "#1A1A1A",
  },

  bookAuthor: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B705C",
  },

  bookPrice: {
    marginTop: 6,
    fontWeight: "800",
    fontSize: 12,
    color: "#B07D05",
  },
});
