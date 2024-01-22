import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import '../styles/globals.css'
import '../styles/home.css'
import "../styles/EnterPage.css"
import '../Components/Navbar/Navbar.css'
import '../styles/Play.css'
import '../styles/Class.css'
import { Toaster } from 'react-hot-toast'
import LoadingContainer from '../Components/VisualComponents/Loading'
import { UserContext, UserContextProvider } from '../Lib/context'
import Footer from '../Components/Footer'


function MyApp({ Component, pageProps }) {

  return <UserContextProvider>
     <div style={{minHeight: "calc(100vh - 7rem)"}}>
      <Navbar/>
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
                  duration: 3000,
                  style: {
                      background: "var(--main-green)",
                      color: "var(--primary)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      fontWeight: "600",
                      fontSize: "calc(10px + 1vmax)",
                      border: "3px solid var(--main-green)",
                  },
              }
            }}
            />
      </div>
  </UserContextProvider>
}

export default MyApp
