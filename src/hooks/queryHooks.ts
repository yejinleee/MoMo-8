import { IpostCommentParams, IputPostBody } from "@/_redux/slices/postSlices/getPostSlice";
import { IComment, IPost, IUser } from "@/api/_types/apiModels";
import { deleteApiJWT, getApi, getApiJWT, postApiJWT, putApiJWT } from "@/api/apis";
import { createNotification } from "@/api/createNotification";
import { createFormData } from "@/utils/createFormData";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";

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

// export const usePostDetail2= <IPost>(postId: string) => {
//   if(!postId) console.error('postId 정보가 없습니다!');
//   return useSuspenseQuery<AxiosResponse<IPost>, Error,string>({
//     queryKey: [`posts/${postId}`, postId],
//     queryFn: async ()=> {
//       console.log("usePostDetail 쿼리캐싱")

//       return await getApi<IPost>(`/posts/${postId}`)
//     },
//     staleTime: Infinity,
//     select: data => {
//       return data.data.title
//       // 타입 가드 어떻게 해야할까요 !!!!!!!!!!!!!!!!!
//     }
//   })
// }

export const usePutPostDetail = (postId?: string) =>{
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (body: IputPostBody) => await  putApiJWT<IPost, FormData>(
      `/posts/update`,
      createFormData(body),
    ),
    onSuccess: async () =>{
      await queryClient.invalidateQueries({
        queryKey: [`posts/${postId}`, postId],
      });
    }
  })
  return {mutate}
}

export const usePostComment = ({ postId, postAuthorId } : IpostCommentParams) => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn : async (comment:string) => await postApiJWT<IComment>('/comments/create', {comment, postId}),
    onSuccess: async (data) => {
      createNotification({
        notificationType: 'COMMENT',
        notificationTypeId: data.data._id,
        userId: postAuthorId,
        postId,
      });
      await queryClient.invalidateQueries({
        queryKey: [`posts/${postId}`, postId],
      });
    }
  });
  return { mutate }
}

export const useDeleteComment = (postId: string) =>{
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (commentId:string) => await deleteApiJWT<IComment>('/comments/delete', {id: commentId}),
    onSuccess: async () =>{
      await queryClient.invalidateQueries({
        queryKey: [`posts/${postId}`, postId],
      });
    }
  })
  return {mutate}
}