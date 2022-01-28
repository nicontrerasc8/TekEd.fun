import { parse } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChoosePlayGround from '../../../../Components/ChoosePlayGround';
import MetaTags from '../../../../Components/Metatags';

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
        arr.push(
             {
                  link: hyperLink,
                  text: texto, 
                  icon: null,
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
