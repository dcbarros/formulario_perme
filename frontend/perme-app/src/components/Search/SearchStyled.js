import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${toRem(312)};
  gap: ${toRem(8)};
`;
