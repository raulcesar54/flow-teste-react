import { Handle } from "reactflow";
import styled, { css } from "styled-components";

interface HandleProps {
  index: number;
}
export const HandleStyled = styled(Handle)<HandleProps>`
  padding: 4px;
  border-radius: 0px;
  height: 10px;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 100px;
  /* width: 100px; */
  ${({ index }) =>
    index &&
    css`
      top: ${index * 40 + 70}px;
    `}
`;
