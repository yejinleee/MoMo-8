import { IputPostBody } from "@/_redux/slices/postSlices/getPostSlice";
import { IPost } from "@/api/_types/apiModels";
import { getApi, putApiJWT } from "@/api/apis";
import { createFormData } from "@/utils/createFormData";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

// 구)usePostDetail
// postId의 포스트를 get합니다 : IPost
export const useGetPostDetail=(postId: string) => {
  if(!postId) console.error('postId 정보가 없습니다!');
  return useSuspenseQuery({
    queryKey: [`posts/${postId}`, postId],
    queryFn: async ()=> {
      console.log("useGetPostDetail 쿼리캐싱")
      return await getApi<IPost>(`/posts/${postId}`)
    },
    staleTime: Infinity,
  })
}

// 구)usePutPostDetail
// postId의 포스트를 get합니다 : IPost
export const usePutPostDetail = (postId?: string) =>{
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (body: IputPostBody) => await putApiJWT<IPost, FormData>(
      `/posts/update`,
      createFormData(body),
    ),
    onSuccess: async () =>{
      await queryClient.invalidateQueries({
        queryKey: [`posts/${postId}`, postId],
      });
    }
  })
  return { mutate }
}