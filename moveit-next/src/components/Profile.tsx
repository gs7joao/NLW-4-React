import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){

    const { level } = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/gs7joao.png" alt="João Pedro"/>
            <div>
                <strong> João Pedro </strong>
                <p> 
                    <img src="icons/level.svg" alt="Level"/>
                    Level { level }
                </p>
            </div>
        </div>
    );
}