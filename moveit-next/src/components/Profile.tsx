import styles from '../styles/components/Profile.module.css';

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/gs7joao.png" alt="João Pedro"/>
            <div>
                <strong> João Pedro </strong>
                <p> 
                    <img src="icons/Level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}