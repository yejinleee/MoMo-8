import { IPost } from "@/api/_types/apiModels";
import { getApi } from "@/api/apis";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

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