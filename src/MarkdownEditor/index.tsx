import { Button, Col, Layout, Row, Space } from "antd";
import Grid from "antd/lib/card/Grid";
import { Content, Header } from "antd/lib/layout/layout";
import { FunctionComponent, useState } from "react";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import TextEditor from "../Editor";
import PreviewScreen from "../Preview";
import { BoldOutlined } from "@ant-design/icons";
import './index.css'
//Constants
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

interface MarkdownEditorProps {}

const MarkdownEditor: FunctionComponent<MarkdownEditorProps> = (props) => {
  const [text, setText] = useState(`abc
    \`\`\`
    aaa
    \`\`\`
    
    ![abc](https://upload.wikimedia.org/wikipedia/vi/a/a7/Nodejs_logo_light.png)`);
  //handle text input
  const handleTextChange = (input: string) => {
    setText(input);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/*to keep content under header */}
        <Space size="middle" direction="vertical">
      <Header className="toolBar">
          <Button type="primary" icon={<BoldOutlined />} size="small" /></Header>
      {/*buttons bar */}
      <Content>
        {/*editor and preview */}
        <ScrollSync>
          <Row className="outerContainer" wrap={false}>
              <Col xs={12} className="editorContainer">
                {/*  <AltTextEditor textData={text} onTextChange={handleTextChange} /> */}
            <ScrollSyncPane>
                <TextEditor textData={text} onTextChange={handleTextChange} />
            </ScrollSyncPane>
              </Col>
            <ScrollSyncPane>
              <Col xs={12} className="previewContainer">
                <PreviewScreen previewData={text} />
              </Col>
            </ScrollSyncPane>
          </Row>
        </ScrollSync>
      </Content>
      </Space>
    </Layout>
  );
};
export default MarkdownEditor;
