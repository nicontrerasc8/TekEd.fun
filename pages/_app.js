import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import '../styles/globals.css'
import '../styles/home.css'
import "../styles/EnterPage.css"
import '../Components/Navbar/Navbar.css'
import { Toaster } from 'react-hot-toast'
import LoadingContainer from '../Components/Loading'
import { UserContext } from '../Lib/context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../Lib/firebase'

function MyApp({ Component, pageProps }) {

  const [Theme, setTheme] = useState("dark")
  const [Loading, setLoading] = useState(true)

  const ChangeTheme = () => {
    if(Theme == "dark") setTheme("light")
    else setTheme("dark")
  }

  const [user] = useAuthState(auth)
  const [UserName, setUserName] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)

    }, 2000);
  }, [])

  useEffect(() => {
    if(user){
      var DocRef = firestore.collection('users').doc(user.uid)
      DocRef.get().then((doc) => {
        if(doc.exists){
          console.log("El usuario ha sido registrado")
          setUserName("valid")
        }
        else {
          console.log("El usuario no ha sido registrado")
          setUserName(null)
        }
      })
    }
  }, [user])

  return <UserContext.Provider value={{user, UserName}}>
    <main className={Theme}>
    {
      Loading ? 
        <LoadingContainer/> : 
        <>
          <Navbar Theme={Theme} Callback={ChangeTheme}/>
          <Component {...pageProps} />
          <Toaster
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            error: {
              icon: "❌",
              duration: 5000,
              style: {
                  background: "var(--secondary",
                  color: "var(--red)",
                  fontWeight: "600",
                  border: "3px solid",
              },
            },
            success:{
                icon: '🚀',
                duration: 5000,
                style: {
                    background: "var(--main-green)",
                    color: "var(--primary)",
                    fontWeight: "600",
                    border: "3px solid var(--main-green)",
                },
            }
          }}
          />
        </>
    }
  </main>
  </UserContext.Provider>
}

export default MyApp
