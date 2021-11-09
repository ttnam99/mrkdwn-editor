import marked  from "marked";
import { ChangeEventHandler, FunctionComponent } from "react";
import sanitizeHtml from 'sanitize-html';
interface PreviewScreenProps {
  previewData: string;
}

const PreviewScreen: FunctionComponent<PreviewScreenProps> = (props) => {
    const mardownFormattedContent = ( marked.parse(sanitizeHtml(props.previewData) ));

    function getMarkdownText() {
        let rawMarkup = marked('This is _Markdown_.', {sanitize: true});
        return { __html: mardownFormattedContent };
    }
    
      {/* <ReactMarkdown>{props.previewData}</ReactMarkdown> */}
  return (
      <div dangerouslySetInnerHTML={{ __html: mardownFormattedContent }} style={{paddingRight:'1rem', width:"max-content",whiteSpace:'pre-line'}}/>
  );
};
export default PreviewScreen;
