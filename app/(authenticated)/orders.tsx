import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Page = () => {
  const headerHeight = useHeaderHeight();

  let transactions = [
    {
      id: 1,
      amount: 200,
      count: 1,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 2,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 3,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 4,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 5,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 6,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 7,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 8,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 9,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 10,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 11,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 12,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
    {
      id: 1,
      amount: 200,
      count: 13,
      title: "The issue Mumbai Cable Manufacturing sales expansion project",
      date: new Date(),
      status: "completed",
    },
  ];
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions yet
          </Text>
        )}
        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            {/* <View style={styles.circle}>
              <Ionicons name={"cash-outline"} size={24} color={Colors.dark} />
            </View> */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.date.toLocaleString()}
              </Text>
              <Text style={{ fontWeight: "400", marginTop: 10 }}>
                {transaction.count} {transaction.title}
              </Text>
            </View>
            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text style={styles.amount}>{transaction.amount}</Text>
              <Text style={styles.status}>{transaction.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  transactions: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
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
  amount: {
    color: Colors.secondary,
  },
  status: {
    color: "green",
  },
});
export default Page;
