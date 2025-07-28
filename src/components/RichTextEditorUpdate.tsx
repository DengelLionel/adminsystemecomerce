import React, { useRef, useEffect } from 'react';
import Toolbar from './Toolbar';
import ResizableImageWrapper from './ResizableImageWrapper';
import { useGlobalContext } from '../context/GlobalContext';

const RichTextEditorUpdate = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { setEditorContent, editorContent } = useGlobalContext();

  const updateEditorContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
    }
  };

  const applyList = (type: 'ordered' | 'unordered') => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedContent = range.extractContents();
    const listType = type === 'ordered' ? 'ol' : 'ul';
    const listElement = document.createElement(listType);

    selectedContent.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const listItem = document.createElement('li');
        listItem.textContent = node.textContent || "";
        listElement.appendChild(listItem);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName === 'BR') {
          return;
        }
        const listItem = document.createElement('li');
        listItem.innerHTML = element.innerHTML || "";
        listElement.appendChild(listItem);
      }
    });

    if (listElement.lastChild && listElement.lastChild.textContent?.trim() === '') {
      listElement.removeChild(listElement.lastChild);
    }

    range.deleteContents();
    range.insertNode(listElement);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(listElement);
    newRange.collapse(false);
    selection.addRange(newRange);

    updateEditorContent();
  };

  const handleImageInsert = (imgElement: HTMLImageElement) => {
    imgElement.style.width = "100%";
    const wrapper = ResizableImageWrapper(imgElement);
    const editor = editorRef.current;
    if (editor) {
      editor.appendChild(wrapper);

      const newParagraph = document.createElement("p");
      newParagraph.appendChild(document.createElement("br"));
      wrapper.insertAdjacentElement("afterend", newParagraph);

      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      updateEditorContent();
    }
  };

  useEffect(() => {
    if (editorRef.current && typeof editorContent === 'string') {
      editorRef.current.innerHTML = editorContent; // Asegúrate de que solo se asigne si es una cadena
    }
  }, [editorContent]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('input', updateEditorContent);
    }
    return () => {
      if (editor) {
        editor.removeEventListener('input', updateEditorContent);
      }
    };
  }, []);

  return (
    <div className="relative">
      <Toolbar onImageUpload={handleImageInsert} editorRef={editorRef} applyList={applyList} />
      <div
        ref={editorRef}
        contentEditable
        className="richtext-editor border border-gray-300 p-4 rounded min-h-[200px] mt-20 focus:outline-none"
      ></div>
    </div>
  );
};

export default RichTextEditorUpdate;
