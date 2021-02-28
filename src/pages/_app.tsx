import '../Styles/Global.css'

import { ChallengesProvider } from '../Contexts/ChallengesContexts'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
          <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
