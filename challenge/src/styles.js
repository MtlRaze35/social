import styled from "styled-components";

export const mediaSizes = {
  xs: 360,
  sm: 600,
  md: 920,
  lg: 1280,
  xl: 1600
};

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: white;
  background: #404040;
  border: none;
  border-radius: 3px;
`

export const Button = styled.button`
  font-style: bold;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 8px;
  boxshadow: 0px 1px 5px grey;
  `;

export const LoginContainer = styled.div`
  width: 60%;
  height: 3rem;
  border: 2px solid black;
  margin: auto;
  margin-top: 25%;
  background-color: whitesmoke;
  `;

export const PostContainer = styled.div`
  width: 60%;    
  border: 2px solid black;
  align-content: center;
  background-color: whitesmoke;
  margin: auto
  margin-bottom: 20px;
`;

export const ContentContainer = styled.div`
  width: 60%;
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
  margin-left: 30%;
`;


export const RegisterDiv = styled.div`
  width: 60%;  
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
  align-content: center;
`

export const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom-style: ridge;
  background-color: whitesmoke;
`;

export const PostBox = styled.div`
  width: auto;
  height: auto;
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
  align-content: center;
`;

export const ImageContainer = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

export const AlbumsContainer = styled.div`
  width: 60%;
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
  align-content: center;
`;