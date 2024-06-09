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
      title:
        "Mumbai Cable Manufacturing sales expansion project Earnings for installment 62",
      date: new Date(),
      type: "income",
    },
    {
      id: 2,
      amount: 422.71,
      count: 2,
      title: "Withdrawal of balance",
      date: new Date(),
      type: "Expenditure",
    },
    {
      id: 3,
      amount: 10,
      title: "Check-in Reward",
      date: new Date(),
      type: "income",
    },
    {
      id: 4,
      amount: 200,
      count: 4,
      title:
        "Mumbai Cable Manufacturing sales expansion project Earnings for installment 61",
      date: new Date(),
      type: "income",
    },
    {
      id: 5,
      amount: 200,
      count: 5,
      title:
        "Mumbai Cable Manufacturing sales expansion project Earnings for installment 60",
      date: new Date(),
      type: "income",
    },
    {
      id: 6,
      amount: 200,
      count: 6,
      title:
        "Mumbai Cable Manufacturing sales expansion project Earnings for installment 59",
      date: new Date(),
      type: "income",
    },
    {
      id: 7,
      amount: 200,
      count: 7,
      title:
        "Mumbai Cable Manufacturing sales expansion project Earnings for installment 58",
      date: new Date(),
      type: "income",
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
                {transaction.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: transaction.type === "income" ? "green" : "red",
                }}
              >
                {transaction.type === "income"
                  ? `+${transaction.amount}`
                  : `-${transaction.amount}`}
              </Text>
              <Text style={{ fontWeight: "400", fontSize: 10 }}>
                {transaction.type}
              </Text>
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
});
export default Page;
