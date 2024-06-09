import { investmentPlanQueries } from "@/app/services/queries";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@/context/AuthContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const { data } = investmentPlanQueries.useInvestmentPlan(user?.id);

  console.log("INVESTMENT PLAN", data);

  return (
    <ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <View style={styles.transactions}>
        {data?.data.length === 0 && <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>}
        {data?.data?.map((invest) => (
          <View
            key={invest.id}
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              backgroundColor: "#eeeeee",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "400" }}>{invest.name}</Text>
            </View>

            <View style={styles.details}>
              <View>
                <Text style={styles.title}>Investable Amount</Text>
                <Text style={styles.subtitle}>{invest.amount}</Text>
              </View>

              <View>
                <Text style={styles.title}>Investment Status</Text>
                <Text style={styles.subtitle}>{invest.status}</Text>
              </View>

              <View>
                <Text style={styles.title}>Details</Text>
                <TouchableOpacity
                  style={[defaultStyles.pillButtonXs, { backgroundColor: Colors.primary, marginVertical: 5 }]}
                  onPress={() => {
                    queryClient.setQueryData(["investment", invest.id], invest);
                    router.push({
                      pathname: `(authenticated)/investmentDetails/${invest.id}`,
                    });
                  }}
                >
                  <Text style={[defaultStyles.buttonTextXs, { color: Colors.lightGray }]}>View</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.title}>Contract</Text>
                <TouchableOpacity style={[defaultStyles.pillButtonXs, { backgroundColor: Colors.primary, marginVertical: 5 }]}>
                  <Text style={[defaultStyles.buttonTextXs, { color: Colors.lightGray }]}>View</Text>
                </TouchableOpacity>
              </View>
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
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 12,
    color: Colors.gray,
  },
  subtitle: {
    color: Colors.secondary,
  },
  button: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
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
