import styled from "styled-components";

export const AuthWrapperContainer = styled.div`
max-width: 500px;
margin: 0 auto;
`;

export const AuthWarperError = styled.p`
color: #BF1650;
::before {
  display: inline;
  content: "⚠ ";
}
`;

export const AuthWarperTitle = styled.h3`
font-weight: 600;
color: white;
text-align: center;
font-size: 1.8rem;
padding-bottom: 10px;
`;

export const AuthWarperInput = styled.input`
display: block;
box-sizing: border-box;
width: 100%;
border-radius: 4px;
border: 1px solid white;
padding: 10px 15px;
margin-bottom: 10px;
font-size: 14px;
&:disabled {
  opacity: 0.4;
}
&[type="submit"] {
  background: #7a84eb;
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 40px;
  padding: 20px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
  appearance: none;
  -webkit-appearance: none;
  &:hover {
    background: #636ee6;
  }
  &:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }
}
`;

export const AuthWarperLabel = styled.label`
line-height: 2;
text-align: left;
display: block;
margin: 5px 0;
color: white;
font-size: 14px;
font-weight: 200;
`;

export const AuthWarperForm = styled.form`
max-width: 500px;
margin: 0 auto;
background: #0e101c;
`;

export const AuthWarperTitleContainer = styled.div`
text-align: center;
`;
