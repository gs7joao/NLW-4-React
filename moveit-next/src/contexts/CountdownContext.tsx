import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallegesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout; //variavel global

export function CountdownProvider({ children }: CountdownProviderProps){
    const { startNewChallenge } = useContext(ChallengesContext);

	const [time, setTime] = useState(0.1 * 60); //Pegando o minutos * segundos
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60); //Minutos arredondando para menor
	const seconds = time % 60; //Resto da diviisao

    function startCountdown(){
		setIsActive(true);
	}

	function resetCountdown(){
		clearTimeout(countdownTimeout); //Limpa o Timeout
		setHasFinished(false);
		setIsActive(false);
		setTime(0.1 * 60);
	}

	useEffect(() => {
			if(isActive && time > 0){
				countdownTimeout = setTimeout(() => {
					setTime(time -1) //Pega o tempo e retira -1 segundo
				}, 1000);
			} else if ( isActive && time == 0){
				setHasFinished(true); //finalizou
				setIsActive(false); //Seta o estado inicial
				startNewChallenge();
			}
	}, [isActive, time]); 
    //Eu quero passar a função, sempre que eu clicar... UseEffect, dispara um evento e efeito no react, ao utilizar o time, ele verifica e sempre -1

    return(
        <CountdownContext.Provider
			value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        	}}
			>
        	{ children }
        </CountdownContext.Provider>
    )
}