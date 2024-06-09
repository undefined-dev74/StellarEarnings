import { investmentPlanService } from "@/app/services";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { Circle, useFont } from "@shopify/react-native-skia";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDate } from "date-fns";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";
import { useChartPressState } from "victory-native";
const categories = ["Overview", "News", "Orders", "Transactions"];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Page = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(isActive);
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  //   const { data } = useQuery({
  //     queryKey: ["info", id],
  //     queryFn: async () => {
  //       const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
  //       //   return info[+id];
  //       return info;
  //     },
  //   });

  const { data } = useQuery({
    queryKey: ["investment-ledger", id],
    queryFn: () => investmentPlanService.getInvestmentLedger(parseInt(id)),
    staleTime: 0,
  });

  const investmentById = queryClient.getQueryData(["investment-details", id]);
  console.log("INVESTMENT DETAILS BY ID", investmentById);

  // console.log("DATA", data);
  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  const investmentDetails = {
    amount: 1000,
    expectedAmount: 5499,
    time: format(new Date(), "dd-mm-yyyy"),
    maturity: format(new Date(), "dd-mm-yyyy"),
  };

  const BottomBorder = () => {
    return (
      <View
        style={{
          borderBottomColor: Colors.lightGray,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    );
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <View style={styles.container}>
        <View style={styles.details}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Investment Amount</Text>
            <Text style={{ color: Colors.secondary }}>{investmentDetails.amount}Rs</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemText}>Expected Amount</Text>
            <Text style={{ color: Colors.secondary }}>{investmentDetails.expectedAmount}Rs</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemText}>Investment Time</Text>
            <Text>{investmentDetails.time}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Maturity </Text>
            <Text>{investmentDetails.maturity}</Text>
          </View>
        </View>
        <BottomBorder />
        <View style={styles.description}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: Colors.primary,
            }}
          >
            Earning Method
          </Text>
          <Text style={{ fontSize: 10 }}>Interest are paid daily. principle are paid on due day.</Text>
        </View>

        {data?.data.map((item, idx) => (
          <View key={item.id} style={styles.investment}>
            <View style={styles.firstRow}>
              <View style={styles.item}>
                <Text style={styles.itemText}>Number</Text>
                <Text style={[styles.investmentText, { color: Colors.secondary }]}>{idx + 1}</Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>Principle</Text>
                <Text style={[styles.investmentText, { color: Colors.secondary }]}>{item.principal}</Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>Interest</Text>
                <Text style={styles.investmentText}>{item.interest}</Text>
              </View>
              <View style={[styles.item]}>
                <Text style={styles.itemText}>Due Date</Text>
                <Text style={[styles.investmentText]}>{formatDate(item.dueDate, "dd-mm-yyyy hh:mm:ss")}</Text>
              </View>
            </View>
            <BottomBorder />

            <View style={styles.secondRow}>
              <View style={styles.item}>
                <Text style={styles.itemText}>Status</Text>
                <Text
                  style={[
                    styles.investmentText,
                    {
                      color: item.status === "Completed" ? "green" : Colors.secondary,
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>Receivable</Text>
                <Text style={[styles.investmentText, { color: Colors.secondary }]}>{item.receivable}</Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>Paid</Text>
                <Text style={styles.investmentText}>{item.paid}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>Earnings Date</Text>
                <Text
                  style={[
                    styles.investmentText,
                    {
                      color: item.status === "Completed" ? "green" : Colors.secondary,
                    },
                  ]}
                >
                  {formatDate(item.earningDate, "dd-mm-yyyy hh:mm:ss")}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 20,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    columnGap: 10,
  },
  description: {
    backgroundColor: "#eeeeee",
    borderRadius: 5,
    padding: 10,
  },
  item: {
    flex: 1,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  itemText: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.gray,
    textAlign: "center",
  },
  investment: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 10,
    columnGap: 10,
    backgroundColor: "#eeeeee",
    borderRadius: 10,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  investmentText: {
    fontSize: 10,
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
export default Page;
