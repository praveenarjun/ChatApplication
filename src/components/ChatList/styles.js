import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  height: 60%;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 60px);
  }
`;

export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0;
`;

export const SearchContainer = styled.div`
  padding: 15px 20px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 30px;
  color: #999;
  font-size: 14px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 35px;
  border: none;
  background: #F5F5F5;
  border-radius: 10px;
  font-size: 14px;
  
  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  padding: 0 20px;
  margin-bottom: 15px;
  gap: 10px;
`;

export const Tab = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? '#6C5CE7' : '#F5F5F5'};
  color: ${props => props.active ? '#fff' : '#666'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 10px;

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
`;

export const ChatItem = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #F8F9FA;
  }

  ${props => props.active && `
    background: #F0F2F5;
  `}
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.online ? '#4CD964' : 'transparent'};
`;

export const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatName = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

export const LastMessage = styled.div`
  color: #666;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

export const TimeStamp = styled.div`
  font-size: 12px;
  color: #999;
`;

export const UnreadBadge = styled.div`
  background: #6C5CE7;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

export const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
`;