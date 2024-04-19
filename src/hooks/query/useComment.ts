import { IpostCommentParams } from "@/_redux/slices/postSlices/getPostSlice";
import { IComment } from "@/api/_types/apiModels";
import { deleteApiJWT, postApiJWT } from "@/api/apis";
import { createNotification } from "@/api/createNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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