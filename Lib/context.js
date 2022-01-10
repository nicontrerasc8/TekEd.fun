import React, { createContext, useState, useEffect } from "react"
import LoadingContainer from "../Components/Loading";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'
import { useContext } from "react";

const UserContext = createContext()
const UseUserContext = () => useContext(UserContext)
export default UseUserContext

export const UserContextProvider = ({children}) => {
    
     const [user] = useAuthState(auth)
     const [UserName, setUserName] = useState("")
     const [Theme, setTheme] = useState("dark")
  const [Loading, setLoading] = useState(true)
     const ChangeTheme = () => {
          if(Theme == "dark") setTheme("light")
     else setTheme("dark")
     }

     const TurnOnLoading = () => setLoading(true)
     const TurnOffLoading = () => setLoading(false)

     useEffect(() => {
          setTimeout(() => {
           setLoading(false)
          }, 2000);
     },[])

     useEffect(() => {
          if(user){
            var DocRef = firestore.collection('users').doc(user.uid)
            console.log("xd")
            DocRef.get().then((doc) => {
              if(doc.exists){
                setUserName("valid")
              }
              else {
                setUserName(null)
              }
            })
          }
        }, [user])
    
    return <UserContext.Provider value={{user, UserName, setUserName, Theme, ChangeTheme, TurnOnLoading,TurnOffLoading}}>
         <main className={Theme}>
         {
             Loading ? <LoadingContainer/> : <>
               {children}
             </>
        }
         </main>
    </UserContext.Provider>
}