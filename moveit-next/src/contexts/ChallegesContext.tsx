import { Children, createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) //Calculo usando potencia de level

    useEffect(() => {
        Notification.requestPermission(); // confirmação de permissão de usuario para notificações nativo do REACT
    }, []) //ao passar o array vazio, ele executa uma unica vez a primeira funcao 


    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length); //Randomico de 0 ou 1 e ate o total de conteudos no json
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play(); //Toca a notificacao

        if (Notification.permission === 'granted'){
            new Notification('Novo Desafio 🎉!', {
                body: `Valendo ${challenge.amount}xp!`
            });
        } 

    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount; //Usamos a variavel let (let it changes) deixa isso mudar ou receber um valor

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel; // ex: 120 e falta 100 pra subir de nivel, sobe de nivel + 20xp no proximo
            levelUp();
        }

        setCurrentExperience(finalExperience);  //salva xp
        setActiveChallenge(null); //reseta desafio
        setChallengesCompleted(challengesCompleted + 1); // total de desafios completados

    }

    return (
        <ChallengesContext.Provider 
            value={{
            level,
            currentExperience,
            challengesCompleted,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            }}
            >
            { children }
        </ChallengesContext.Provider>
    )
}