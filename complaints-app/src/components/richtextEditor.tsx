import React, { Ref } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";
import exampleTheme from "../themes/ExampleTheme";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import Editor from "./editor";

const prepopulatedRichText = () => {
  const root = $getRoot();
  const paragraph1 = $createParagraphNode();
  const paragraph2 = $createParagraphNode();

  const text1 = "Police Report - Sri Lanka Police";

  const node1 = $createTextNode(text1);

  paragraph1.append(node1);

  root.append(paragraph1);
  root.append(paragraph2);
};

const editorConfig = {
  namespace: "MyEditor",
  // The editor theme
  theme: exampleTheme,
  editorState: prepopulatedRichText,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

interface IProps {
  reportTemplateRef: Ref<HTMLInputElement>;
  setValue: (value: string) => void;
}

export const RichtextEditor = ({ setValue, reportTemplateRef }: IProps) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor setValue={setValue} reportTemplateRef={reportTemplateRef} />
    </LexicalComposer>
  );
};
