import React, { useState } from 'react';
import styles from './app.module.scss';
import Header from './components/Header/Header';
import { UserType } from './types/types';
import Title from './components/Title/Title';
import TicketBookingForm from './components/TicketBookingForm/TicketBookingForm';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<UserType>(UserType.Passenger);

    const handleSelectUser = (user: UserType) => {
        setCurrentUser(user);
    };

    return (
        <div className='container'>
            <Title title='ISE - MS2' />
            <div className={styles.appContentWrapper}>
                <Header onSelectUser={handleSelectUser} currentUser={currentUser}/>
                <div className={styles.mainContainer}>
                    {currentUser === UserType.Passenger ? (
                        <div> 
                            <TicketBookingForm />
                        </div>
                    ) : (
                        <div> 

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;