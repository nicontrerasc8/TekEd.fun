import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import MetaTags from '../Components/Metatags'
import { UserContext } from '../Lib/context'

const DashBoard = () => {
   const { UserName } = useContext(UserContext)

   return <>
      <MetaTags title='Tablero de inicio - TekEd'/>
      <article className='dashboard'>
         {
            UserName != null ? <h2>Bienvenido, ya estás registrado</h2> : <h2>Bienvenido, <Link href={"/completa-tu-perfil"}>
               <button className='btn-tertiary'>
                completa acá tu registro
                  </button></Link></h2>
         }
      </article>
   </>
   
}

export default DashBoard


