import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { transactionService } from "../services";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const { user } = useAuth();
  // const { data } = transactionQueries.useGetUserTransaction();

  const { data, failureReason } = useQuery({
    queryFn: transactionService.getUserTransactions,
    queryKey: ["get-user-transaction", user?.id],
  });
  console.log("DATA", data);
  let transactions = [
    {
      id: 1,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 2,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 3,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 4,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 5,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 6,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 7,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
    {
      id: 8,
      amount: 200,
      title: "Income",
      date: new Date(),
    },
  ];
  return (
    <ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <View style={styles.transactions}>
        {data?.data.length === 0 && <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>}
        {data?.data.map((transaction) => (
          <View key={transaction.id} style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={styles.circle}>
              <Ionicons name={"cash-outline"} size={24} color={Colors.dark} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "400" }}>{transaction.transactionType}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toLocaleString()}</Text>
            </View>
            <Text>{transaction.amount}</Text>
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
