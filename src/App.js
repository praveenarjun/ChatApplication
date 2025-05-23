import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import UserProfile from './components/UserProfile';
import Groups from './components/Groups';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  background: white;
  border-radius: 20px;
  margin: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    border-radius: 0;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  border-right: 1px solid #eee;
`;

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const currentUserId = 5; // Current user ID (you)

  const onProfileClick = (userId) => {
    console.log('Profile clicked for user:', userId);
  }

  // Reset user selection when group is selected
  const handleGroupSelect = (group) => {
    console.log('Group selected:', group);
    setSelectedGroup(group);
    setSelectedUser(null);
  }
  
  // Reset group selection when user is selected
  const handleUserSelect = (userId) => {
    console.log('User selected:', userId);
    setSelectedUser(userId);
    setSelectedGroup(null);
  };

  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <LeftSection>
          <ChatList 
            onSelectUser={handleUserSelect}
            currentUserId={currentUserId}
            onProfileClick={onProfileClick}
          />
          <Groups onSelectGroup={handleGroupSelect} />
        </LeftSection>
        {(selectedUser || selectedGroup) && (
          <>
            <Chat 
              selectedUser={selectedUser}
              selectedGroup={selectedGroup}
              currentUserId={currentUserId}
            />
            {selectedUser && <UserProfile userId={selectedUser} />}
          </>
        )}
      </MainContent>
    </AppContainer>
  );
}
export default App;