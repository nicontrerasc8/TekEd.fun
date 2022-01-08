import { useContext } from 'react'
import DashBoard from '../Containers/DashBoard'
import LandingPage from '../Containers/LandingPage'
import { UserContext } from '../Lib/context'

export default function Home() {

  const { user } = useContext(UserContext)

  return (
    user ? <DashBoard/>  : <LandingPage/>
  )
}
