import Dropdown from "@/components/Dropdown";
import RoundBtn from "@/components/RoundBtn";
import WidgetList from "@/components/SortableList/WidgetList";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const onAddMoney = () => {
    // runTransaction({
    //   id: Math.random().toString(),
    //   amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
    //   date: new Date(),
    //   title: "Added money",
    // });

    router.push({ pathname: "/(authenticated)/(tabs)/invest" });
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.user}>User:</Text>
          <Text style={styles.userId}>885454545</Text>
          <Text style={styles.currency}>Account Balance:</Text>
          <Text style={styles.balance}>{balance()}</Text>
        </View>
        <View style={styles.accountDetails}>
          <View style={styles.userSubscriptionDetails}>
            <Text>User Level</Text>
            <Text>VIP 1</Text>
          </View>
          <View style={styles.userSubscriptionDetails}>
            <Text>Growth Value</Text>
            <Text>2000</Text>
          </View>
          <View style={styles.userSubscriptionDetails}>
            <Text>Account Points</Text>
            <Text>2000</Text>
          </View>
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            style={[
              defaultStyles.pillButtonSmall,
              { backgroundColor: Colors.primary, marginVertical: 20 },
            ]}
          >
            <Text
              style={[
                defaultStyles.buttonTextSmall,
                { color: Colors.lightGray },
              ]}
            >
              Recharge
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              defaultStyles.pillButtonSmall,
              { backgroundColor: Colors.secondary, marginVertical: 20 },
            ]}
          >
            <Text
              style={[
                defaultStyles.buttonTextSmall,
                { color: Colors.lightGray },
              ]}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn
          icon={"cash-outline"}
          text={"Invest Record"}
          onPress={onAddMoney}
        />
        <RoundBtn
          icon={"file-tray-full-outline"}
          text={"Deposit Record"}
          onPress={() => router.push({ pathname: "(authenticated)/deposit" })}
        />
        <RoundBtn
          icon={"file-tray-stacked-outline"}
          text={"Order Record"}
          onPress={() => router.push({ pathname: "(authenticated)/orders" })}
        />
        <RoundBtn icon={"checkmark-circle-outline"} text={"Check-in"} />
        <RoundBtn
          icon={"wallet-outline"}
          text={"Withdraw Record"}
          onPress={() =>
            router.push({ pathname: "(authenticated)/withdrawals" })
          }
        />
        <Dropdown />
      </View>
      <Text style={defaultStyles.sectionHeader}>Security</Text>

      <View style={styles.actionRow}>
        <RoundBtn
          icon={"shield-checkmark-outline"}
          text={"Change Password"}
          onPress={() => router.push({ pathname: "(authenticated)/deposit" })}
        />
        <RoundBtn
          icon={"key-outline"}
          text={"Payment Password"}
          onPress={() => router.push({ pathname: "(authenticated)/deposit" })}
        />
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  account: {
    margin: 30,
    alignItems: "center",
    flexDirection: "column",
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
  },
  user: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userId: {
    fontSize: 13,
    color: Colors.secondary,
  },
  accountDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 40,
    marginVertical: 10,
  },
  userSubscriptionDetails: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  balance: {
    fontSize: 13,
    color: Colors.secondary,
  },
  currency: {
    fontSize: 15,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Page;
