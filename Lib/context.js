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
     const [IsLightTheme, setLightTheme] = useState(false)
    const [Loading, setLoading] = useState(true)
     const ChangeTheme = () => {
          setLightTheme(!IsLightTheme)
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
                const DocData = doc.data()
                setUserName("valid")
                setLightTheme(DocData.LightTheme)
              }
              else {
                setUserName(null)
              }
            })
          }
        }, [user, UserName])
    
    return <UserContext.Provider value={{user, UserName, setUserName, IsLightTheme, ChangeTheme, TurnOnLoading,TurnOffLoading}}>
         <main className={IsLightTheme ? "light" : "dark"}>
         {
             Loading ? <LoadingContainer/> : <>
               {children}
             </>
        }
         </main>
    </UserContext.Provider>
}