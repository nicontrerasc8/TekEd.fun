import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {DropInFromLeft, DropInFromRight, DropInFromTop} from "../../Animations/index"
import MetaTags from "../Utils/Metatags"



const ChoosePlayGround = ({title = "Matio | Plataforma en línea para aprender matemáticas.", data, slug}) => {
     
     const [Slug, setSlug] = useState("")

     useEffect(() => {
     if(slug == 'area-perimetro') 
          setSlug(`area-perimetro`)
     else if(slug == 'media-mediana-moda')     
          setSlug('media-mediana-moda')
     else if(slug == "potenciacion-radicacion") 
          setSlug('potenciacion-radicacion')
     else if(slug == 'area' || slug == 'perimetro') 
          setSlug(`area-perimetro/${slug}`)
     else if(slug == "sumas-restas" || slug == 'multiplicaciones-divisiones') 
          setSlug('srmd')
     else if(slug == "pitagoras")
          setSlug("pitagoras")
     else if(slug == "triangulos-notables")
          setSlug("triangulos-notables")
     else if(slug == 'tablas-de-multiplicar') 
          setSlug("tablas-de-multiplicar")
     }, [slug])
     

  return <>
  <MetaTags title={title}/>
  <div className='play-page'>
       <h2>{title}</h2>
       <section>
            {
                 data && data.map((data, idx) => {
                      return <Link key={idx} href={`/jugar/${Slug}/${data.link ? data.link : data.text}`}>
                          <motion.article
                      variants={idx % 3 == 0 ? DropInFromLeft : idx % 2 == 0 ? DropInFromTop : DropInFromRight}
                      initial="hidden"
                      animate="visible"
                      className={idx % 2 != 0 ? "green-border" : undefined}>
                      {
                         <FontAwesomeIcon icon={data.icon}/> 
                      }
                      <h3>{data.text}</h3>
                 </motion.article>
                      </Link>
                 }) 
            }
       </section>
  </div>
</>;
};

export default ChoosePlayGround;
