import React, { Ref } from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, EditorState } from "lexical";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

interface IProps {
  reportTemplateRef: Ref<HTMLInputElement>;
  setValue: (value: string) => void;
}

const Editor = ({ setValue, reportTemplateRef }: IProps) => {
  const [editor] = useLexicalComposerContext();

  const onChange = (editorState: EditorState) => {
    const stringifiedEditorState = JSON.stringify(editorState.toJSON());
    const parsedEditorState = editor.parseEditorState(stringifiedEditorState);
    const editorStateTextString = parsedEditorState.read(() =>
      $getRoot().getTextContent()
    );
    setValue(editorStateTextString);
  };
  return (
    <div className="editor-container">
      <ToolbarPlugin />
      <div ref={reportTemplateRef} className="editor-inner">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </div>
  );
};

export default Editor;
