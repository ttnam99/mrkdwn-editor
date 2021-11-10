import { Button, Col, Layout, Row, Space, Typography } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { FunctionComponent, useRef, useState } from "react";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import TextEditor from "../Editor";
import PreviewScreen from "../Preview";
import {
  BoldOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./index.css";

interface MarkdownEditorProps {}

const MarkdownEditor: FunctionComponent<MarkdownEditorProps> = (props) => {
  const [text, setText] = useState(`abc
    \`\`\`
    aaa
    \`\`\`
    
    ![abc](https://upload.wikimedia.org/wikipedia/vi/a/a7/Nodejs_logo_light.png)`);

  //handle text input
  const textCursor = useRef<HTMLTextAreaElement>(null);
  const handleTextChange = (input: string) => {
    setText(input);
  };
  const setCursorPos = function (
    cursorPosition: HTMLTextAreaElement,
    newPos: number
  ) {
    cursorPosition.selectionStart = cursorPosition.selectionEnd = newPos;
    textCursor.current?.focus();
  };
  const addTextAroundCursor = (beforeCursor: string, afterCursor: string) => {
    let cursorPosition = textCursor.current;
    if (cursorPosition !== null) {
      let newPos = cursorPosition.selectionStart;
      const beforeContent = text.slice(0, cursorPosition.selectionStart);
      const betweenContent = text.slice(
        cursorPosition.selectionStart,
        cursorPosition.selectionEnd
      );
      const afterContent = text.slice(cursorPosition.selectionEnd);
      handleTextChange(
        beforeContent +
          beforeCursor +
          betweenContent +
          afterCursor +
          afterContent
      );
      setTimeout(
        setCursorPos,
        20,
        cursorPosition,
        newPos + beforeCursor.length
      );
    }
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Space size="middle" direction="vertical">
        <Header className="toolBar">
          <Row gutter={4} align="middle">
          <Col><Typography.Title level={5} style={{color:"whitesmoke",margin:'0',paddingRight:'2rem'}}>Simple Markdown Editor</Typography.Title></Col>
            <Col>
            <Button
              type="primary"
              icon={<BoldOutlined />}
              size="middle"
              onClick={() => addTextAroundCursor(`**`, `**`)}
            /></Col>
            <Col>
            <Button
              type="primary"
              icon={<ItalicOutlined />}
              size="middle"
              onClick={() => addTextAroundCursor(`*`, `*`)}
            /></Col>
            <Col>
            <Button
              type="primary"
              icon={<StrikethroughOutlined />}
              size="middle"
              onClick={() => addTextAroundCursor(`~~`, `~~`)}
            /></Col>
            <Col>
            <Button
              type="primary"
              icon={
                <FontSizeOutlined />}
              size="middle"
              onClick={() => addTextAroundCursor(`## `, ``)}
            /></Col>
            <Col>
            <Button
              type="primary"
              icon={<UnorderedListOutlined />}
              size="middle"
              onClick={() => addTextAroundCursor(`- `, ``)}
            /></Col>
          </Row>
        </Header>
        {/*buttons bar */}
        <Content>
          {/*editor and preview */}
          <ScrollSync>
            <Row
              className="outerContainer"
              wrap={false}
              justify="space-between"
            >
              <Col xs={12} className="editorContainer">
                {/*  <AltTextEditor textData={text} onTextChange={handleTextChange} /> */}
                <ScrollSyncPane>
                  <TextEditor
                    textData={text}
                    textCursor={textCursor}
                    onTextChange={handleTextChange}
                  />
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
