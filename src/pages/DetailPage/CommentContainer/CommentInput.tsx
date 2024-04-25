import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector } from '@/_redux/hooks';
import { RootStateType } from '@/_redux/store';
import { usePostComment } from '@/hooks/query/useComment';
import { theme } from '@/style/theme';
import { Button, Profile } from '@common/index';

interface CommentInputProps {
  postId: string;
  postAuthorId: string;
}

export const CommentInput = ({ postId, postAuthorId }: CommentInputProps) => {
  const loginUser = useSelector((state: RootStateType) => state.userInfo).user;
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const { mutate } = usePostComment({ comment: text, postId, postAuthorId });
  const handleButtonClick = () => {
    if (!loginUser) {
      const isUserWantLogin = confirm('로그인이 필요한 서비스입니다.');
      isUserWantLogin && navigate('/login');
      return;
    }

    if (!text) {
      alert('댓글을 입력해주세요.');
      return;
    }

    mutate(text);
    setText('');
  };

  return (
    <StCommentInputContainer>
      <StCommentInputWrapper>
        <Profile
          status="ProfileImage"
          image={loginUser && loginUser.image ? loginUser.image : ''}
          imageSize={32}
          _id={loginUser ? loginUser._id : ''}
          fullName={loginUser ? loginUser.fullName : ''}
        />
        <TextareaAutosize
          className="commentTextarea"
          placeholder="댓글을 입력해 보세요."
          cacheMeasurements
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          handleButtonClick={handleButtonClick}
          label="등록"
          width={64}
          height={28}
        />
      </StCommentInputWrapper>
    </StCommentInputContainer>
  );
};

const StCommentInputContainer = styled.div`
  margin-top: 16px;
  padding: 16px;

  & .commentTextarea {
    margin: 0 10px;
    width: calc(100% - 116px);
    border: 1px solid ${theme.colors.grey.default};
    border-radius: 8px;
    padding: 16px;
    box-sizing: content-box;
    overflow: hidden;
  }
  & .commentTextarea::placeholder {
    color: ${theme.colors.grey.dark};
  }
  & .commentTextarea:focus {
    outline: none;
  }
`;

const StCommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
