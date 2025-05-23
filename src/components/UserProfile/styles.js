import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 320px;
  height: 100vh;
  background: white;
  border-left: 1px solid #eee;
  overflow-y: auto;
  position: relative;
  
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
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 320px;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    
    &.mobile-visible {
      transform: translateX(0);
    }
    
    .mobile-only {
      display: block;
    }
  }
  
  .section-icon {
    margin-right: 8px;
    color: #6C5CE7;
  }
  
  .info-icon {
    margin-right: 8px;
    color: #999;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  display: none;
  
  &:hover {
    background: white;
  }
`;

export const ProfileHeader = styled.div`
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #6C5CE7, #FDB813);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
  color: white;
`;

export const AddProfileButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 15px;
  border: 4px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileName = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ProfileTitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  
  svg {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  justify-content: center;
`;

export const ActionButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: ${props => props.color || '#6C5CE7'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const Section = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const InfoIcon = styled.span`
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #6C5CE7;
  }
`;

export const InfoItem = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #f9f9f9;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.p`
  color: #666;
  font-size: 13px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const InfoValue = styled.p`
  color: #333;
  font-size: 14px;
  margin: 0;
  word-break: break-word;
`;

export const GroupParticipant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #f9f9f9;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  span {
    color: #666;
    font-size: 13px;
    font-weight: 500;
  }
`;

export const ParticipantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ParticipantAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const MediaItem = styled.img`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const SeeAllButton = styled.button`
  background: none;
  border: none;
  color: #6C5CE7;
  font-size: 13px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
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