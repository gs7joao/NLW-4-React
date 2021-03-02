import { useState, useEffect } from "react"
import styles from "../styles/components/Countdown.module.css"

export function Countdown() {
	const [time, setTime] = useState(2 * 60); //Pegando o minutos * segundos
	const [active, setActive] = useState(false);
	const minutes = Math.floor(time / 60); //Minutos arredondando para menor
	const seconds = time % 60; //Resto da diviisao

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); 
	const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split(''); 
	//Transformando o valor em string e dividindo o caracter e o padStart pega o vaor que estiver zerado e joga no lado oposto

	function startCountdown(){
		setActive(true);
	}

	useEffect(() => {
			if(active && time > 0){
				setTimeout(() => {
					setTime(time -1) //Pega o tempo e retira -1 segundo
				}, 1000);
			}
	}, [active, time]); 
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
			<button 
				type="button"
				className={styles.startCountdownButton}
				onClick={startCountdown}
				>
				Iniciar um ciclo
			</button>
		</div>
	)
}