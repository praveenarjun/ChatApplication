import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;
  position: relative;
`;

export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  z-index: 10;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4CD964;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.h3`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  margin: 0;
`;

export const Status = styled.p`
  color: #666;
  font-size: 13px;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  color: #666;
`;

export const ActionIcon = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.disabled ? '#666' : '#6C5CE7'};
    background: ${props => props.disabled ? 'transparent' : '#f5f5f5'};
  }
`;

export const SearchContainer = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  background: white;
  z-index: 5;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 14px;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #6C5CE7;
  }
`;

export const SearchControls = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  gap: 5px;
`;

export const SearchResults = styled.div`
  font-size: 12px;
  color: #666;
  margin-right: 5px;
`;

export const SearchClose = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #6C5CE7;
    background: #f5f5f5;
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #FBFBFB;
  
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
  
  .highlighted {
    animation: highlight 2s ease;
  }
  
  @keyframes highlight {
    0% { background: rgba(108, 92, 231, 0.2); }
    100% { background: transparent; }
  }
`;

export const DateDivider = styled.div`
  text-align: center;
  margin: 20px 0;
  position: relative;
  color: #999;
  font-size: 12px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 50px);
    height: 1px;
    background: #eee;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

export const MessageTime = styled.span`
  font-size: 11px;
  color: #999;
  margin-top: 5px;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: ${props => props.sent ? 'row-reverse' : 'row'};
  align-items: flex-end;
  margin-bottom: 20px;
  gap: 10px;
  transition: background 0.3s ease;
  padding: 5px;
  border-radius: 10px;
`;

export const MessageContent = styled.div`
  background: ${props => props.sent ? '#6C5CE7' : '#fff'};
  color: ${props => props.sent ? '#fff' : '#333'};
  padding: 12px 18px;
  border-radius: 18px;
  border-bottom-right-radius: ${props => props.sent ? '4px' : '18px'};
  border-bottom-left-radius: ${props => !props.sent ? '4px' : '18px'};
  max-width: 60%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: relative;
  
  ${MessageTime} {
    color: ${props => props.sent ? 'rgba(255, 255, 255, 0.7)' : '#999'};
    display: block;
    text-align: right;
    margin-top: 5px;
    font-size: 11px;
  }
`;

export const InputArea = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
`;

export const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: none;
  background: #F5F5F5;
  border-radius: 25px;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
  }
`;

export const InputActions = styled.div`
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 18px;

  svg {
    cursor: pointer;
    &:hover {
      color: #6C5CE7;
    }
  }
`;

export const SendButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: #6C5CE7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 18px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.3s ease;
  
  &:hover {
    opacity: ${props => props.disabled ? 0.7 : 0.9};
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
  }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 16px;
  animation: ${pulse} 1.5s infinite;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 0 20px;
  
  h3 {
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    max-width: 300px;
  }
`;

// Group chat specific styles
export const GroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GroupAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: ${props => props.color || '#6C5CE7'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

export const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
`;

export const GroupMembersList = styled.div`
  display: flex;
  margin-top: 5px;
  flex-wrap: wrap;
  gap: 5px;
`;

export const GroupMemberAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
    z-index: 2;
  }
`;
