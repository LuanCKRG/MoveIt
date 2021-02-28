import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContexts";

let CountdownTimeout: NodeJS.Timeout;

interface CountdownContextData { 
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    StartCountdown: () => void;
    ResetCountdown: () => void
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children} ) {
    const { StartNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = (time % 60)
    
    function StartCountdown() {
        setIsActive(true)
    }

    function ResetCountdown() {
        clearTimeout(CountdownTimeout)
        setIsActive(false)
        setTime(0.05 * 60)
        setHasFinished(false)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            CountdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
        else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            StartNewChallenge()
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{ minutes, seconds, hasFinished, isActive, StartCountdown, ResetCountdown}}>
            {children}
        </CountdownContext.Provider>
    )
}