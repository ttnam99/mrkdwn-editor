import marked  from "marked";
import { FunctionComponent, useMemo } from "react";
import sanitizeHtml from 'sanitize-html';
interface PreviewScreenProps {
  previewData: string;
}

const PreviewScreen: FunctionComponent<PreviewScreenProps> = (props) => {
    const mardownFormattedContent = useMemo(
      ()=>( marked.parse(sanitizeHtml(props.previewData))),[props.previewData]); 
      //sanatized:true is deprecated => use a library
  return (
      <div dangerouslySetInnerHTML={{ __html: mardownFormattedContent }} style={{paddingRight:'1rem', width:"max-content",whiteSpace:'pre-line'}}/>
  );
};
export default PreviewScreen;
