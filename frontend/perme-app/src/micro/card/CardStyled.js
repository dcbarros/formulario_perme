import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const CardStyled = styled.div`
  border-radius: ${toRem(16)};
  border: none;
  margin-bottom: ${toRem(40)};
  background: #dbe1e9;

  &.Pacient {
    width: ${toRem(360)};
    height: ${toRem(232)};
    padding: ${toRem(24)};
  }

  &.Modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    width: ${toRem(552)};
    height: ${toRem(440)};
    border-radius: ${toRem(16)};
    background: #dbe1e9;
    padding: ${toRem(24)} ${toRem(120)} 0 ${toRem(120)};
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #ccc;
  }


  &.Result {
    width: ${toRem(1168)};
    height: ${toRem(280)};
    border: 1px solid #808080;
    background: none;
    padding: ${toRem(36)} ${toRem(40)} ${toRem(36)} ${toRem(40)};
  }
`;
