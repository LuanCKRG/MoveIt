import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { Profile } from '../Components/Profile'
import { Countdown } from '../Components/Countdown';
import { ChallengeBox } from '../Components/ChallengeBox';
import { ExperienceBar } from "../Components/ExperienceBar";
import { CompletedChallenges } from '../Components/CompletedChallenges';

import styles from '../Styles/pages/Home.module.css'
import { CountdownProvider } from '../Contexts/CountdownContext';
import React from 'react';
import { ChallengesProvider } from '../Contexts/ChallengesContexts';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export default function Home(props: HomeProps){
  return ( 
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}>
      
    <div className={styles.container}>
      <Head>
        <title>MoveIt | CKRG</title>
      </Head>

      <ExperienceBar/>

    <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
    
        <div>
          <ChallengeBox />
        </div>
      </section>
    </CountdownProvider>

    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { level, currentExperience, challengesCompleted } = req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
};