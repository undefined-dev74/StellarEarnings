import { useQuery } from "@tanstack/react-query";
import { investmentPlanService } from "..";

const { getInvestmentPlans } = investmentPlanService;

const useInvestmentPlan = (userId) => {
  return useQuery({
    queryKey: ["investment-plan", userId],
    queryFn: getInvestmentPlans,
  });
};

export default { useInvestmentPlan };
