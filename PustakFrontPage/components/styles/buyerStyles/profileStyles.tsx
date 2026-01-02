import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = (size: number) => (SCREEN_WIDTH / 375) * size;

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFDF0",
  },

  topSection: {
    height: scale(160),
    backgroundColor: "#5c1616",
    paddingTop: scale(20),
  },

  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: scale(20),
    gap: scale(12),
  },

  iconBtn: {
    width: scale(40),
    height: scale(40),
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",
    top: scale(10),
    right: scale(10),
    width: scale(8),
    height: scale(8),
    backgroundColor: "#FBBF24",
    borderRadius: scale(4),
    borderWidth: scale(2),
    borderColor: "#5c1616",
  },

  profileCard: {
    backgroundColor: "#fff",
    marginTop: scale(-60),
    marginHorizontal: scale(20),
    borderRadius: scale(32),
    padding: scale(24),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#5c1616",
        shadowOffset: { width: 0, height: scale(10) },
        shadowOpacity: 0.1,
        shadowRadius: scale(20),
      },
      android: { elevation: 10 },
    }),
  },

  avatarContainer: {
    marginTop: scale(-65),
    marginBottom: scale(16),
  },

  avatarWrap: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(35),
    backgroundColor: "#FBBF24",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(5),
    borderColor: "#fff",
  },

  avatarPlus: {
    position: "absolute",
    bottom: scale(2),
    right: scale(2),
    backgroundColor: "#1A1A1A",
    width: scale(28),
    height: scale(28),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(3),
    borderColor: "#fff",
  },

  identityBlock: {
    alignItems: "center",
    marginBottom: scale(20),
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },

  nameText: {
    fontSize: scale(24),
    fontWeight: "900",
    color: "#1A1A1A",
  },

  usernameText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#A5A58D",
    marginTop: scale(2),
  },

  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#F9F8F3",
    borderRadius: scale(20),
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    width: "100%",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  statNum: {
    fontSize: scale(18),
    fontWeight: "900",
    color: "#1A1A1A",
  },

  statLabel: {
    fontSize: scale(9),
    fontWeight: "800",
    color: "#A5A58D",
    letterSpacing: scale(1),
    marginTop: scale(2),
  },

  statPipe: {
    width: 1,
    height: "60%",
    backgroundColor: "#E5E0D5",
    alignSelf: "center",
  },

  bioContainer: {
    marginVertical: scale(20),
  },

  bioText: {
    fontSize: scale(13),
    color: "#6B705C",
    textAlign: "center",
    lineHeight: scale(20),
    paddingHorizontal: scale(10),
  },

  buttonRow: {
    flexDirection: "row",
    gap: scale(12),
    width: "100%",
  },

  btnPrimary: {
    flex: 1.2,
    backgroundColor: "#1A1A1A",
    height: scale(54),
    borderRadius: scale(18),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
  },

  btnTextPrimary: {
    color: "#fff",
    fontWeight: "900",
    fontSize: scale(11),
    letterSpacing: scale(1),
  },

  btnSecondary: {
    flex: 1,
    backgroundColor: "#FBBF24",
    height: scale(54),
    borderRadius: scale(18),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
  },

  btnTextSecondary: {
    color: "#1A1A1A",
    fontWeight: "900",
    fontSize: scale(11),
    letterSpacing: scale(1),
  },

  historySection: {
    padding: scale(20),
    marginTop: scale(10),
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },

  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  sectionTitle: {
    fontSize: scale(20),
    fontWeight: "900",
    color: "#1A1A1A",
  },

  historyCount: {
    fontSize: scale(12),
    color: "#A5A58D",
    fontWeight: "600",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
    height: scale(50),
    borderWidth: 1,
    borderColor: "#E5E0D5",
    marginBottom: scale(20),
  },

  searchInput: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: scale(14),
    fontWeight: "600",
    color: "#1A1A1A",
  },

  listContainer: {
    gap: scale(12),
  },

  historyItem: {
    backgroundColor: "#fff",
    padding: scale(16),
    borderRadius: scale(20),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0EFEA",
  },

  bookArt: {
    width: scale(50),
    height: scale(50),
    backgroundColor: "#FFF9E5",
    borderRadius: scale(14),
    alignItems: "center",
    justifyContent: "center",
  },

  typeIndicator: {
    position: "absolute",
    top: scale(-2),
    right: scale(-2),
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    borderWidth: scale(2),
    borderColor: "#fff",
  },

  historyDetails: {
    flex: 1,
    marginLeft: scale(16),
  },

  historyBookTitle: {
    fontSize: scale(15),
    fontWeight: "800",
    color: "#1A1A1A",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(4),
  },

  metaLabel: {
    fontSize: scale(12),
    color: "#A5A58D",
  },

  metaUser: {
    fontSize: scale(12),
    color: "#B07D05",
    fontWeight: "700",
    marginLeft: scale(4),
  },

  miniDot: {
    width: scale(3),
    height: scale(3),
    borderRadius: scale(2),
    backgroundColor: "#DCDAD1",
    marginHorizontal: scale(8),
  },

  metaDate: {
    fontSize: scale(11),
    color: "#A5A58D",
  },
});
