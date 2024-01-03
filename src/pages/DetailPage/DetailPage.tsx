import styled from '@emotion/styled';
import { useState } from 'react';
import { DetailMeetDescription } from './DetailMeetDescription';
import { DetailPost } from './DetailPost/DetailPost';
import { DetailTab } from './DetailTab';
import { StSideMarginWrapper } from '@/style/StSideMarginWrapper';

export const DetailPage = () => {
  const [isPostPage, setIsPostPage] = useState(true);
  const handleTabClick = () => {
    setIsPostPage(!isPostPage);
  };

  return (
    <StSideMarginWrapper>
      <StDetailContainer>
        {/* 타이틀, 생성 시간 */}
        <DetailMeetDescription />
        {/* 탭 */}
        <DetailTab
          isPostPage={isPostPage}
          handleTabClick={handleTabClick}
        />
        {/* 본문 내용 */}
        <DetailPost isPostPage={isPostPage} />
        <hr />
      </StDetailContainer>
    </StSideMarginWrapper>
  );
};

const StDetailContainer = styled.div`
  padding: 32px;
`;
