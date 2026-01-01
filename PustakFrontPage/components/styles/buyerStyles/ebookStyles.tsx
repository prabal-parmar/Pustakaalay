import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAF9F4" },

  header: {
    width: "100%",
    paddingHorizontal: width * 0.06,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleGroup: { flex: 1 },
  title: { fontSize: 26, fontWeight: "800", color: "#1A1A1A" },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#B07D05",
    letterSpacing: 0.8,
  },
  postBtn: {
    backgroundColor: "#1A1A1A",
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: { paddingHorizontal: width * 0.06, marginBottom: 15 },
  searchBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: "#EBE9E0",
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: "#1A1A1A" },

  infoBanner: {
    marginHorizontal: width * 0.06,
    backgroundColor: "#FEF7E6",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F3EAD3",
  },
  infoContent: { flex: 1 },
  infoTitle: { color: "#7A5E10", fontSize: 13, fontWeight: "700" },
  infoText: { color: "#947A30", fontSize: 11, marginTop: 1 },

  listContainer: { paddingHorizontal: width * 0.05 },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 4,
  },
  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A5A58D",
    letterSpacing: 1,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#EEECE1", marginLeft: 15 },

  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },

  coverSection: {
    width: width * 0.22,
    aspectRatio: 0.75,
  },
  cover: {
    flex: 1,
    backgroundColor: "#F9F8F3",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F0EFEA",
  },
  pdfTag: {
    position: "absolute",
    bottom: 6,
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pdfTagText: { color: "#FFF", fontSize: 7, fontWeight: "900" },

  cardBody: { flex: 1, justifyContent: "space-between" },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  genreTag: {
    fontSize: 9,
    fontWeight: "800",
    color: "#9A9A8C",
    backgroundColor: "#F5F4EE",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 2,
  },
  authorName: { fontSize: 12, color: "#A5A58D" },
  description: { fontSize: 11, color: "#6B705C", marginTop: 4, lineHeight: 15 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  statsGroup: { flexDirection: "row", gap: 10 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  statText: { fontSize: 11, color: "#6B705C", fontWeight: "600" },

  readBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FBBF24",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  readBtnText: { fontSize: 10, fontWeight: "900", color: "#1A1A1A" },
});
