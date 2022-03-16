import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {DropInFromLeft, DropInFromRight, DropInFromTop} from "../Animations"
import MetaTags from "../Components/Metatags"

const ChoosePlayGround = ({title = "Matio | Plataforma en línea para aprender matemáticas.", data, slug}) => {

  return <>
  <MetaTags title={title}/>
  <div className='play-page'>
       <h2>{title}</h2>
       <section>
            {
                 data && data.map((data, idx) => {
                      return <motion.article
                      variants={idx % 3 == 0 ? DropInFromLeft : idx % 2 == 0 ? DropInFromTop : DropInFromRight}
                      initial="hidden"
                      animate="visible"
                      key={idx} className={idx % 2 != 0 ? "green-border" : undefined}>
                      {
                           data.icon ? <FontAwesomeIcon icon={data.icon}/> : <h1>{data.header}</h1>
                      }
                      <h3>{data.text}</h3>
                      <Link href={`/jugar/${slug == "sumas-restas" || slug == 'multiplicaciones-divisiones' ? "srmd" : slug}/${data.link ? data.link : data.text}`}>
                           <a>
                                <button className={idx % 2 != 0 ? 'btn-primary' : 'btn-secondary'}>
                                     Elegir
                                </button>
                           </a>
                      </Link>
                 </motion.article>
                 }) 
            }
       </section>
  </div>
</>;
};

export default ChoosePlayGround;
