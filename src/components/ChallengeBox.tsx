import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export const ChallengeBox: React.FC = () =>{
    const { activeChallenge, ResetChallenge, CompleteChallenge } = useContext(ChallengesContext)
    const { ResetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded(){
        CompleteChallenge()
        ResetCountdown()
    }
    function handleChallengeFailed(){
        ResetChallenge()
        ResetCountdown()
    }

    return(
        <div className={styles.challengeBox}>
            { activeChallenge ? 
                (<div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button onClick={handleChallengeFailed} type='button' className={styles.challengeFailedButton}>
                            Falhei
                        </button>

                        <button onClick={handleChallengeSucceeded} type='button' className={styles.challengeSucceededButton}>
                            Completei
                        </button>
                    </footer>
                </div>)
                : 
                (<div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando desafios
                    </p>
                </div>)
            }
        </div>
    )
}