import { useContext, useEffect } from 'react'
import DashBoard from '../Containers/DashBoard'
import LandingPage from '../Containers/LandingPage'
import { UserContext } from '../Lib/context'

export default function Home() {

  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    user ? <DashBoard/>  : <LandingPage/>
  )
}
