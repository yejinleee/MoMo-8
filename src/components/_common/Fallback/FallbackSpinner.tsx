import { StSpinnerWrapper } from "@/pages/MainPage/mainPageStyled"
import { Spinner } from ".."

export const FallbackSpinner = () =>{
  return (
    <StSpinnerWrapper>
      <Spinner size={50} />
    </StSpinnerWrapper>
  )
}