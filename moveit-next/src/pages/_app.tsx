import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallegesContext'; 
//Precisa criar um contexto para fazer a integração de varios componentes conversarem entre eles
//Nesse caso ChallegensContext a gente colocou em volta de toda aplicação, pois em toda aplicação podemos fazer conversarem ele entre si;

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
    )
}

export default MyApp
