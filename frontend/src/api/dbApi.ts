import axiosInstance from './axiosInstance';

export const populateDatabase = async (): Promise<void> => {
    try {
        const response = await axiosInstance.post('/db/populate');
        console.log(response.data);
    } catch (error) {
        console.error('Error populating database: ', error);
        throw error;
    }
};