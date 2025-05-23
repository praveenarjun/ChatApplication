import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import groupData from '../../data/group.json'; // Import the group data
import userData from '../../data/user.json'; // Import user data for member info
import { getLastMessage } from '../Chat/messageService'; // Import to get last messages
import {
  Container,
  Header,
  Title,
  AddButton,
  GroupList,
  GroupItem,
  GroupInfo,
  GroupLabel,
  GroupName,
  MemberCount,
  LastActivity,
  MemberAvatars
} from './styles';

// Color palette for group labels
const colors = ['#A66EFC', '#F4B740', '#FF6B6B', '#20C997', '#FFA94D', '#6C5CE7', '#FF9F43'];

const Groups = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState(groupData);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    // Get group data with enhanced information
    const enhancedGroups = groupData.map((group, index) => {
      // Get member details
      const memberDetails = group.users
        .map(userId => userData.find(user => user.id === userId))
        .filter(Boolean);
      
      // Get last message for this group
      const lastMessage = getLastMessage(group.id, true);
      
      return {
        ...group,
        color: colors[index % colors.length],
        label: group.name.charAt(0).toUpperCase(),
        members: memberDetails,
        lastMessage: lastMessage ? lastMessage.message : null,
        lastActivity: lastMessage ? lastMessage.timestamp : null
      };
    });
    
    // Sort groups by last activity (if available)
    enhancedGroups.sort((a, b) => {
      if (!a.lastActivity && !b.lastActivity) return 0;
      if (!a.lastActivity) return 1;
      if (!b.lastActivity) return -1;
      return new Date(b.lastActivity) - new Date(a.lastActivity);
    });
    
    setGroups(enhancedGroups);
  }, []);

  const handleGroupClick = (group) => {
    if (group.users.length > 0) {
      setSelectedGroupId(group.id);
      onSelectGroup(group);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // If within last week, show day name
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date > oneWeekAgo) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
          Groups <span>({groups.length})</span>
        </Title>
        <AddButton>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </Header>
      <GroupList>
        {groups.map(group => (
          <GroupItem 
            key={group.id}
            onClick={() => handleGroupClick(group)}
            $clickable={group.users.length > 0}
            $active={selectedGroupId === group.id}
          >
            <GroupInfo>
              <GroupLabel color={group.color}>
                {group.label}
              </GroupLabel>
              <div>
                <GroupName>{group.name}</GroupName>
                {group.lastMessage && (
                  <LastActivity>
                    {group.lastMessage.length > 25 
                      ? group.lastMessage.substring(0, 25) + '...' 
                      : group.lastMessage}
                  </LastActivity>
                )}
              </div>
            </GroupInfo>
            <div>
              {group.lastActivity && (
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', textAlign: 'right' }}>
                  {formatTime(group.lastActivity)}
                </div>
              )}
              <MemberCount>
                <MemberAvatars>
                  {group.members.slice(0, 3).map((member, index) => (
                    <img 
                      key={member.id}
                      src={member.profileImage} 
                      alt={member.username}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        marginLeft: index > 0 ? '-8px' : '0',
                        zIndex: 3 - index
                      }}
                    />
                  ))}
                  {group.members.length > 3 && (
                    <span style={{ 
                      fontSize: '12px', 
                      marginLeft: '3px',
                      color: '#666' 
                    }}>
                      +{group.members.length - 3}
                    </span>
                  )}
                </MemberAvatars>
              </MemberCount>
            </div>
          </GroupItem>
        ))}
      </GroupList>
    </Container>
  );
};

export default Groups;