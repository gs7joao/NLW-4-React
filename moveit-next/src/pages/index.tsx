import { Profile } from '../components/Profile';
import { GetServerSideProps } from 'next';

import { ExperienceBar } from "../components/ExperienceBar";
import styles from '../styles/pages/Home.module.css';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import React from 'react';
import { ChallengesProvider } from '../contexts/ChallegesContext';

  interface NomeProps {
    level: number,
    currentExperience: number,
    challengesCompleted:  number,
  }


export default function Home(props: NomeProps) {

  return (
    //Precisa criar um contexto para fazer a integração de varios componentes conversarem entre eles
    //Nesse caso ChallegensContext a gente colocou em volta de toda aplicação, pois em toda aplicação podemos fazer conversarem ele entre si;
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Relax Level Up </title>
      </Head>
      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
      
    </div>
    </ChallengesProvider>
  )
}

//Antes de carregar o React, esse Get vai consultar os dados da API e retornar os dados do 'usuario'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }

}


