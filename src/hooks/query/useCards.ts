import { IPost } from "@/api/_types/apiModels";
import { getApi } from "@/api/apis";
import { unscheduledChannelId } from "@/pages/MainPage/channelId";
import { useQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";

export const useGetScheduledCards = (thisWeek: string[]) => {
  const fetchCard = async(day : string) => {
    const cardsOfEachDay = await getApi<IPost[]>(
      `/search/all/meetDate....${day.slice(0, 10)}...:.........."],"people`,
    );
    return cardsOfEachDay.data
  }
  return useSuspenseQueries({
    queries: 
      thisWeek.map((day) => ({
        queryKey : ['scheduledCard', day],
        queryFn: () => fetchCard(day),
        staleTime: Infinity,
      })),
    combine : (results) => {
      return results.map(result => result.data)
    }
  })
}

export const useGetUnscheduledCards = () => {
  return useSuspenseQuery({
    queryKey: ['unscheduledCard'],
    queryFn: async () => {
      return await getApi<IPost[]>(`/posts/channel/${unscheduledChannelId}`)
    },
    staleTime: Infinity,
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