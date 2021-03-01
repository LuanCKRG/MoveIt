import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContexts';
import styles from '../Styles/Components/LevelUpModal.module.css'

export const LevelUpModal = () => {
    const { level, CloseLevelUpModal } = useContext(ChallengesContext);

    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{ level }</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type='button' onClick={CloseLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    )
}