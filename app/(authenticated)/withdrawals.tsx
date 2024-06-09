import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { format } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const transactions = [
    {
      time: format(new Date(), "dd-mm-yyyy hh:mm:s"),
      amount: 264.55,
      fee: 16.34,
      status: "success",
    },
    {
      time: format(new Date(), "dd-mm-yyyy hh:mm:s"),
      amount: 264.55,
      fee: 16.34,
      status: "success",
    },
    {
      time: format(new Date(), "dd-mm-yyyy hh:mm:s"),
      amount: 264.55,
      fee: 16.34,
      status: "success",
    },
  ];
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <View style={styles.container}>
        <View style={styles.columns}>
          <Text>Time</Text>
          <Text>Amount</Text>
          <Text>Fee</Text>
          <Text>Status</Text>
        </View>
        {transactions.map((item) => (
          <View style={styles.row} key={item.time}>
            <Text style={styles.rowText}>{item.time}</Text>
            <Text style={styles.rowText}>{item.amount}</Text>
            <Text
              style={[
                styles.rowText,
                { alignSelf: "center", justifyContent: "center" },
              ]}
            >
              {item.fee}
            </Text>
            <Text
              style={[
                styles.rowText,
                { color: item.status === "success" ? "green" : "" },
              ]}
            >
              {item.status === "success" ? "Withdraw Successful" : "Pending"}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#eeeeee",
    borderRadius: 10,
    padding: 10,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    alignContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    textAlign: "center",
  },
  rowText: {
    fontSize: 10,
  },
});
export default Page;
