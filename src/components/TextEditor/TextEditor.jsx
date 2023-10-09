/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import { quillSimpleModules } from '@/config/constants';

const TextEditor = ({ data }) => {
  //console.log('data', data.content);
  const [content, setContent] = useState(data);
  const quillRef = useRef();

  return (
    <>
      <ReactQuill
        ref={quillRef}
        className="bg-text-color"
        theme="snow"
        name="editor"
        value={content}
        onChange={(e) => setContent(e)}
        placeholder={'Haz tu magia...'}
        modules={quillSimpleModules}
      />

      <input
        type="hidden"
        value={DOMPurify.sanitize(content)}
        name="content"
        id="content"
      />
    </>
  );
};
export default TextEditor;
