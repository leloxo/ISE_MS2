import React from 'react';
import styles from './title.module.scss'

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <p className={styles.appTitle}>
            {title}
        </p>
    );
};

export default Title;