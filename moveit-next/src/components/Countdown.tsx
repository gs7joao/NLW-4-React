import { useState, useEffect, useContext } from "react"
import { ChallengesContext } from '../contexts/ChallegesContext';
import styles from "../styles/components/Countdown.module.css"


let countdownTimeout: NodeJS.Timeout; //variavel global

export function Countdown() {
	const { startNewChallenge } = useContext(ChallengesContext);

	const [time, setTime] = useState(0.1 * 60); //Pegando o minutos * segundos
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60); //Minutos arredondando para menor
	const seconds = time % 60; //Resto da diviisao

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); 
	const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split(''); 
	//Transformando o valor em string e dividindo o caracter e o padStart pega o vaor que estiver zerado e joga no lado oposto

	function startCountdown(){
		setIsActive(true);
	}

	function resetCountdown(){
		clearTimeout(countdownTimeout); //Limpa o Timeout
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

	return (
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondsLeft}</span>
					<span>{secondsRight}</span>
				</div>
			</div>

			{hasFinished  ? ( //IF SE EXISTE
							<button 
							disabled
							className={styles.startCountdownButton}
							>
							Ciclo encerrado
						</button>
			) : ( //Fragmento
				<> 
				{ isActive ? (
					<button 
						type="button"
						className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}
						onClick={resetCountdown}
						>
						Abandonar ciclo
					</button>
					) : (
						<button 
						type="button"
						className={styles.startCountdownButton}
						onClick={startCountdown}
						>
						Iniciar um ciclo
					</button>
					) }
				</>
			)}

		</div>
	)
}