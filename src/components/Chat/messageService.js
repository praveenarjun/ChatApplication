import chatData from '../../data/Chat.json';

// Initialize chat data in localStorage if it doesn't exist
// We'll do this in a function to ensure it runs after the component mounts
const initializeLocalStorage = () => {
    try {
        if (!localStorage.getItem('chatData')) {
            console.log('Initializing localStorage with Chat.json data');
            localStorage.setItem('chatData', JSON.stringify(chatData));
        }
    } catch (error) {
        console.error('Error initializing localStorage:', error);
    }
};

// Call the initialization function
initializeLocalStorage();

// Load chat data from localStorage (which is initialized with Chat.json)
const loadChatData = () => {
    try {
        // First try to get from localStorage
        const storedData = localStorage.getItem('chatData');
        
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('Loaded chat data from localStorage:', parsedData.length, 'messages');
            return parsedData;
        } else {
            // If localStorage is empty, use the imported data
            console.log('Using imported Chat.json data:', chatData.length, 'messages');
            return chatData;
        }
    } catch (error) {
        console.error('Error loading chat data:', error);
        // Fallback to the imported data
        console.log('Fallback to imported Chat.json data');
        return chatData;
    }
};

// Save chat data to localStorage
const saveChatData = (data) => {
    try {
        localStorage.setItem('chatData', JSON.stringify(data));
        console.log('Chat data saved to localStorage:', data.length, 'messages');
        return true;
    } catch (error) {
        console.error('Error saving chat data:', error);
        return false;
    }
};

// Create a new message
export const createMessage = (toUser, messageText, file, groupId = null) => {
    const existingData = loadChatData();
    
    // Proper ID generation
    const newId = existingData.length > 0 
        ? Math.max(...existingData.map(m => m.id)) + 1 
        : 1;

    const newMessage = {
        id: newId,
        fromUser: 5, // Current user ID (you)
        toUser: toUser,
        message: messageText,
        timestamp: Date.now(),
        image: file?.data || null,
        groupId: groupId // Add groupId field for group messages
    };

    try {
        const updatedData = [...existingData, newMessage];
        return saveChatData(updatedData);
    } catch (error) {
        console.error('Error saving message:', error);
        return false;
    }
};

// Get direct messages between two users
export const getDirectMessages = (userId1, userId2) => {
    try {
        const data = loadChatData();
        
        // Convert IDs to numbers to ensure consistent comparison
        const id1 = Number(userId1);
        const id2 = Number(userId2);
        
        console.log(`Getting direct messages between users ${id1} and ${id2}`);
        
        const filteredMessages = data.filter(msg => 
            (Number(msg.fromUser) === id1 && Number(msg.toUser) === id2) ||
            (Number(msg.fromUser) === id2 && Number(msg.toUser) === id1)
        );
        
        console.log(`Found ${filteredMessages.length} messages between users ${id1} and ${id2}`);
        
        // Sort by timestamp
        const sortedMessages = filteredMessages.sort((a, b) => {
            // Handle different timestamp formats
            const timeA = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
            const timeB = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
            return timeA - timeB;
        });
        
        return sortedMessages;
    } catch (error) {
        console.error('Error getting direct messages:', error);
        return [];
    }
};

// Get group messages
export const getGroupMessages = (groupId) => {
    try {
        const data = loadChatData();
        
        console.log(`Getting messages for group ${groupId}`);
        
        const filteredMessages = data.filter(msg => msg.groupId === groupId);
        
        console.log(`Found ${filteredMessages.length} messages for group ${groupId}`);
        
        // Sort by timestamp
        const sortedMessages = filteredMessages.sort((a, b) => {
            // Handle different timestamp formats
            const timeA = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
            const timeB = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
            return timeA - timeB;
        });
        
        return sortedMessages;
    } catch (error) {
        console.error('Error getting group messages:', error);
        return [];
    }
};

// Get last message for a user or group
export const getLastMessage = (userId, isGroup = false) => {
    try {
        const data = loadChatData();
        let filteredMessages;
        
        // Convert userId to number for consistent comparison
        const id = Number(userId);
        
        if (isGroup) {
            filteredMessages = data.filter(msg => msg.groupId === id);
            console.log(`Found ${filteredMessages.length} messages for group ${id}`);
        } else {
            filteredMessages = data.filter(msg => 
                (Number(msg.fromUser) === id && Number(msg.toUser) === 5) ||
                (Number(msg.fromUser) === 5 && Number(msg.toUser) === id)
            );
            console.log(`Found ${filteredMessages.length} messages between user ${id} and current user 5`);
        }
        
        if (filteredMessages.length === 0) return null;
        
        // Sort by timestamp in descending order and get the first one
        const sortedMessages = filteredMessages.sort((a, b) => {
            // Handle different timestamp formats
            const timeA = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
            const timeB = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
            return timeB - timeA; // Note: descending order
        });
        
        return sortedMessages[0];
    } catch (error) {
        console.error('Error getting last message:', error);
        return null;
    }
};