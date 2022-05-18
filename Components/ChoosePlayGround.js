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
                      return <Link key={idx} href={`/jugar/${slug == "sumas-restas" || slug == 'multiplicaciones-divisiones' ? "srmd" : slug}/${data.link ? data.link : data.text}`}>
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
