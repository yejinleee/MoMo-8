import styled from '@emotion/styled';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '@/_redux/hooks';
import { ILike, IPost, IPostTitleCustom } from '@/api/_types/apiModels';
import { deleteApiJWT, postApiJWT } from '@/api/apis';
import { useHover } from '@/hooks/useHover';
import { theme } from '@/style/theme';
import { parseTitle } from '@/utils/parseTitle';
import { Icon } from '@common/Icon/Icon';
import { Profile } from '@common/Profile/Profile';
import { Tag } from '@common/Tag/Tag';

interface ICardData {
  cardData: IPost;
  handleCardClick: (cardId: string) => void;
}

const statusValue = {
  Opened: '모집 중',
  Scheduled: '모임 예정',
  Closed: '모임 종료',
};

export const Card = ({ cardData, handleCardClick }: ICardData) => {
  const parsedTitle: IPostTitleCustom = parseTitle(cardData.title);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.user);

  const { likes, _id: cardId, image } = cardData;
  const { postTitle, status, tags, meetDate, author } = parsedTitle;

  let isLiked = '';

  likes?.forEach((each) => {
    if (typeof each === 'string') {
      if (
        userInfo &&
        userInfo?.likes.some((eachLike) => eachLike._id === each)
      ) {
        isLiked = each;
      }
    } else {
      if (each.user === userInfo?._id) {
        isLiked = each._id;
      }
    }
  });
  const { hoverRef, isHovered } = useHover();

  const [isLike, setIsLike] = useState(isLiked);
  useEffect(() => {
    setIsLike(isLiked);
  }, [isLiked]);

  const handleIconClick = async (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!userInfo) {
      if (confirm('로그인하세요')) {
        navigate('/login');
      }
      return;
    }
    if (!isLike) {
      await postApiJWT<ILike>('/likes/create', {
        postId: cardId,
      })
        .then((res) => {
          console.log(res);
          setIsLike(res.data._id);
        })
        .catch((err) => console.log(err));
    } else {
      await deleteApiJWT<ILike>('/likes/delete', {
        id: isLike,
      })
        .then((res) => {
          console.log(res);
          setIsLike('');
        })
        .catch((err) => console.log(err));
    }
  };
  const colorStyle = {
    color:
      status === 'Opened'
        ? theme.colors.primaryBlue.default
        : theme.colors.secondaryNavy.default,
  };

  return (
    <>
      <StCardContainer
        onClick={() => handleCardClick(cardId)}
        status={status}
        ref={hoverRef}>
        {isHovered ? (
          <StCardStatus>{statusValue[status]}</StCardStatus>
        ) : (
          <StCardProfileWrapper>
            <Profile
              image={image || ''}
              fullName={author}
              _id="1"
              status="Profile"
              fontSize={12}
              imageSize={14}
              maxWidth={50}
            />
          </StCardProfileWrapper>
        )}

        <StCardTitle style={colorStyle}>{postTitle}</StCardTitle>
        <StCardDate style={colorStyle}>
          {meetDate.length === 1 && (
            <>
              <Icon
                name="calendar"
                stroke={
                  status === 'Opened'
                    ? theme.colors.primaryBlue.default
                    : theme.colors.secondaryNavy.default
                }
              />
              {meetDate[0].slice(0, 16)}
            </>
          )}
        </StCardDate>
        <StCardBottom>
          <StCardBottomTagsWrap>
            <Tag
              name={tags[0]}
              height={20}
              fontSize={12}
              padding={8}
            />
            {tags.length > 1 && <span>...</span>}
          </StCardBottomTagsWrap>
          {!isLike ? (
            <Icon
              name="heart"
              onIconClick={(e: MouseEvent<HTMLElement>) =>
                void handleIconClick(e)
              }
            />
          ) : (
            <Icon
              name="heart"
              isFill={true}
              onIconClick={(e: MouseEvent<HTMLElement>) =>
                void handleIconClick(e)
              }
            />
          )}
        </StCardBottom>
      </StCardContainer>
    </>
  );
};

const StCardContainer = styled.div<{ status: string }>`
  position: relative;
  width: 274px;
  height: 110px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.grey.light};
  background-color: ${({ theme }) => theme.colors.semiWhite};
  border-radius: 8px;
  padding: 10px 14px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: #f1f2f3;
  }
  opacity: ${({ status }) => status === 'Closed' && 0.5};
`;
const StCardProfileWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 7px;
  width: 74px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;
const StCardStatus = styled.div<{ children: string }>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 74px;
  display: flex;
  height: 30px;
  border-radius: 0px 8px 0px 0px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, children }) =>
    children === '모집 중'
      ? theme.colors.primaryBlue.default
      : theme.colors.secondaryNavy.default};
  color: ${(props) => props.theme.colors.beige};
  font-size: 14px;
`;
const StCardTitle = styled.div`
  font-size: 16px;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StCardDate = styled.div`
  font-size: 12px;
  flex-grow: 1;
  padding: 4px 0px;
  display: flex;
  align-items: center;
`;
const StCardBottom = styled.div`
  display: flex;
  font-size: 12px;
`;
const StCardBottomTagsWrap = styled.div`
  display: flex;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.secondaryNavy};
`;
