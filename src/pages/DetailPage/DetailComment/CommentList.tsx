import { useState } from 'react';
import { isIComment } from '../IsIComment';
// import { deleteComment } from '@/_redux/slices/postSlices/getPostSlice';
import { IComment,  IUser } from '@/api/_types/apiModels';
import { Comment, } from '@common/index';
import { useDeleteComment } from '@/hooks/query/useComment';

interface CommentListProps {
  comments: IComment[] | string[];
  loginUser: IUser | null;
  postId : string;
}

export const CommentList = ({ comments, loginUser,postId }: CommentListProps) => {
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly');
  // const dispatch = useDispatch();

  const handleEditChange = () => {
    mode === 'readonly' ? setMode('edit') : setMode('readonly');
  };

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
