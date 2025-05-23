import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  height: 40%;
  overflow-y: auto;
  border-top: 1px solid #eee;

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

  @media (max-width: 768px) {
    height: auto;
    max-height: 300px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;

  span {
    background: #eee;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 14px;
    color: #666;
  }
`;

export const AddButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6C5CE7;
    background: #f5f5f5;
  }
`;

export const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const GroupItem = styled.div`
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.$active ? '#f0f0f0' : 'transparent')};

  &:hover {
    background-color: ${(props) => (props.$clickable ? '#f5f5f5' : 'inherit')};
  }
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0; /* For text truncation to work */
`;

export const GroupLabel = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  flex-shrink: 0;
`;

export const GroupName = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
`;

export const LastActivity = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

export const MemberCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
`;

export const MemberAvatars = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;