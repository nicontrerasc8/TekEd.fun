import { parse } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChoosePlayGround from '../../../../Components/ChoosePlayGround';
import { faCalculator, faChalkboardTeacher, faMeteor, faPlus, faRocket, faSchool, faSpaceShuttle, faSquareRootAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MaxNum = () => {

     const [Title, setTitle] = useState('');
     const [Data, setData] = useState([]);

     const router = useRouter()
     const { maxNum } = router.query

     useEffect(() => {
       setTitle(`Tablas de multiplicar desde el ${parseInt(maxNum) - 9} hasta el ${maxNum}`)
       var arr = []
       for (let i = parseInt(maxNum) - 9; i <= parseInt(maxNum); i++) {
        var hyperLink = `${maxNum}/${i}`
        var texto = `Tabla del ${i}`
        var icon
        if(i % 3 == 0) icon = faMeteor
        else if(i % 2 == 0) icon = faSpaceShuttle
        else icon = faRocket
        arr.push(
             {
                  link: hyperLink,
                  text: texto, 
                  icon: icon,
                  header: i,
             }
        )
        setData(arr)
   }
     }, [maxNum, ]);
     

  return <>
     <ChoosePlayGround title={Title} data={Data} slug={"tablas-de-multiplicar"}/>
  </>;
};

export default MaxNum;
