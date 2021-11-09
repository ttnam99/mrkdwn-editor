
import { Input, message } from "antd";
import { createRef, FunctionComponent, useRef } from "react";
import './index.css'
const { TextArea } = Input;

//Constants
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

interface TextEditorProps {
  onTextChange: Function;
  textData: string;
}
const TextEditor: FunctionComponent<TextEditorProps> = (props) => {

  const textCursor = createRef<HTMLTextAreaElement>();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onTextChange(event.currentTarget.value);
  };
/*   const insertMyText = e => {
    let textToInsert = " this is the inserted text "
    let cursorPosition = e.target.selectionStart
    let textBeforeCursorPosition = e.target.value.substring(0, cursorPosition)
    let textAfterCursorPosition = e.target.value.substring(cursorPosition, e.target.value.length)
    e.target.value = textBeforeCursorPosition + textToInsert + textAfterCursorPosition
  } */
  const handlePaste = (e:React.ClipboardEvent<HTMLTextAreaElement>) => {
    //console.log(e.clipboardData.getData('text'));
    let pastedData=e.clipboardData?.getData('text/html');
    let urlPattern=/<img[^>]+src="(https?:\/\/([^"]*))"?\s*.+\/>/g;
    if(pastedData.includes(`<img src="`)){
      let url=urlPattern.exec(`${pastedData}`);
      //console.log(url);
      
      if(url!==null) {
        //e.clipboardData?.setData('text',`![](${url[1]}`);
       // e.clipboardData?.setData('text/html','abc');
        e.preventDefault();
        let tagPattern=/<img.*?alt="(.*?)"[^\>]+>/g
        let tagExec=tagPattern.exec(pastedData);
        let tagname=tagExec!==null?tagExec[1]:'';
        console.log(tagExec);
        let cursorPosition = textCursor.current;
        let pastedImage=`![${tagname}](${url[1]})`
        //let text= url[1];
        if(cursorPosition!==null){
          const beforeContent = props.textData.slice(0, cursorPosition.selectionStart);
          const afterContent = props.textData.slice(cursorPosition.selectionStart, pastedImage.length);
          props.onTextChange(beforeContent+pastedImage+afterContent);
        }
        return `![](${url[1]}`;
      }else{
        message.info('image source need to be a link');
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
        minHeight: "100%",}}
      className="txtEditor"
      //showCount 
      onPaste={handlePaste}
        //minRows={15}
      defaultValue={props.textData}
      value={props.textData}
    ></textarea>
  );
};
export default TextEditor;
