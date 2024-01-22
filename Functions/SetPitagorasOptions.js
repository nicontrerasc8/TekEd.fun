import CheckIfIsInArray from "./CheckIfIsInArray"

const SetPitagorasOptions = (Result) => {
     var Randomic2 = Math.floor(Math.random() * 3 + 1)
           var options = []
           var N = 0
           for (let i = 1; i < 4; i++) {
             if(i == Randomic2) N = Result
             else {
               do {
                    
                    var random_boolean = Math.random() < 0.5;
                    if(Result !== Math.round(Result) && CheckIfIsInArray(Math.round(Result),options) === false) 
                      N = Math.round(Result)
                  
                    else{
                        if(random_boolean) N = (Result + Math.random()*0.5 + 0.05)
                        else N = (Result - i*(Math.random()*0.5+0.05))
                    }

               } while (N == Result || CheckIfIsInArray(N,options));
             }
             if(Math.floor(N) == N) N = Math.floor(N)
             else N = N.toFixed(2)
             if(N < 0) N = N*-1
             options.push(N)
           }

           return options
   }

   export default SetPitagorasOptions