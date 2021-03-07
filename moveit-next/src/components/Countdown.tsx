import { useContext } from "react";
import { CountdownContext } from '../contexts/CountdownContext';
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {

	const { minutes,
					seconds,
					hasFinished,
					isActive,
					startCountdown,
					resetCountdown 
				} = useContext(CountdownContext);

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); 
	const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split(''); 
	//Transformando o valor em string e dividindo o caracter e o padStart pega o valor que estiver zerado e joga no lado oposto
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