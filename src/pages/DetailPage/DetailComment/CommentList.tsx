import { useState } from 'react';
import { isIComment } from '../IsIComment';
import { useDispatch } from '@/_redux/hooks';
import { deleteComment } from '@/_redux/slices/postSlices/getPostSlice';
import { IComment, IPost, IUser } from '@/api/_types/apiModels';
import { Comment, Spinner } from '@common/index';
import { useDeleteComment } from '@/hooks/queryHooks';
import { useQueryClient } from '@tanstack/react-query';
import { IQueryData } from '../DetailMeetDescription';

interface CommentListProps {
  comments: IComment[] | string[];
  loginUser: IUser | null;
  postId : string;
}

export const CommentList = ({ comments, loginUser,postId }: CommentListProps) => {
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly');
  const dispatch = useDispatch();

  const handleEditChange = () => {
    mode === 'readonly' ? setMode('edit') : setMode('readonly');
  };

  const queryClient = useQueryClient();
  const { mutate } = useDeleteComment(postId)
  
  console.log(comments)
  const handleDeleteClick = (id: string) => {
    const isDelete = confirm('댓글을 삭제하시겠습니까?');
    if (!isDelete) return;
    // void dispatch(deleteComment(id));
    mutate(id)
  };
  return (
    isIComment(comments) &&
    comments.map((comment) => { //idx를 key로 쓰지말자 ^^
      return (
        !comment.comment.startsWith('@VOTE') && (
          <Comment
            key={comment._id}
            _id={comment.author._id}
            image={comment.author.image as string}
            author={comment.author.fullName}
            createdAt={comment.createdAt}
            isMine={
              loginUser === null ? false : comment.author._id === loginUser._id
            }
            mode={mode}
            comment={comment.comment}
            nickname={comment.author.username}
            handleEditChange={handleEditChange}
            handleDeleteClick={() => handleDeleteClick(comment._id)}
          />
        )
      );
    })
  );
};
