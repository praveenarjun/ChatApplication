import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userData from '../../data/user.json';
import groupData from '../../data/group.json';
import {
  faSearch,
  faEllipsisV,
  faPaperclip,
  faSmile,
  faPaperPlane,
  faTimes,
  faArrowUp,
  faArrowDown,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Header,
  UserInfo,
  Avatar,
  UserDetails,
  Username,
  Status,
  HeaderActions,
  ActionIcon,
  SearchContainer,
  SearchInput,
  SearchControls,
  SearchResults,
  SearchClose,
  ChatArea,
  Message,
  MessageContent,
  MessageTime,
  DateDivider,
  InputArea,
  Input,
  InputActions,
  SendButton,
  EmptyState,
  LoadingIndicator,
  GroupAvatar,
  GroupMembersList,
  GroupMemberAvatar
} from './styles';
import EmojiPicker from 'emoji-picker-react';

const Chat = ({ selectedUser, selectedGroup, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [groupProfile, setGroupProfile] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const chatAreaRef = useRef(null);
  const searchInputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    chatAreaRef.current?.scrollTo(0, chatAreaRef.current.scrollHeight);
  }, []);

  // Load individual chat messages
  useEffect(() => {
    if (selectedUser && !selectedGroup) {
        try {
            const profile = userData.find(user => user.id === Number(selectedUser));
            setUserProfile(profile || null);
            setGroupProfile(null);
            setGroupMembers([]);
            
            // Get direct messages between users using our new function
            import('./messageService').then(({ getDirectMessages }) => {
                const directMessages = getDirectMessages(selectedUser, currentUserId);
                console.log('Loaded direct messages:', directMessages);
                setMessages(directMessages);
                setLoading(false);
                setTimeout(scrollToBottom, 100);
            });
        } catch (error) {
            console.error('Error initializing chat:', error);
            setLoading(false);
        }
    }
  }, [selectedUser, currentUserId, scrollToBottom, selectedGroup]);

  // Load group chat messages
  useEffect(() => {
    if (selectedGroup && !selectedUser) {
        try {
            // Find group data
            const group = groupData.find(g => g.id === selectedGroup.id);
            setGroupProfile(group);
            setUserProfile(null);
            
            // Get group members
            const members = group.users.map(userId => 
                userData.find(user => user.id === userId)
            ).filter(Boolean);
            setGroupMembers(members);
            
            // Get group messages using our new function
            import('./messageService').then(({ getGroupMessages }) => {
                const groupMessages = getGroupMessages(selectedGroup.id);
                console.log('Loaded group messages:', groupMessages);
                setMessages(groupMessages);
                setLoading(false);
                setTimeout(scrollToBottom, 100);
            });
        } catch (error) {
            console.error('Error initializing group chat:', error);
            setLoading(false);
        }
    }
  }, [selectedGroup, selectedUser, scrollToBottom]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile({
          name: file.name,
          data: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = messages.filter(message => 
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
    setCurrentSearchIndex(0);
    
    if (results.length > 0 && chatAreaRef.current) {
      scrollToMessage(results[0].id);
    }
  };

  const scrollToMessage = (messageId) => {
    if (chatAreaRef.current) {
      const messageElement = document.getElementById(`message-${messageId}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageElement.classList.add('highlighted');
        setTimeout(() => {
          messageElement.classList.remove('highlighted');
        }, 2000);
      }
    }
  };

  const navigateSearch = (direction) => {
    if (searchResults.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }
    
    setCurrentSearchIndex(newIndex);
    scrollToMessage(searchResults[newIndex].id);
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  // Updated sendMessage function to handle both direct and group messages
  const sendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;
    
    // Import the createMessage function dynamically to ensure we have the latest version
    import('./messageService').then(({ createMessage }) => {
      if (selectedUser) {
        // Direct message
        const timestamp = Date.now();
        const newMsg = {
            id: timestamp, // Use timestamp as ID to ensure uniqueness
            fromUser: currentUserId,
            toUser: Number(selectedUser),
            message: newMessage.trim(),
            image: selectedFile?.data || null,
            timestamp: timestamp
        };

        console.log('Sending direct message:', newMsg);
        
        if (createMessage(Number(selectedUser), newMsg.message, selectedFile)) {
            console.log('Direct message sent successfully');
            
            // Add the new message to the current messages
            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
            setSelectedFile(null);
            setTimeout(scrollToBottom, 50);
            
            // Reload messages to ensure we have the latest data
            setTimeout(() => {
                import('./messageService').then(({ getDirectMessages }) => {
                    console.log('Reloading direct messages after sending');
                    const directMessages = getDirectMessages(selectedUser, currentUserId);
                    console.log('Reloaded messages:', directMessages.length);
                    setMessages(directMessages);
                    setTimeout(scrollToBottom, 50);
                });
            }, 500);
        }
      } else if (selectedGroup) {
        // Group message
        const timestamp = Date.now();
        const newMsg = {
            id: timestamp, // Use timestamp as ID to ensure uniqueness
            fromUser: currentUserId,
            toUser: null, // No specific recipient for group messages
            message: newMessage.trim(),
            image: selectedFile?.data || null,
            timestamp: timestamp,
            groupId: selectedGroup.id
        };

        console.log('Sending group message:', newMsg);
        
        if (createMessage(null, newMsg.message, selectedFile, selectedGroup.id)) {
            console.log('Group message sent successfully');
            
            // Add the new message to the current messages
            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
            setSelectedFile(null);
            setTimeout(scrollToBottom, 50);
            
            // Reload messages to ensure we have the latest data
            setTimeout(() => {
                import('./messageService').then(({ getGroupMessages }) => {
                    console.log('Reloading group messages after sending');
                    const groupMessages = getGroupMessages(selectedGroup.id);
                    console.log('Reloaded messages:', groupMessages.length);
                    setMessages(groupMessages);
                    setTimeout(scrollToBottom, 50);
                });
            }, 500);
        }
      }
    });
  };

  if (!selectedUser && !selectedGroup) {
    return (
      <Container>
        <EmptyState>
          <h3>Select a chat to start messaging</h3>
          <p>Choose from your existing conversations or start a new one</p>
        </EmptyState>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <LoadingIndicator>Loading conversation...</LoadingIndicator>
      </Container>
    );
  }
  
  if (selectedUser && !userProfile) {
    return (
      <Container>
        <LoadingIndicator>Loading user profile...</LoadingIndicator>
      </Container>
    );
  }
  
  if (selectedGroup && !groupProfile) {
    return (
      <Container>
        <LoadingIndicator>Loading group profile...</LoadingIndicator>
      </Container>
    );
  }

  // Move this line before the return statement
  const messageGroups = groupMessagesByDate();
  
  // Get sender name for group messages
  const getSenderName = (userId) => {
    const user = userData.find(u => u.id === Number(userId));
    return user ? user.username : 'Unknown User';
  };

  // Colors for group chat
  const colors = ['#A66EFC', '#F4B740', '#FF6B6B', '#20C997', '#FFA94D', '#6C5CE7', '#FF9F43'];
  const groupColor = selectedGroup ? colors[(selectedGroup.id - 1) % colors.length] : '#6C5CE7';

  return (
    <Container>
      <Header>
        {selectedUser && (
          <UserInfo>
            <Avatar 
              src={userProfile?.profileImage || 'https://via.placeholder.com/45'} 
              alt={userProfile?.username} 
            />
            <UserDetails>
              <Username>{userProfile?.username || 'Unknown User'}</Username>
              <Status>{userProfile?.position || 'Online'}</Status>
            </UserDetails>
          </UserInfo>
        )}

        {selectedGroup && (
          <UserInfo>
            <GroupAvatar color={groupColor}>
              {selectedGroup.name.charAt(0).toUpperCase()}
            </GroupAvatar>
            <UserDetails>
              <Username>{selectedGroup.name}</Username>
              <Status>
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '5px' }} />
                {groupMembers.length} members
              </Status>
              <GroupMembersList>
                {groupMembers.map(member => (
                  <GroupMemberAvatar 
                    key={member.id}
                    src={member.profileImage || 'https://via.placeholder.com/24'} 
                    alt={member.username}
                    title={member.username}
                  />
                ))}
              </GroupMembersList>
            </UserDetails>
          </UserInfo>
        )}

        <HeaderActions>
          <ActionIcon onClick={toggleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </ActionIcon>
          <ActionIcon>
            <FontAwesomeIcon icon={faEllipsisV} />
          </ActionIcon>
        </HeaderActions>
      </Header>

      {searchActive && ( 
        <SearchContainer> 
          <SearchInput 
            ref={searchInputRef}
            placeholder="Search in conversation..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <SearchControls>
            <SearchResults>
              {searchResults.length > 0 ? 
                `${currentSearchIndex + 1} of ${searchResults.length}` : 
                'No results'
              }
            </SearchResults>
            <ActionIcon 
              disabled={searchResults.length === 0} 
              onClick={() => navigateSearch('prev')}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </ActionIcon>
            <ActionIcon 
              disabled={searchResults.length === 0} 
              onClick={() => navigateSearch('next')}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </ActionIcon>
            <SearchClose onClick={toggleSearch}>
              <FontAwesomeIcon icon={faTimes} />
            </SearchClose>
          </SearchControls>
        </SearchContainer>
      )}

      <ChatArea ref={chatAreaRef}>
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <React.Fragment key={date}>
            <DateDivider>{formatDate(date)}</DateDivider>
            {msgs.map(message => (
              <Message 
                key={message.id} 
                id={`message-${message.id}`}
                sent={message.fromUser === currentUserId}
              >
                {selectedGroup && message.fromUser !== currentUserId && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginBottom: '2px',
                    marginLeft: '10px'
                  }}>
                    {getSenderName(message.fromUser)}
                  </div>
                )}
                <MessageContent sent={message.fromUser === currentUserId}>
                  {message.image ? (
                    <div className="file-attachment">
                      {message.image.startsWith && message.image.startsWith('data:image/') ? (
                        <img 
                          src={message.image} 
                          alt="Attachment" 
                          style={{ maxWidth: '200px', margin: '5px 0' }}
                        />
                      ) : (
                        <a 
                          href={message.image} 
                          download="attachment" 
                          style={{ color: '#007bff', textDecoration: 'none' }}
                        >
                          📎 File Attachment
                        </a>
                      )}
                    </div>
                  ) : (
                    message.message
                  )}
                  <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                </MessageContent>
              </Message>
            ))}
          </React.Fragment>
        ))}
      </ChatArea>

      <InputArea>
        <InputActions>
          <input
            type="file"
            id="file-upload"
            hidden
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <FontAwesomeIcon icon={faPaperclip} />
          </label>
          <ActionIcon onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FontAwesomeIcon icon={faSmile} />
          </ActionIcon>
          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setNewMessage(prev => prev + emoji.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
        </InputActions>
        <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={selectedGroup ? `Message to ${selectedGroup.name}...` : "Type a message..."}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            }}
        />
        <SendButton onClick={sendMessage} disabled={!newMessage.trim() && !selectedFile}>
            <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </InputArea>
    </Container>
  );
};

export default Chat;
