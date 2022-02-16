import React, { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface ChallengesContextData{
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    ResetChallenge: () => void;
    StartNewChallenge: () => void;
    CompleteChallenge: () => void;
    CloseLevelUpModal: () => void;
}
interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps) => {
    const [ level, setLevel ] = useState(rest.level ?? 1)
    const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0)
    const [ challengesCompleted, setCHallengesCompleted ] = useState(rest.challengesCompleted ?? 0 )

    const [ activeChallenge, setActiveChallenge ] = useState(null)
    const [ isLevelUpModalOpen, setIsLeveleUpModalOpen ] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [ level, currentExperience, challengesCompleted ])

    function levelUp(){
        setLevel(level + 1)
        setIsLeveleUpModalOpen(true)
    }

    function CloseLevelUpModal(){
        setIsLeveleUpModalOpen(false)
    }

    function StartNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function ResetChallenge(){
        setActiveChallenge(null)
    }

    function CompleteChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

            setCurrentExperience(finalExperience)
            setActiveChallenge(null)
            setCHallengesCompleted(challengesCompleted + 1)
        
    }

    return(
        <ChallengesContext.Provider value={{ CompleteChallenge, level, currentExperience, experienceToNextLevel, challengesCompleted, StartNewChallenge, levelUp, activeChallenge, ResetChallenge, CloseLevelUpModal }}>
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}