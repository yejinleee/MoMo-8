import styled from '@emotion/styled';
import { useState } from 'react';
import { StSpinnerWrapper } from '../mainPageStyled.ts';
import { ScheduledCards } from './ScheduledCards';
import { dateFormat } from '@/utils/dateFormat';
import { Button, Spinner } from '@common/index.ts';
import { useGetScheduledCards } from '@/hooks/query/useCards.ts';

export const ScheduledMain = () => {
  const [page, setPage] = useState(0);

  const today = new Date();
  const thisWeek = new Array(7)
    .fill(0)
    .map((_, i) =>
      dateFormat(new Date(new Date(today).setDate(today.getDate() + i + page))),
    );

  const scheduledCards = useGetScheduledCards(thisWeek);

  return (
    <>
      {scheduledCards.length !== 7 ? (
        <StSpinnerWrapper>
          <Spinner size={50} />
        </StSpinnerWrapper>
      ) : (
        <>
          <ScheduledCards
            cards={scheduledCards}
            thisWeek={thisWeek}
          />
          <StButtonsWrapper>
            <Button
              label="지난 주"
              handleButtonClick={() => setPage(page - 7)}
              width={100}
              height={36}
              color="NAVY"
            />
            <Button
              label="이번 주"
              handleButtonClick={() => setPage(0)}
              width={70}
              height={36}
              isOutline={true}
              color="NAVY"
              disabled={page === 0}
            />
            <Button
              label="다음 주"
              handleButtonClick={() => setPage(page + 7)}
              width={100}
              height={36}
              color="NAVY"
            />
          </StButtonsWrapper>
        </>
      )}
    </>
  );
};

const StButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;
