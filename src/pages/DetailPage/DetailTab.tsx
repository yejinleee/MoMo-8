import styled from '@emotion/styled';
import { Tab } from '@common/Tab/Tab';

interface DetailTabProps {
  pageNumber: number;
  handlePostClick: () => void;
  handleTimeTableClick: () => void;
}

export const DetailTab = ({
  pageNumber,
  handlePostClick,
  handleTimeTableClick,
}: DetailTabProps) => {
  return (
    <>
      <StTabContainer>
        <StTabWrapper>
          <Tab
            label={'본문'}
            width={480}
            isActive={pageNumber === 1}
            isJustify={true}
            handleTabClick={handlePostClick}
          />
        </StTabWrapper>
        <StTabWrapper>
          <Tab
            label={'타임테이블'}
            width={480}
            isActive={pageNumber === 2}
            isJustify={true}
            handleTabClick={handleTimeTableClick}
          />
        </StTabWrapper>
      </StTabContainer>
    </>
  );
};

const StTabContainer = styled.div`
  margin-top: 32px;
  display: flex;
`;

const StTabWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: end;
`;
