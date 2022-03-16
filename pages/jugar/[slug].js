import { faRocket, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChoosePlayGround from '../../Components/ChoosePlayGround';
import { MDdata, SRdata, SRMDdata } from '../../Lib/arrays';

const ChooseContainer = () => {

     const router = useRouter()
     const [title, setTitle] = useState("");
     const [Data, setData] = useState([]);
     const { slug } = router.query
     

     useEffect(() => {
          setData([])
          if(slug == "sumas-restas"){
               setTitle('Sumas y restas')
               setData(SRdata)
          }
          if(slug == "multiplicaciones-divisiones"){
               setTitle('Multiplicaciones y divisiones')
               setData(MDdata)
          }
          if(slug == 'tablas-de-multiplicar'){
               var arr = []
               setTitle('Tablas de multiplicar')
               for (let i = 1; i <= 2; i++) {
                    var maxNum = 10 * i;
                    var minNum = maxNum - 9 
                    var icono
                    if(i % 2 == 0) icono = faRocket
                    else icono = faSpaceShuttle
                    var texto = `Nímeros del ${minNum} al ${maxNum}`
                    arr.push(
                         {
                              link: maxNum,
                              text: texto, 
                              icon: icono,
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
