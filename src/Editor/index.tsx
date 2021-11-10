import { message } from "antd";
import { FunctionComponent, RefObject } from "react";
import "./index.css";

interface TextEditorProps {
  onTextChange: Function;
  textData: string;
  textCursor: RefObject<HTMLTextAreaElement>
}
const TextEditor: FunctionComponent<TextEditorProps> = ({textCursor,...props}) => {
  //const textCursor = useRef<HTMLTextAreaElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onTextChange(event.currentTarget.value);
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if(document.activeElement === textCursor.current){

      let pastedData = e.clipboardData?.getData("text/html");
      let urlPattern = /<img[^>]+src="(https?:\/\/([^"]*))"/g;
      if (pastedData.includes(`<img src="`)) {
        let url = urlPattern.exec(`${pastedData}`);
  
        if (url !== null) {
          e.preventDefault();
          let tagPattern = /<img.*?alt="(.*?)"[^>]+>/g;
          let tagExec = tagPattern.exec(pastedData);
          let tagname = tagExec !== null ? tagExec[1] : "";
          let cursorPosition = textCursor.current;
          let pastedImage = `![${tagname}](${url[1]})`;
          if (cursorPosition !== null) {
            let newPos=
            cursorPosition.selectionStart;
            const beforeContent = props.textData.slice(
              0,
              cursorPosition.selectionStart
            );
            const afterContent = props.textData.slice(
              cursorPosition.selectionEnd
            );
            props.onTextChange(beforeContent + pastedImage + afterContent);
            let setCursorPos=function(cursorPosition:HTMLTextAreaElement,newPos:number){
              cursorPosition.selectionStart=cursorPosition.selectionEnd=newPos;
            }
            setTimeout(setCursorPos,20,cursorPosition,newPos+pastedImage.length);
            //cursorPosition.setSelectionRange(newPos,newPos);
          }
          return `![](${url[1]}`;
        } else {
          message.info("image source need to be a link");
        }
      }
    }
  };
  return (
    <textarea
      //type="textarea"
      ref={textCursor}
      onChange={handleChange}
      style={{
        width: "100%",
        minHeight: "100%",
      }}
      className="txtEditor"
      onPaste={handlePaste}
      value={props.textData}
    ></textarea>
  );
};
export default TextEditor;
