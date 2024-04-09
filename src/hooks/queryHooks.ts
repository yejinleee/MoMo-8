import { IPost, IUser } from "@/api/_types/apiModels";
import { getApi, getApiJWT } from "@/api/apis";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      console.log("USERINFO 쿼리캐싱")
      return await getApiJWT<IUser>('/auth-user')},
    staleTime: Infinity,
    // gcTime: 1000,
    // refetchInterval: 1000
  });
};

export const useUnscheduledCards = (unscheduledChannelId: string) => {
  return useQuery({
    queryKey: ['unscheduledCards'],
    queryFn: async ()=>{
      return await getApi<IPost[]>(`/posts/channel/${unscheduledChannelId}`)
    },
  })
}
