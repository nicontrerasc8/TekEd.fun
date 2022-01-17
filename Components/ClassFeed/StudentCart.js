import { faCalculator, faChalkboardTeacher, faMeteor, faPlus, faRocket, faSchool, faSpaceShuttle, faSquareRootAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import Link from "next/link"
import { DropInFromLeft, DropInFromRight, DropInFromTop } from "../../Animations"

const StudentCart = ({information, i}) => {
     return <motion.section 
               variants={i % 3 == 0 ? DropInFromLeft : i % 2 == 0 ? DropInFromTop : DropInFromRight}
               initial="hidden"
               animate="visible"
               className={i % 2 == 0 ? "border-blue" : "border-green"}>
               <FontAwesomeIcon icon={i % 3 == 0 ? faChalkboardTeacher : i % 2 == 0 ? faCalculator : faSchool}/>
               <h2>{information.Title}</h2>
               <h3>Profesor: {information.Teacher}</h3>
               <Link href={"/"}>
                    <a>
                         <button onClick={() => alert("Todavía no funciona mano")}  className={i % 2 != 0 ? "btn-primary" : "btn-secondary"}>
                              Ir a la clase
                         </button>
                    </a>
               </Link>   
          </motion.section>
}
export default StudentCart