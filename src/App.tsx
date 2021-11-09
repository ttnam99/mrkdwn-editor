import React, { FC } from 'react';
import { Button } from 'antd';
import './App.css';
import MarkdownEditor from './MarkdownEditor';

const App: FC = () => (
  <div className="App">
    <MarkdownEditor/>
  </div>
);

export default App;