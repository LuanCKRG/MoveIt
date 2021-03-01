import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../Contexts/ChallengesContexts';
import { CountdownContext } from '../Contexts/CountdownContext';
import styles from '../Styles/Components/Countdown.module.css'


export const Countdown = () => {
    const { minutes, seconds, hasFinished, isActive, StartCountdown, ResetCountdown } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span> : </span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled id='disable' className={styles.countdownButton}>
                    Ciclo encerrado ✅
                </button>
            )
                : (
                    
                        <>
                            { isActive ?
                                (<button onClick={ResetCountdown} type='button' className={`${styles.countdownButtonActive} ${styles.countdownButton}`}>
                                    Abandonar Ciclo
                                </button>)
                                :
                                (<button onClick={StartCountdown} type='button' className={styles.countdownButton}>
                                        Iniciar ciclo
                                    </button>)
                            }
                        </>
                    )
            }



        </div>
    )
}