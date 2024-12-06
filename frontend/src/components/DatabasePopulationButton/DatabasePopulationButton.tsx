import React, { useState } from 'react';
import { populateDatabase } from '../../api/dbApi';
import styles from './databasePopulationButton.module.scss';

const DatabasePopulationButton: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handlePopulation = async () => {
        setLoading(true);
        try {
            await populateDatabase();
            setResponse('Successfully populated database!');
        } catch (error) {
            setResponse('Error while populating database!');
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    }

    const closePopup = () => {
        setShowPopup(false);
        setResponse('');
    }

    return (
        <div>
            <button className={styles.populationButton} onClick={handlePopulation} disabled={loading}>
                {loading ? 'Populating...' : 'Populate Database'}
            </button>
            
            {showPopup && (
                <div className={styles.popupBackground}>
                    <div className={styles.popupContent}>
                        <p>
                            {response}
                        </p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatabasePopulationButton;