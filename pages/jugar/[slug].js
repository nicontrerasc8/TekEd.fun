import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChoosePlayGround from '../../Components/ChoosePlayGround';
import { SRMDdata } from '../../Lib/arrays';

const ChooseContainer = () => {

     const router = useRouter()
     const [title, setTitle] = useState("");
     const [Data, setData] = useState([]);
     const { slug } = router.query
     

     useEffect(() => {
          setData([])
          if(slug == "sumas-restas-multiplicaciones-y-divisiones"){
               setTitle('Sumas, restas, multiplicaciones y divisiones')
               setData(SRMDdata)
          }
          if(slug == 'tablas-de-multiplicar'){
               var arr = []
               setTitle('Tablas de multiplicar')
               for (let i = 1; i <= 10; i++) {
                    var maxNum = 10 * i;
                    var minNum = maxNum - 9
                    var highlight = `${minNum} - ${maxNum}` 
                    var texto = `Numeros del ${minNum} al ${maxNum}`
                    arr.push(
                         {
                              link: maxNum,
                              text: texto, 
                              icon: null,
                              header: highlight,
                         }
                    )
                    setData(arr)
               }
          }
          if(slug == "operaciones-3-numeros"){
               setTitle('Operaciones con 3 números')
          }
     }, [slug]);
     

  return <ChoosePlayGround title={title} data={Data} slug={slug}/>
};

export default ChooseContainer;
