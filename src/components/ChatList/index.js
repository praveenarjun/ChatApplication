import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faVideo, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import userData from '../../data/user.json'; // Import the user data
import { getLastMessage } from '../Chat/messageService';
import {
  Container,
  Header,
  Title,
  SearchContainer,
  SearchInput,
  SearchIcon,
  TabContainer,
  Tab,
  ChatListContainer,
  ChatItem,
  Avatar,
  ChatInfo,
  ChatName,
  LastMessage,
  ChatMeta,
  TimeStamp,
  UnreadBadge,
  NoResults
} from './styles';

const ChatList = ({ onSelectUser, currentUserId, onProfileClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [usersWithLastMessage, setUsersWithLastMessage] = useState([]);

  // Load last messages for each user
  useEffect(() => {
    console.log('Loading last messages for users');
    
    const enhancedUsers = userData
      .filter(user => user.id !== currentUserId) // Exclude current user
      .map(user => {
        const lastMessage = getLastMessage(user.id);
        return {
          ...user,
          lastMessage: lastMessage ? lastMessage.message : null,
          lastActive: lastMessage ? lastMessage.timestamp : user.lastActive || Date.now(),
          unreadCount: Math.floor(Math.random() * 3) // Simulate unread count for demo
        };
      });
    
    // Sort by last message time (most recent first)
    enhancedUsers.sort((a, b) => {
      const timeA = typeof a.lastActive === 'number' ? a.lastActive : new Date(a.lastActive).getTime();
      const timeB = typeof b.lastActive === 'number' ? b.lastActive : new Date(b.lastActive).getTime();
      return timeB - timeA;
    });
    
    console.log('Enhanced users with last messages:', enhancedUsers.length);
    setUsersWithLastMessage(enhancedUsers);
    
    // Set up an interval to refresh the chat list every 5 seconds
    const intervalId = setInterval(() => {
      console.log('Refreshing chat list');
      const refreshedUsers = userData
        .filter(user => user.id !== currentUserId)
        .map(user => {
          const lastMessage = getLastMessage(user.id);
          return {
            ...user,
            lastMessage: lastMessage ? lastMessage.message : null,
            lastActive: lastMessage ? lastMessage.timestamp : user.lastActive || Date.now(),
            unreadCount: Math.floor(Math.random() * 3)
          };
        });
      
      refreshedUsers.sort((a, b) => {
        const timeA = typeof a.lastActive === 'number' ? a.lastActive : new Date(a.lastActive).getTime();
        const timeB = typeof b.lastActive === 'number' ? b.lastActive : new Date(b.lastActive).getTime();
        return timeB - timeA;
      });
      
      setUsersWithLastMessage(refreshedUsers);
    }, 5000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentUserId]);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    onSelectUser(userId);
  };

  const handleProfileClick = (userId) => {
    onProfileClick(userId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredUsers = usersWithLastMessage.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.position && user.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.lastMessage && user.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === now.toDateString()) {
        return messageDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (messageDate > oneWeekAgo) {
        return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    }
    
    return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

  return (
    <Container>
      <Header>
        <Title>Chat</Title>
      </Header>
      <SearchContainer>
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <SearchInput 
          placeholder="Search Contact or Message"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'chat'} 
          onClick={() => handleTabChange('chat')}
        >
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
          Chats
        </Tab>
        <Tab 
          active={activeTab === 'meeting'} 
          onClick={() => handleTabChange('meeting')}
        >
          <FontAwesomeIcon icon={faVideo} style={{ marginRight: '5px' }} />
          Meeting
        </Tab>
        <Tab 
          active={activeTab === 'schedule'} 
          onClick={() => handleTabChange('schedule')}
        >
          <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
          Schedule
        </Tab>
      </TabContainer>
      
      {activeTab === 'chat' && (
        <ChatListContainer>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <ChatItem 
                key={user.id} 
                active={selectedUserId === user.id}
                onClick={() => handleUserSelect(user.id)}
              >
                <Avatar 
                  src={user.profileImage || 'https://via.placeholder.com/45'} 
                  alt={user.username} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick(user.id);
                  }}
                />
                <ChatInfo>
                  <ChatName>{user.username}</ChatName>
                  <LastMessage>
                    {user.lastMessage 
                      ? (user.lastMessage.length > 30 
                          ? user.lastMessage.substring(0, 30) + '...' 
                          : user.lastMessage)
                      : user.position || 'No messages yet'}
                  </LastMessage>
                </ChatInfo>
                <ChatMeta>
                  <TimeStamp>{user.lastActive ? formatTime(user.lastActive) : 'N/A'}</TimeStamp>
                  {user.unreadCount > 0 && (
                    <UnreadBadge>{user.unreadCount}</UnreadBadge>
                  )}
                </ChatMeta>
              </ChatItem>
            ))
          ) : (
            <NoResults>No contacts found matching "{searchTerm}"</NoResults>
          )}
        </ChatListContainer>
      )}
      
      {activeTab === 'meeting' && (
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          textAlign: 'center'
        }}>
          <FontAwesomeIcon icon={faVideo} style={{ fontSize: '48px', color: '#6C5CE7', marginBottom: '20px' }} />
          <h3 style={{ marginBottom: '10px' }}>Start a New Meeting</h3>
          <p style={{ marginBottom: '20px', color: '#666' }}>Connect with your team through video calls</p>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            width: '100%', 
            maxWidth: '300px',
            marginBottom: '20px'
          }}>
            <button style={{
              backgroundColor: '#6C5CE7',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <FontAwesomeIcon icon={faVideo} />
              Create New Meeting
            </button>
            
            <div style={{ 
              backgroundColor: '#f5f5f5', 
              borderRadius: '10px', 
              padding: '15px',
              marginTop: '10px'
            }}>
              <h4 style={{ marginBottom: '10px', color: '#333' }}>Join a Meeting</h4>
              <input 
                type="text" 
                placeholder="Enter meeting code" 
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  marginBottom: '10px'
                }}
              />
              <button style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}>
                Join
              </button>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            backgroundColor: '#f9f9f9', 
            padding: '15px', 
            borderRadius: '10px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#333' }}>Recent Meetings</h4>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px' 
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold' }}>Team Standup</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Today, 9:30 AM</div>
                </div>
                <button style={{
                  backgroundColor: '#6C5CE7',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  Rejoin
                </button>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold' }}>Project Review</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Yesterday, 2:00 PM</div>
                </div>
                <button style={{
                  backgroundColor: '#6C5CE7',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  Rejoin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'schedule' && (
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          height: '400px',
          textAlign: 'center',
          overflowY: 'auto'
        }}>
          <FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: '48px', color: '#6C5CE7', marginBottom: '20px' }} />
          <h3 style={{ marginBottom: '10px' }}>Schedule a Meeting</h3>
          <p style={{ marginBottom: '20px', color: '#666' }}>Plan ahead and invite your team members</p>
          
          <div style={{ 
            width: '100%', 
            maxWidth: '300px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '10px', 
            padding: '15px',
            marginBottom: '20px'
          }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  Meeting Title
                </label>
                <input 
                  type="text" 
                  placeholder="Enter meeting title" 
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  Date
                </label>
                <input 
                  type="date" 
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                    Start Time
                  </label>
                  <input 
                    type="time" 
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
                
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                    End Time
                  </label>
                  <input 
                    type="time" 
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  Participants
                </label>
                <select
                  multiple
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    height: '80px'
                  }}
                >
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Robert Johnson</option>
                  <option>Emily Davis</option>
                  <option>Michael Wilson</option>
                </select>
              </div>
              
              <button 
                type="button"
                style={{
                  backgroundColor: '#6C5CE7',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                Schedule Meeting
              </button>
            </form>
          </div>
          
          <div style={{ 
            width: '100%', 
            maxWidth: '300px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '10px', 
            padding: '15px'
          }}>
            <h4 style={{ marginBottom: '10px', textAlign: 'left', color: '#333' }}>Upcoming Meetings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ 
                backgroundColor: '#fff', 
                padding: '12px', 
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>Weekly Team Meeting</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
                  Tomorrow, 10:00 AM - 11:00 AM
                </div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                  5 participants
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#fff', 
                padding: '12px', 
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>Product Demo</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
                  Friday, 2:00 PM - 3:30 PM
                </div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                  3 participants
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ChatList;