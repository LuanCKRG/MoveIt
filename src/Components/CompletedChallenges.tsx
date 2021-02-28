import { useContext } from 'react'
import { ChallengesContext } from '../Contexts/ChallengesContexts'
import styles from '../Styles/Components/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const { challengesCompleted } = useContext(ChallengesContext)

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}