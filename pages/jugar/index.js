import { faMeteor, faRocket, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { DropInFromLeft, DropInFromRight, DropInFromTop } from '../../Animations';
import MetaTags from '../../Components/Utils/Metatags';
import ParticlesComponent from '../../Components/VisualComponents/Particles';
import { GameCategories } from '../../Lib/arrays';

const Play = () => {
  return <>
    <MetaTags title='Juega y practica matemáticas | Matio'/>
    <ParticlesComponent/>
     <div className='play-page'>
          <h2>Juega y practica matemáticas.</h2>
          <section>
               {
                    GameCategories && GameCategories.map((data, idx) => {
                         return <Link passHref key={idx} href={`/jugar/${data.link}`}>
                                     <motion.article
                                   variants={idx % 3 == 0 ? DropInFromLeft : idx % 2 == 0 ? DropInFromTop : DropInFromRight}
                                   initial="hidden"
                                   animate="visible"
                                    className={idx % 2 != 0 ? "green-border" : undefined}>
                                   <FontAwesomeIcon icon={idx % 3 == 0 ? faMeteor : idx % 2 == 0 ? faRocket : faSpaceShuttle}/>
                                   <h3>{data.text}</h3>
                              </motion.article>   
                         </Link>
                         
                    })
               }
          </section>
     </div>   
  </>
}

export default Play;
