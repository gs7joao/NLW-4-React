import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallegesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel; //Regra de 3 para a % do level

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div> 
                <div style={{ width: `${percentToNextLevel}%` }}/>
                <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>

        </header>
    )
}