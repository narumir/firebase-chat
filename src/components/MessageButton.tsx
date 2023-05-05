import styled from "styled-components";
import {
  Button,
} from "react-bootstrap";

export const MessageFormButton = styled(Button)`
background: #7a84eb;
color: white;
text-transform: uppercase;
border: none;
border-radius: 0px;
margin-top: 16px;
padding: 20px;
font-size: 1rem;
font-weight: 100;
letter-spacing: 10px;
&:hover {
  background: #636ee6;
}
`;
