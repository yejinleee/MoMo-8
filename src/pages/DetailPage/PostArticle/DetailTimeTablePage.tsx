import { TimeTable } from '../TimeTable/TimeTable';
import { StPostContainer } from './PostContents';

type DetailTimeTablePageType = {
  postId: string;
};

export const DetailTimeTablePage = ({  postId }: DetailTimeTablePageType) => {
  return (
    <StPostContainer>
      <TimeTable postId={postId}/>
    </StPostContainer>
  );
};
