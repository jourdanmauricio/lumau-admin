/* eslint-disable react/prop-types */
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
//import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import DOMPurify from 'dompurify';

const getInitialState = (defaultValue) => {
  if (defaultValue) {
    const blocksFromHtml = htmlToDraft(defaultValue);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  } else {
    return EditorState.createEmpty();
  }
};

const TextEditor = ({ data }) => {
  const [editorState, setEditorState] = useState(getInitialState(data));

  // const [convertedContent, setConvertedContent] = useState();

  // useEffect(() => {
  //   setConvertedContent(
  //     draftToHtml(convertToRaw(editorState.getCurrentContent()))
  //   );
  // }, [editorState]);

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {/* <div
        className="p-4 mt-4"
        dangerouslySetInnerHTML={{
          __html: convertedContent,
        }}
      ></div> */}
      <input
        type="hidden"
        value={DOMPurify.sanitize(
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )}
        name="content"
        id="content"
      />
    </>
  );
};
export default TextEditor;
