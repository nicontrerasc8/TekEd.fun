import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import '../styles/globals.css'
import '../styles/home.css'
import "../styles/EnterPage.css"
import '../Components/Navbar/Navbar.css'
import { Toaster } from 'react-hot-toast'
import LoadingContainer from '../Components/Loading'
import { UserContext, UserContextProvider } from '../Lib/context'


function MyApp({ Component, pageProps }) {

  return <UserContextProvider>
    <>
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
  </UserContextProvider>
}

export default MyApp
