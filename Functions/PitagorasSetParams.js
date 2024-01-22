import { useRouter } from "next/router"
import SetPitagorasOptions from "./SetPitagorasOptions"

const PitagorasSetParams = (isTriangles, type, cifras, Question) => {
     var Arr = []
     var firstCathet, hipotenusa, secondCathet, result, unseen
     var rand, showAngles = false

 for (let i = 0; i < 7; i++) {
           rand = Math.random() < 0.5

           if(rand || isTriangles){
            showAngles = true
              hipotenusa = Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1))
              rand = Math.random() < 0.8
              if(rand) hipotenusa += Math.random()*0.5+0.02
              rand = Math.floor(Math.random() * 3)
            if(type == 1) rand = 0
            else if(type == 2) rand = 1
            else if(type == 3) rand = 2
            switch (rand) {
                   case 0:
                          firstCathet = hipotenusa/2
                          secondCathet = firstCathet * Math.pow(3,0.5)
                          break;
                   case 1: 
                          firstCathet = hipotenusa*0.6
                          secondCathet = hipotenusa*0.8
                          break;
                   case 2: 
                          firstCathet = hipotenusa / Math.pow(2,0.5)
                          secondCathet = firstCathet
                          break;
                   default:
                          break;
            }
           } 
           else {
              showAngles = false
              var NewRand = Math.random() < 0.5
              if(NewRand) {
                     hipotenusa = Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1))
                     rand = (Math.random() * .3) + 1.2
                     rand = rand.toFixed(2)
                     firstCathet = Math.sqrt(Math.pow(hipotenusa,2)/rand)
                     secondCathet = Math.sqrt(Math.pow(hipotenusa, 2) - Math.pow(firstCathet,2))
              }
              else {
                     firstCathet = Math.floor(Math.random() * ((Math.pow(10,cifras)-1)/2 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1))
                     secondCathet = Math.floor(Math.random() * ((Math.pow(10,cifras)-1)/2 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1))
                     hipotenusa = Math.sqrt(Math.pow(secondCathet, 2) + Math.pow(firstCathet,2))
              }
             }
       
           firstCathet *= 100
           firstCathet = Math.round(firstCathet) / 100
           secondCathet *= 100
           secondCathet = Math.round(secondCathet) / 100
           hipotenusa *= 100
           hipotenusa = Math.round(hipotenusa) / 100
     if(type == "cateto") {
            if(Math.random() < 0.5){
                   result = firstCathet
                   unseen = 1
            }
            else {
                   result = secondCathet
                   unseen = 2
            }
     } else if(type == "hipotenusa") {
            result = hipotenusa
            unseen = 3
     }
     else {
       if(Math.random() < .5){
              if(Math.random() < 0.5){
                     result = firstCathet
                     unseen = 1
              }
              else {
                     result = secondCathet
                     unseen = 2
              }
       }
       else {
              result = hipotenusa
              unseen = 3
       }
     }
     Arr.push({
            c1: firstCathet,
            c2: secondCathet,
            h: hipotenusa,
            incognita: unseen,
            result: result,
            showAngles: showAngles,
            text: "¿Cuál es el valor de X?",
            opciones: SetPitagorasOptions(result)
     })
 }
  return Arr
}

export default PitagorasSetParams