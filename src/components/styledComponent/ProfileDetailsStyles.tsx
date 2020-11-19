import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  flex-direction: column;
  margin: 0 auto;
`;
export const ProfileImage = styled.div`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: relative;

  img {
    border-radius: 50%;
  }
`;

export const CameraIcon = styled.div`
  position: absolute;
  z-index: 2;
  background-color: #00cc3f;
  border-radius: 50%;
  padding: 1rem;
  left: 100px;
  bottom: -10px;
  &:hover {
    cursor: pointer;
  }
`;
