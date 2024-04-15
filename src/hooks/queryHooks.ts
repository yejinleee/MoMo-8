import { IPost, IUser } from "@/api/_types/apiModels";
import { getApi, getApiJWT } from "@/api/apis";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

export const usePostDetail= <T>(postId: string) => {
  if(!postId) console.error('postId 정보가 없습니다!');
  return useSuspenseQuery({
    queryKey: [`posts/${postId}`, postId],
    queryFn: async ()=> {
      console.log("usePostDetail 쿼리캐싱")

      return await getApi<T>(`/posts/${postId}`)
    },
    staleTime: Infinity,
  })
}