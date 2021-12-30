import { useState } from 'react'
import Navbar from '../Components/Navbar'
import '../styles/globals.css'
import '../styles/home.css'
import "../styles/EnterPage.css"
import '../Components/Navbar/Navbar.css'

function MyApp({ Component, pageProps }) {

  const [Theme, setTheme] = useState("dark")

  const ChangeTheme = () => {
    if(Theme == "dark") setTheme("light")
    else setTheme("dark")
  }

  return <main className={Theme}>
    <Navbar Theme={Theme} Callback={ChangeTheme}/>
    <Component {...pageProps} />
  </main>
}

export default MyApp
