import { IPost, IUser } from "@/api/_types/apiModels";
import { getApi, getApiJWT } from "@/api/apis";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

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
  return useSuspenseQuery({
    queryKey: ['unscheduledCards'],
    queryFn: async ()=>{
      return await getApi<IPost[]>(`/posts/channel/${unscheduledChannelId}`)
    },
  })
}

export const useMyJoinCards = (id: string | undefined) => {
  if(!id) console.error('user 정보가 없습니다!');
  return useQuery({
    queryKey: ['myJoinCards'],
    queryFn: async ()=> {
      return await getApi(`/users/${id}`)
    },
  })
}

export const usePostsAuthor = <T>(userId: string | undefined) => {
  if(!userId) console.error('user 정보가 없습니다!');
  return useSuspenseQuery({
    queryKey: [`posts/${userId}`],
    queryFn: async ()=> {
      return await getApi<T>(`/posts/author/${userId}`)
    },
    staleTime: Infinity,
  })
}