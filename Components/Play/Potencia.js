import { MathJax, MathJaxContext } from "better-react-mathjax"


const Potencia = ({num, exp}) => {
    return <MathJaxContext>
        <MathJax>
              <math>           
                <mrow>
                 <msup>
                    <mn>{num}</mn>
                    <mn>{exp}</mn>
                  </msup>
                </mrow>
              </math>
          </MathJax>
    </MathJaxContext>
  }

  export default Potencia