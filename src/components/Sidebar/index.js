import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBuilding, 
  faUsers, 
  faEnvelope, 
  faCalendar, 
  faComments,
  faCog 
} from '@fortawesome/free-solid-svg-icons';
import { SidebarContainer, IconGroup, IconButton, ProfileButton } from './styles';
import userData from '../../data/user.json'; // Import user data from JSON

const Sidebar = () => {
  const currentUserId = 5; // As per requirement
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from JSON
    const currentUser = userData.find(user => user.id === currentUserId);
    setUser(currentUser);
  }, []);

  return (
    <SidebarContainer>
      <IconGroup>
        <IconButton active>
          <FontAwesomeIcon icon={faHome} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faBuilding} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faUsers} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faEnvelope} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faCalendar} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faComments} />
        </IconButton>
      </IconGroup>
      <IconGroup>
        <IconButton>
          <FontAwesomeIcon icon={faCog} />
        </IconButton>
        <ProfileButton>
          <img 
            src={user?.profileImage || "https://via.placeholder.com/40"} 
            alt={user?.username || "Profile"} 
          />
        </ProfileButton>
      </IconGroup>
    </SidebarContainer>
  );
};

export default Sidebar;
