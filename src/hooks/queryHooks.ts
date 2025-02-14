import {  IUser } from "@/api/_types/apiModels";
import {  getApi, getApiJWT } from "@/api/apis";
import {  useQuery, useSuspenseQuery } from "@tanstack/react-query";

// uesUserInfo에서 이름변경
export const useAuthUser = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      console.log("authUser 쿼리캐싱")
      return await getApiJWT<IUser>('/auth-user')},
    staleTime: Infinity,
    // gcTime: 1000,
    // refetchInterval: 1000
  });
};


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
export const useUsersInfo = <T>(userId: string | undefined) => {
  if(!userId) console.error('user 정보가 없습니다!');
  return useSuspenseQuery({
    queryKey: [`users/${userId}`],
    queryFn: async ()=> {
      console.log("useUsersInfo 쿼리캐싱")

      return await getApi<T>(`/users/${userId}`)
    },
    staleTime: Infinity,
  })
}
