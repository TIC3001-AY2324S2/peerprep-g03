import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Initialize the context with undefined and assert the type
const UserContext = createContext<UserContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}