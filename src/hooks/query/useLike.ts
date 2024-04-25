import { ILike } from "@/api/_types/apiModels";
import { postApiJWT } from "@/api/apis";
import { createNotification } from "@/api/createNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLike = ({cardId, postAuthorId}: {cardId:string, postAuthorId:string}) => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn : async (comment:string) => await postApiJWT<ILike>('/like/create', {postId: cardId}),
    onSuccess: async (data) => {
      createNotification({
        notificationType: 'LIKE',
        notificationTypeId: res.data._id,
        userId:
          typeof postAuthor === 'string' ? postAuthor : postAuthor._id,
        postId: cardId,
      });
      await queryClient.invalidateQueries({
        queryKey: [`posts/${postId}`, postId],
      });
    }
  });
  return { mutate }
}
