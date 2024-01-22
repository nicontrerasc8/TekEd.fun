import React, { useEffect, useState } from 'react'
import ChoosePlayGround from '../../../../Components/PlayersUsage/ChoosePlayGround'
import { Figures } from '../../../../Lib/arrays'
import { useRouter } from 'next/router';

const Component = () => {

    const [title, setTitle] = useState('')
    const router = useRouter()
    const { operator } = router.query

    useEffect(() => {
        setTitle("Elige el tipo de figura")
    }, [operator])
    

  return <ChoosePlayGround title={title} data={Figures} slug={operator}/>
}

export default Component