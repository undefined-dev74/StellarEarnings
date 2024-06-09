import { useQuery } from "@tanstack/react-query";
import { userService } from "..";

const useUserBalance = () => {
  return useQuery({
    queryFn: userService.getUserBalance,
    queryKey: ["user", 1],
  });
};

export default { useUserBalance };
