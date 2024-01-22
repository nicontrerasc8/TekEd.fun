import React from 'react'
import CountDecimals from './CountDecimals'
const Rad = 0.0174533

const DrawPitagoras = (
     ArrOfQuestions, 
     IsLightTheme, 
     CanvasContext, 
     Question, 
     height, 
     Cifras) => {

     if(IsLightTheme) {
          CanvasContext.fillStyle = "#cad4e4"
          CanvasContext.strokeStyle = "#134fb0"
   }
   else {
          CanvasContext.fillStyle = "#162333"
          CanvasContext.strokeStyle = "#84aef2"
   }
   var baseCanvas, alturaCanvas
   if(ArrOfQuestions[Question].c2 >= ArrOfQuestions[Question].c1){
          baseCanvas = height*0.6
          alturaCanvas = (ArrOfQuestions[Question].c1 / ArrOfQuestions[Question].c2) * baseCanvas
   } else {
          alturaCanvas = height*0.6
          baseCanvas = (ArrOfQuestions[Question].c2 / ArrOfQuestions[Question].c1) * alturaCanvas
   }
   var x = (height-baseCanvas)/2
   var y = (height-alturaCanvas)/2
   CanvasContext.beginPath();
   CanvasContext.moveTo(x, y)
   CanvasContext.lineTo(x, y+alturaCanvas)
   CanvasContext.lineTo(x+baseCanvas, y+alturaCanvas)
   CanvasContext.lineTo(x, y)  
   CanvasContext.stroke();
   if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
   else CanvasContext.fillStyle = "#ffffff"
   var min 
   if(baseCanvas < alturaCanvas)min = baseCanvas
   else min = alturaCanvas
   CanvasContext.font = "20px Times New Roman";
   var c1 = ArrOfQuestions[Question].c1
   var c2 = ArrOfQuestions[Question].c2
   var h = ArrOfQuestions[Question].h
   var unseen = ArrOfQuestions[Question].incognita
   CanvasContext.beginPath();
   CanvasContext.fillText(unseen === 1 ? "x" : c1, x - (Cifras + CountDecimals(c1))*15, y + alturaCanvas/2)
   CanvasContext.fillText(unseen === 2 ? "x" : c2, (baseCanvas)/2 + x - (Cifras + CountDecimals(c2))*15, y + alturaCanvas+25)
   CanvasContext.fillText(unseen === 3 ? "x" : h, x + baseCanvas/2 + 10, y + alturaCanvas/2)
 
          if(IsLightTheme) {
               CanvasContext.strokeStyle = "#1ac26b"
               CanvasContext.fillStyle = "#1ac26b"
          }
          else {
               CanvasContext.strokeStyle = "#6bedaa"
               CanvasContext.fillStyle = "#6bedaa"
          }
          if(ArrOfQuestions[Question].showAngles){
          CanvasContext.beginPath()
          var angle2 = Math.asin(c2/h)
          var angle1 = Math.asin(c1/h)
          CanvasContext.arc(x,y,50,Math.PI/2,Math.PI/2 - angle2, true)
          CanvasContext.moveTo(x + baseCanvas, y + alturaCanvas)
          CanvasContext.arc(x + baseCanvas,y + alturaCanvas, 50, Math.PI, Math.PI*1.5 - angle2)
          CanvasContext.stroke()
          angle2/=Rad
          angle2 = Math.round(angle2)
          angle1/=Rad
          angle1 = Math.round(angle1)
         
               CanvasContext.fillText(angle2, x + 15, y + 70)
               CanvasContext.fillText(angle1, x + baseCanvas - 75, y + alturaCanvas - 15)
          }
}

export default DrawPitagoras