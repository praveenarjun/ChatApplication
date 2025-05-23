import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 80px;
  height: 100vh;
  background-color: #6C5CE7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
`;

export const IconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const IconButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  border: none;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ProfileButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid white;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 0.9;
  }
`;