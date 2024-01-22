export const DropInFromLeft = {
     hidden: {
         x: "-100vw",
         transform: ""
     },
     visible: {
         x: 0,
         opacity: 1,
         transition:{
             duration:.2,
         }
     }, 
     exit: {
         x: "100vw"
     }
 }
 export const DropInFromRight = {
    hidden: {
        x: "100vw",
        transform: ""
    },
    visible: {
        x: 0,
        opacity: 1,
        transition:{
            duration:.2,
        }
    }, 
    exit: {
        x: "-100vw"
    }
}

 export const DropInFromTop = {
    hidden: {
        y: "-100vh",
    },
    visible: {
        y: 0,
        opacity: 1,
        transition:{
            duration:.2,
        }
    }, 
    exit: {
        y: "100vh"
    }
}
export const DropInFromBottom = {
    hidden: {
        y: "100vh",
    },
    visible: {
        y: 0,
        opacity: 1,
        transition:{
            duration:.2,
        }
    }, 
    exit: {
        y: "-100vh"
    }
}
