import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFDF0",
  },

  header: {
    height: 110,
    backgroundColor: "#5c1616",
  },

  headerActions: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
  },

  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 8,
    borderRadius: 20,
  },

  avatarContainer: {
    alignItems: "center",
    marginTop: -45,
  },

  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#FBBF24",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },

  avatarPlus: {
    position: "absolute",
    bottom: -6,
    right: -6,
    backgroundColor: "#1A1A1A",
    padding: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 28,
    padding: 20,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  
  nameBlock: {
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A1A1A",
    textAlign: "center",
  },

  username: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#6B705C",
    textAlign: "center",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  stat: {
    alignItems: "center",
    width: 100,
  },

  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#E5E0D5",
    marginHorizontal: 20,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "900",
  },

  statLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: "#A5A58D",
    marginTop: 2,
  },

  bio: {
    marginTop: 18,
    fontSize: 13,
    color: "#7A6B44",
    fontStyle: "italic",
    textAlign: "center",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
  },

  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E0D5",
    paddingVertical: 14,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  secondaryText: {
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
  },

  sectionHeader: {
    marginTop: 30,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  searchBox: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E0D5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },

  historyCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3EEE0",
  },

  bookIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF9E5",
    alignItems: "center",
    justifyContent: "center",
  },

  historyText: {
    flex: 1,
  },

  bookTitle: {
    fontSize: 14,
    fontWeight: "900",
  },

  toRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },

  toText: {
    fontSize: 11,
    color: "#B07D05",
    fontWeight: "700",
  },

  date: {
    fontSize: 10,
    color: "#A5A58D",
    marginTop: 2,
  },
});
