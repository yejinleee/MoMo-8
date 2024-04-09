import { IUser } from "@/api/_types/apiModels";
import { getApiJWT } from "@/api/apis";
import { useQuery } from "@tanstack/react-query";

export const  useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      console.log("USERINFO 쿼리캐싱")
      return await getApiJWT<IUser>('/auth-user')},
    // staleTime: 1000,
    // gcTime: 1000,
    // refetchInterval: 1000
  });
};