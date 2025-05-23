import React from 'react';
import userData from '../../data/user.json'; // Import user data from JSON
import groupData from '../../data/group.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPhone,
  faVideo,
  faLocationDot,
  faCircleInfo,
  faEnvelope,
  faImage,
  faUsers,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  ProfileHeader,
  CloseButton,
  ProfileImage,
  ProfileName,
  ProfileTitle,
  Location,
  ActionButtons,
  ActionButton,
  Section,
  SectionHeader,
  SectionTitle,
  InfoItem,
  InfoLabel,
  InfoValue,
  GroupParticipant,
  ParticipantInfo,
  ParticipantAvatar,
  MediaGrid,
  MediaItem,
  SeeAllButton
} from './styles';

    const UserProfile = ({ userId, onClose }) => {
        // Ensure userId is provided
        if (!userId) {
          return <Container>Invalid or missing user ID</Container>;
        }
      
        // Ensure userData is an array
        if (!Array.isArray(userData)) {
          return <Container>Loading user data...</Container>;
        }
      
        // Find user safely
        const user = userData.find(user => user.id === Number(userId));
      
        if (!user) return <Container>User not found</Container>;

  // Sample media items for demonstration
  const mediaItems = [
    'https://via.placeholder.com/80/6C5CE7/FFFFFF?text=IMG',
    'https://via.placeholder.com/80/FF6B6B/FFFFFF?text=DOC',
    'https://via.placeholder.com/80/20C997/FFFFFF?text=PDF',
    'https://via.placeholder.com/80/FFA94D/FFFFFF?text=XLS',
    'https://via.placeholder.com/80/A66EFC/FFFFFF?text=ZIP',
    'https://via.placeholder.com/80/4CD964/FFFFFF?text=MP4'
  ];

  // Sample groups for demonstration
  const userGroups = Array.isArray(groupData)
  ? groupData
      .filter(group => group.users.includes(Number(userId)))
      .map(group => ({
        id: group.id,
        name: group.name,
        avatar: `https://via.placeholder.com/30/20C997/FFFFFF?text=${group.name[0]}`,
        members: group.users.length
      }))
  : [];

  return (
    <Container>
      <CloseButton onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
      
      <ProfileHeader>
        <ProfileImage src={user.profileImage || 'https://via.placeholder.com/120'} alt={user.username} />
        <ProfileName>{user.username}</ProfileName>
        <ProfileTitle>{user.position || 'UI / UX Designer'}</ProfileTitle>
        <Location>
          <FontAwesomeIcon icon={faLocationDot} />
          {user.address || 'San Francisco, California'}
        </Location>
      </ProfileHeader>

      <ActionButtons>
        <ActionButton>
          <FontAwesomeIcon icon={faUser} />
        </ActionButton>
        <ActionButton color="#4CD964">
          <FontAwesomeIcon icon={faPhone} />
        </ActionButton>
        <ActionButton color="#FF3B30">
          <FontAwesomeIcon icon={faVideo} />
        </ActionButton>
      </ActionButtons>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faCircleInfo} className="section-icon" />
            User Information
          </SectionTitle>
        </SectionHeader>
        <InfoItem>
          <InfoLabel>
            <FontAwesomeIcon icon={faPhone} className="info-icon" />
            Phone
          </InfoLabel>
          <InfoValue>{user.phone || '+01-222-345678'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            Email
          </InfoLabel>
          <InfoValue>{user.email || 'kevin_aztechnologies@gmail.com'}</InfoValue>
        </InfoItem>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faUsers} className="section-icon" />
            Group Participants
          </SectionTitle>
          <SeeAllButton>See All</SeeAllButton>
        </SectionHeader>
        {userGroups.map(group => (
          <GroupParticipant key={group.id}>
            <ParticipantInfo>
              <ParticipantAvatar src={group.avatar} alt={group.name} />
              <InfoValue>{group.name}</InfoValue>
            </ParticipantInfo>
            <span>+{group.members}</span>
          </GroupParticipant>
        ))}
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <FontAwesomeIcon icon={faImage} className="section-icon" />
            Media
          </SectionTitle>
          <SeeAllButton>See All</SeeAllButton>
        </SectionHeader>
        <MediaGrid>
          {mediaItems.slice(0, 6).map((src, index) => (
            <MediaItem 
              key={index}
              src={src}
              alt={`Media ${index + 1}`}
            />
          ))}
        </MediaGrid>
      </Section>
    </Container>
  );
};

export default UserProfile;