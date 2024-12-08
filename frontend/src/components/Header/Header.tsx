import React from 'react';
import styles from './header.module.scss';
import { UserType } from '../../types/types';
import DatabasePopulationButton from '../DatabasePopulationButton/DatabasePopulationButton';

interface HeaderProps {
    onSelectUser: (user: UserType) => void;
    currentUser: UserType;
}

const Header: React.FC<HeaderProps> = ({ onSelectUser, currentUser }) => {
    return (
        <div className={styles.headerContainer}>
            <h1>Logged in as {currentUser === UserType.Passenger ? 'Passenger' : 'Flight Dispatcher'}</h1>

            <DatabasePopulationButton />
            
            <select 
                value={currentUser} 
                onChange={(e) => onSelectUser(e.target.value as UserType)}
            >
                {Object.values(UserType).map((userType) => (
                    <option key={userType} value={userType}>
                        {userType}
                    </option>
                ))}
            </select>
        </div> 
    );
};

export default Header;