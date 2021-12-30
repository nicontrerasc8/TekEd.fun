import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import '../styles/globals.css'
import '../styles/home.css'
import "../styles/EnterPage.css"
import '../Components/Navbar/Navbar.css'
import { Toaster } from 'react-hot-toast'
import LoadingContainer from '../Components/Loading'

function MyApp({ Component, pageProps }) {

  const [Theme, setTheme] = useState("dark")
  const [Loading, setLoading] = useState(true)

  const ChangeTheme = () => {
    if(Theme == "dark") setTheme("light")
    else setTheme("dark")
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

  return <main className={Theme}>
    {
      Loading ? 
        <LoadingContainer/> : 
        <>
          <Navbar Theme={Theme} Callback={ChangeTheme}/>
          <Component {...pageProps} />
          <Toaster/>
        </>
    }
  </main>
}

export default MyApp
