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
     const [Streak, setStreak] = useState(0);
     const [CorrectAnswers, setCorrectAnswers] = useState(0);
     const [WrongAnswers, setWrongAnswers] = useState(0);
     const [Loading, setLoading] = useState(true)
     const ChangeTheme = () => {
          setLightTheme(!IsLightTheme)
     }

     const TurnOnLoading = () => setLoading(true)
     const TurnOffLoading = () => setLoading(false)

     const IncrementCorrect = () => setCorrectAnswers(CorrectAnswers + 1)
     const IncrementWrong = () => setWrongAnswers(WrongAnswers + 1)
     const IncrementStreak = () => {
       setStreak(Streak + 1)
     }

     const ResetStreak = () => setStreak(0)

     const ResetAll = () => {
       setStreak(0)
       setCorrectAnswers(0)
       setWrongAnswers(0)
     }

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
    
    return <UserContext.Provider value={{
                                          user, UserName, setUserName, 
                                          IsLightTheme, ChangeTheme, 
                                          TurnOnLoading,TurnOffLoading,
                                          CorrectAnswers, WrongAnswers, Streak,
                                          IncrementCorrect, IncrementWrong,
                                          IncrementStreak, ResetAll, ResetStreak
                                          }}>
         <main className={IsLightTheme ? "light" : "dark"}>
         {
             Loading ? <LoadingContainer/> : <>
               {children}
             </>
        }
         </main>
    </UserContext.Provider>
}