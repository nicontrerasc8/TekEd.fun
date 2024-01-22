import { faRocket, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChoosePlayGround from '../../Components/PlayersUsage/ChoosePlayGround';
import { Area_Perimeter_Data, MDdata, MMM_Data, Pitagoras_Data, Pot_Rad_Data, SRdata, SRMDdata, TriangulosNotables_Data } from "../../Lib/arrays" 

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
               return
          }
          else if(slug == "multiplicaciones-divisiones"){
               setTitle('Multiplicaciones y divisiones')
               setData(MDdata)
               return
          }
          else if(slug == "area-perimetro"){
               setTitle('Área y perimetro')
               setData(Area_Perimeter_Data)
               return
          }
          else if(slug == 'potenciacion-radicacion'){
               setTitle('Potenciación y radicación')
               setData(Pot_Rad_Data)
          }
          else if(slug == 'media-mediana-moda'){
               setTitle('Elige la medida de tendencia central')
               setData(MMM_Data)
          }
          else if(slug == 'pitagoras'){
               setTitle('Teorema de pitagoras')
               setData(Pitagoras_Data)
          }
          else if(slug == "triangulos-notables"){
               setTitle("Elige el tipo de triángulo")
               setData(TriangulosNotables_Data)
          }
          else if(slug == 'tablas-de-multiplicar'){
               var arr = []
               setTitle('Tablas de multiplicar')
               for (let i = 1; i <= 2; i++) {
                    var maxNum = 10 * i;
                    var minNum = maxNum - 9 
                    var icono
                    if(i % 2 == 0) icono = faRocket
                    else icono = faSpaceShuttle
                    var texto = `Números del ${minNum} al ${maxNum}`
                    arr.push(
                         {
                              link: maxNum,
                              text: texto, 
                              icon: icono,
                         }
                    )
                    setData(arr)
               }
               return
          }
     }, [slug]);
     

  return <ChoosePlayGround title={title} data={Data} slug={slug}/>
};

export default ChooseContainer;
