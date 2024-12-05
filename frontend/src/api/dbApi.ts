import axiosInstance from './axiosInstance';

export const populateDatabase = async (): Promise<void> => {
    try {
        await axiosInstance.post('/db/populate');
        // TODO return value?
    } catch (error) {
        console.error('Error populating database: ', error);
        throw error;
    }
};