import React, { createContext, useState, useEffect } from "react"
import LoadingContainer from "../Components/VisualComponents/Loading";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'
import { useContext } from "react";
import CompleteProfileComponent from "../Components/General/CompleteProfile";
import { useRouter } from "next/router";

const UserContext = createContext()
const UseUserContext = () => useContext(UserContext)
export default UseUserContext

export const UserContextProvider = ({children}) => {
    
     const [user] = useAuthState(auth)
     const [UserName, setUserName] = useState(null)
     const [IsLightTheme, setLightTheme] = useState(false)
     const [Streak, setStreak] = useState(0);
     const [IsTeacher, setIsTeacher] = useState(undefined)
     const [CorrectAnswers, setCorrectAnswers] = useState(0);
     const [WrongAnswers, setWrongAnswers] = useState(0);
     const [ExpRad_Number, setExpRad_Number] = useState(2)
     const [IsTimerOn, setIsTimerOn] = useState(false)
     const [Loading, setLoading] = useState(true)
     const [CompleteProfile, setCompleteProfile] = useState(false)
     const router = useRouter()

     const ChangeTheme = () => setLightTheme(!IsLightTheme)

     const TurnOnLoading = () => setLoading(true)
     const TurnOffLoading = () => setLoading(false)

     const IncrementCorrect = () => setCorrectAnswers(CorrectAnswers + 1)
     const IncrementWrong = () => setWrongAnswers(WrongAnswers + 1)
     const IncrementStreak = () => setStreak(Streak + 1)
     

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
       setIsTimerOn(false)
     }, [router.pathname])
     

     useEffect(() => {
      let unsubscribe
      if(user) setIsTeacher(true)  
          return unsubscribe
        }, [user])

        


    
    return <UserContext.Provider value={{
                                          user, UserName, setUserName, 
                                          IsTeacher,
                                          IsLightTheme, ChangeTheme, 
                                          TurnOnLoading,TurnOffLoading,
                                          CorrectAnswers, WrongAnswers, Streak,
                                          IncrementCorrect, IncrementWrong,
                                          IncrementStreak, ResetAll, ResetStreak,
                                          setCompleteProfile, CompleteProfile,
                                          IsTimerOn, setIsTimerOn,
                                          ExpRad_Number, setExpRad_Number
                                          }}>
         <main className={IsLightTheme ? "light" : "dark"}>
         {
             <>
              {
               Loading && <LoadingContainer/>
              }
              <CompleteProfileComponent/>
               {children}
             </>
        }
         </main>
    </UserContext.Provider>
}