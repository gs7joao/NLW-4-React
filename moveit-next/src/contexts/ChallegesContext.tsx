import { Children, createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted:  number,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
    children,
    ...rest
}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModaLOpen, setIsLevelUpModalOpen] = useState(false);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) //Calculo usando potencia de level

    useEffect(() => {
        Notification.requestPermission(); // confirmação de permissão de usuario para notificações nativo do REACT
    }, []) //ao passar o array vazio, ele executa uma unica vez a primeira funcao 

    useEffect(() => {
        Cookies.set('level', String(level)); //transforma o number em string
        Cookies.set('currentExperience', String(currentExperience)); //transforma o number em string
        Cookies.set('challengesCompleted', String(challengesCompleted)); //transforma o number em string
    }, [level, currentExperience, challengesCompleted]); //sempre que houve mudanças nesses elementos, salva no cookies

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
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
            closeLevelUpModal,
            }}
            >
            { children }
            { isLevelUpModaLOpen && <LevelUpModal />} 
        </ChallengesContext.Provider>
    )
}