import { faMeteor, faRocket, faSpaceShuttle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import Link from "next/link"
import { DropInFromLeft, DropInFromRight, DropInFromTop } from "../../Animations"

const TeacherCart = ({information, i}) => {
     return <motion.section 
               variants={i % 3 == 0 ? DropInFromLeft : i % 2 == 0 ? DropInFromTop : DropInFromRight}
               initial="hidden"
               animate="visible"
               className={i % 2 == 0 ? "border-blue" : "border-green"}>
               <FontAwesomeIcon icon={i % 3 == 0 ? faMeteor : i % 2 == 0 ? faRocket : faSpaceShuttle}/>
               <h2>{information.Title}</h2>
               <Link href={"/"}>
                    <a>
                         <button onClick={() => alert("Todavía no funciona mano")}  className={i % 2 == 0 ? "btn-primary" : "btn-secondary"}>
                              Ir a la clase
                         </button>
                    </a>
               </Link>
               <button  className={i % 2 == 0 ? "btn-secondary" : "btn-primary"}>
                    Invita a tus alumnos
               </button>
          </motion.section>
}
export default TeacherCart