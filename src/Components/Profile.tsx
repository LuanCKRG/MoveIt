import { useContext } from 'react'
import { ChallengesContext } from '../Contexts/ChallengesContexts'
import styles from '../Styles/Components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src='https://github.com/LuanCKRG.png' alt='LuanCKRG'/>
            <div>
                <strong>Luan Vitor</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}