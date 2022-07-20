import CheckIfIsInArray from "./CheckIfIsInArray"
import GetMedia from "./GetMedia"
import GetMediana from "./GetMediana"
import GetMode from "./GetMode"
import GetRandomData from "./GetRandomDataFromArray"

const SetMTOptions = (type, arr) => {
     var r = Math.floor(Math.random() * 2 + 1)
           var options = []
           var aux
           if(type === 1){
               var Result = GetMedia(arr)
               for (let i = 1; i < 4; i++) {
                    if(r === i) options.push(Result.toFixed(2))
                    else {
                         var random_boolean = Math.random() < 0.5
                         aux = Math.random() * 1.8 + 0.1
                         if(random_boolean) options.push((Result+aux).toFixed(2))
                         else options.push((Result-aux).toFixed(2))
                    }
               }
           }
           if(type === 2 || type === 3){
               var Result
               
               if(type === 2) Result = GetMediana(arr, true)
               else Result = GetMode(arr).finalResult

               for (let i = 1; i < 4; i++) {
                    if(r === i)options.push(Result)
                    else {
                         random_boolean = Math.random() < 0.5
                         var N
                         do {
                              if(random_boolean)
                                        N = GetRandomData(arr)
     
                              else {
                                   N = GetMedia(arr)
                                   random_boolean = Math.random() < 0.5
                                   if(random_boolean) {
                                        random_boolean = Math.random() < 0.5
                                        var Num = Math.random() * 2 + .1
                                        if(random_boolean) N += Num
                                        else N -= Num
                                   }
                                   N = N.toFixed(2)
                              }

                         } while (N === Result || CheckIfIsInArray(N, options));

                         options.push(N)
                    }
               }
           }


           return options
   }

   export default SetMTOptions