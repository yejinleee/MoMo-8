import styled from '@emotion/styled';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { theme } from '@/style/theme';
import { Button, Icon, Profile } from '@common/index';
import { FormatDate } from '@/pages/DetailPage/components/FormatDate';

interface CommentProps {
  _id: string;
  image: string;
  author: string;
  createdAt: string;
  isMine: boolean;
  comment: string;
  mode: 'readonly' | 'edit';
  nickname?: string;
  handleEditChange: () => void;
  handleDeleteClick: () => void;
}

export const Comment = ({
  _id,
  image,
  author,
  createdAt,
  isMine,
  mode,
  comment,
  nickname = '',
  handleEditChange,
  handleDeleteClick,
}: CommentProps) => {
  const [text, setText] = useState(comment);
  const [editText, setEditText] = useState('');

  const handleChangeBtnClick = () => {
    alert('수정되었습니다.');
    setText(editText);
    handleEditChange();
  };

  return (
    <StCommentContainer>
      <StCommentWrapper>
        <StCommentedUser>
          <Profile
            image={image}
            fullName={nickname || author}
            imageSize={32}
            fontSize={16}
            _id={_id}
          />
          <StCreatedAt>{`(${FormatDate(createdAt)})`}</StCreatedAt>
        </StCommentedUser>

        {isMine && (
          <StCommentedManage>
            {false && mode !== 'edit' && (
              <Icon
                onIconClick={handleEditChange}
                name="edit-3"
                size={18}
              />
            )}
            <Icon
              onIconClick={handleDeleteClick}
              name="x"
              size={18}
            />
          </StCommentedManage>
        )}
      </StCommentWrapper>

      {mode === 'readonly' && (
        <StCommentMessage>
          <pre>{text}</pre>
        </StCommentMessage>
      )}
      {mode === 'edit' && (
        <>
          <StTextarea>
            <TextareaAutosize
              className="commentTextarea"
              cacheMeasurements
              onChange={(e) => setEditText(e.target.value)}
              defaultValue={text}
            />
          </StTextarea>
          <StEditButtonWrapper>
            <Button
              handleButtonClick={handleEditChange}
              label="취소"
              width={64}
              height={28}
            />
            <Button
              handleButtonClick={handleChangeBtnClick}
              label="수정"
              width={64}
              height={28}
            />
          </StEditButtonWrapper>
        </>
      )}
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  padding: 16px;
`;

const StCommentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StCommentedUser = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const StCreatedAt = styled.span`
  color: ${({ theme }) => theme.colors.grey.default};
  font-size: 12px;
  margin-left: 8px;
`;

const StCommentedManage = styled.div`
  & span:last-of-type {
    margin-left: 10px;
  }
`;

const StCommentMessage = styled.div`
  margin-top: 8px;
  margin-left: 42px;
  width: calc(100% - 42px);
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grey.light};

  & pre {
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

const StTextarea = styled.div`
  margin-top: 8px;
  margin-left: 42px;

  & .commentTextarea {
    border: 1px solid ${theme.colors.grey.default};
    border-radius: 8px;
    padding: 15.5px;
    width: 100%;
  }
  & .commentTextarea::placeholder {
    color: ${theme.colors.grey.dark};
  }
  & .commentTextarea:focus {
    outline: none;
  }
`;

const StEditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  margin-left: 42px;

  & button:last-of-type {
    margin-left: 10px;
  }
`;
