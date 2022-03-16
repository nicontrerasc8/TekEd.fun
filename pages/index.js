import DashBoard from '../Containers/DashBoard'
import LandingPage from '../Containers/LandingPage'
import UseUserContext, { UserContext } from '../Lib/context'

export default function Home() {

  const { user} = UseUserContext()

  return (
    user ? <DashBoard/>  : <LandingPage/>
  )
}
