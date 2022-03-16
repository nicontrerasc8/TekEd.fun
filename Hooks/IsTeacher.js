import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UseUserContext from "../Lib/context"
import { firestore } from "../Lib/firebase";
import LoadingContainer from "../Components/Loading";

function IsTeacherHook({TeacherSide, StudentSide}){

     const { CompleteProfile, IsTeacher } = UseUserContext()

       return <>
          {
               CompleteProfile ? "" :
               IsTeacher ? <>{TeacherSide}</> : <>{StudentSide}</>
          }
       </>
}

export default IsTeacherHook