import marked from "marked";
import { FunctionComponent, useEffect, useMemo } from "react";
import mermaid from 'mermaid'
import katex from 'katex'
import DOMPurify from 'dompurify';

interface PreviewScreenProps {
  previewData: string;
}

const PreviewScreen: FunctionComponent<PreviewScreenProps> = (props) => {
/*   function mathsExpression(expr:any) {
    if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
      console.log("hit first case");
      expr = expr.substr(2, expr.length - 4)
      return katex.renderToString(expr, { displayMode: true })
    } else if (expr.match(/^\$[\s\S]*\$$/)) {
      console.log("hit secondcase");
      expr = expr.substr(1, expr.length - 2)
      return katex.renderToString(expr, { displayMode: false })
    }
  } */
  
  function renderMathsExpression (expr:any) {
    if (expr[0] === '$' && expr[expr.length - 1] === '$') {
      let displayStyle = false
      expr = expr.substr(1, expr.length - 2)
      if (expr[0] === '$' && expr[expr.length - 1] === '$') {
        displayStyle = true
        expr = expr.substr(1, expr.length - 2)
      }
      let html = null
      try {
        html = katex.renderToString(expr)
        console.log(html);
      } catch (e) {
        console.error(e)
      }
      if (displayStyle && html) {
        html = html.replace(/class="katex"/g, 'class="katex katex-block" style="display: block;"')
      }
      return html
    } else {
      return null
    }
  }
  const renderer = {
    code(code:any, lang:any, escaped:any) {
      if (!lang) {
        /* const math = mathsExpression(code)
        if (math) {
          return math
        } */
        //Add more match here for more types of diagrams
        if (code.match(/^sequenceDiagram/) || code.match(/^graph/)) {
          const graph=mermaid.render('mermaid-graph',code);
          console.log(graph);
          return '<div class="mermaid">' + graph + "</div>";
        }
      }
  
      // use original code renderer by returning false
      return false
    },
  
    paragraph(text:any) {
      const blockRegex = /\$\$[^$]*\$\$/g
      const inlineRegex = /\$[^$]*\$/g
      let blockExprArray = text.match(blockRegex)
      let inlineExprArray = text.match(inlineRegex)
      for (let i in blockExprArray) {
        const expr = blockExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
      }
      for (let i in inlineExprArray) {
        const expr = inlineExprArray[i]
        const result = renderMathsExpression(expr)
        text = text.replace(expr, result)
      }
      if(text!==null)return text
      // use original codespan renderer by returning false
      return false
    }
  }
  marked.use({renderer});
  const mardownFormattedContent = useMemo(
    () => DOMPurify.sanitize(marked.parse(props.previewData)),

    [props.previewData]
  );
  useEffect(()=>{
    mermaid.initialize({
      startOnLoad:true,
    });
  })
  //sanatized:true is deprecated => use a library
  return (
    <div
      dangerouslySetInnerHTML={{ __html: mardownFormattedContent }}
      style={{
        paddingRight: "1rem",
        width: "max-content",
        whiteSpace: "pre-line",
      }}
    />
  );
};
export default PreviewScreen;
