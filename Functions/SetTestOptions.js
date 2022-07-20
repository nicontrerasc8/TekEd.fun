const SetOptions = (d1, Result) => {
     var Randomic2 = Math.floor(Math.random() * 3 + 1)
           var options = []
           var N = 0
           for (let i = 1; i < 4; i++) {
             if(i == Randomic2) N = Result
             else {
               var random_boolean = Math.random() < 0.5;
               if(random_boolean) N = (Result + Math.pow(i,2) + 1)
               else N = (Result - i)
               for (let i = 0; i < options.length; i++) {
                 if(N == options[i]) N = (d1 + i*i)*(Math.random() * 3.5 + 2)*Math.PI
               }
             }
             if(Math.floor(N) == N) N = Math.floor(N)
             else N = N.toFixed(2)
             if(N < 0) N = N*-1
             options.push(N)
           }

           return options
   }

   export default SetOptions