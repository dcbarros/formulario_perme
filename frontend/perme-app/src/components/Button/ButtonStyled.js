import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { secondary, hoversecondary, quaternary, textgrey } from "../../utils/colors";

export const ButtonStyled = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  border-radius: ${toRem(4)};
  padding: ${toRem(0)} ${toRem(16)};
  
  &.ButtonLoading {
    padding: ${toRem(8)} ${toRem(16)};
  }

  &.ButtonSmall {
    min-width: ${toRem(80)};
    height: ${toRem(24)};
    background-color: #008ea7;
  }
  &.ButtonMedium {
    min-width: ${toRem(88)};
    height: ${toRem(32)};
    background-color: #008ea7;
  }
  &.ButtonLarge {
    width: ${toRem(126)};
    height: ${toRem(40)};
    background-color: #008ea7;
    @media (max-width: 1042px){
      line-height: 100%;
      height: ${toRem(50)};
    };
    @media (max-width: 768px) {
      height: ${toRem(50)};
      line-height: 100%;
    }
  }
    &.ButtonExtraLarge {
    min-width: ${toRem(168)};
    height: ${toRem(40)};
    background-color: #008ea7;
    @media (max-width: 1042px){
      line-height: 100%;
      height: ${toRem(50)};
    };
  }
  &.ButtonExtraExtraLarge {
    width: ${toRem(320)};
    height: ${toRem(40)};
    background-color: #008ea7;
  }
  &.ButtonSmall:hover,
  &.ButtonMedium:hover,
  &.ButtonLarge:hover,
  &.ButtonExtraLarge:hover, 
  &.ButtonExtraExtraLarge:hover   
  {
    background-color: #006273;
  }

  &.ButtonSmallPink {
    min-width: ${toRem(80)};
    height: ${toRem(24)};
    background-color: ${secondary};
  }
  &.ButtonMediumPink {
    min-width: ${toRem(88)};
    height: ${toRem(32)};
    background-color: ${secondary};
  }
  &.ButtonLargePink {
    max-width: ${toRem(126)};
    height: ${toRem(40)};
    background-color: ${secondary};
  }
  &.ButtonSmallPink:hover,
  &.ButtonMediumPink:hover,
  &.ButtonLargePink:hover {
    background-color: ${hoversecondary};
  }
  &.NoFillButtonSmall {
    min-width: ${toRem(80)};
    height: ${toRem(24)};
    background-color: transparent;
  }
  &.NoFillButtonMedium {
    min-width: ${toRem(88)};
    height: ${toRem(32)};
    background-color: transparent;
  }
  &.NoFillButtonLarge {
    min-width: ${toRem(126)};
    height: ${toRem(40)};
    background-color: transparent;
  }

  &.DisabledButtonSmall {
    min-width: ${toRem(80)};
    height: ${toRem(24)};
    background-color: #808080;
    cursor: not-allowed;
  }
  &.DisabledButtonMedium {
    min-width: ${toRem(88)};
    height: ${toRem(32)};
    background-color: #808080;
    cursor: not-allowed;
  }
  &.DisabledButtonLarge {
    min-width: ${toRem(126)};
    height: ${toRem(40)};
    background-color: #808080;
    cursor: not-allowed;
    @media (max-width: 768px) {
      height: ${toRem(50)};
    }
  }

&.RedButtonSmall {
  min-width: ${toRem(80)};
  height: ${toRem(24)};
  background-color: ${secondary};
}
&.RedButtonMedium {
  min-width: ${toRem(88)};
  height: ${toRem(32)};
  background-color: ${secondary};;
}
&.RedButtonLarge {
  min-width: ${toRem(126)};
  height: ${toRem(40)};
  background-color: ${secondary};
  @media (max-width: 768px) {
      height: ${toRem(50)};
    }
}
&.RedButtonSmall:hover,
  &.RedButtonMedium:hover,
  &.RedButtonLarge:hover {
    background-color: #FF406D;
}
&.ButtonLargeGreen {
    min-width: ${toRem(126)};
    height: ${toRem(40)};
    background-color:${quaternary};
    @media (max-width: 768px) {
      height: ${toRem(50)};
    }
  } 
  &.ButtonExtraLargeGreen {
    min-width: ${toRem(168)};
    height: ${toRem(40)};
    background-color:${quaternary};
    @media (max-width: 1042px){
      line-height: 100%;
      height: ${toRem(50)};
    };
  }
  
  .spinner {
	  animation-name: spin;
	  animation-duration: 500ms;
	  animation-iteration-count: infinite;
	  animation-timing-function: linear;
	}
	
	@keyframes spin {
	  from {
	    transform: rotate(0deg);
	  }
	  to {
	    transform: rotate(360deg);
	  }
	}
`;