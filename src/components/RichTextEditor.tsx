import React, { useRef, useEffect } from 'react';
import Toolbar from './Toolbar';
import ResizableImageWrapper from './ResizableImageWrapper';
import { useGlobalContext } from '../context/GlobalContext';
const RichTextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { setEditorContent } = useGlobalContext();

  const sanitizeHTML = (html: string) => {
    const container = document.createElement('div');
    container.innerHTML = html;
  
    // 1. Elimina etiquetas duplicadas anidadas (como <b><b>text</b></b>)
    container.querySelectorAll('b b, i i, u u, h1 h1, h2 h2, h3 h3, div div').forEach(node => {
      node.replaceWith(...node.childNodes);
    });
  
    // 2. Asegúrate de que <ul> y <ol> solo tengan <li> como hijos
    container.querySelectorAll('ul, ol').forEach(list => {
      list.childNodes.forEach(child => {
        if (child.nodeName !== 'LI') {
          list.removeChild(child);
        }
      });
    });
  
    // 3. Elimina <li> vacíos
    container.querySelectorAll('li').forEach(li => {
      if (li.textContent?.trim() === '') {
        li.remove();
      }
    });
  
    // 4. Opcional: Elimina divs vacíos o redundantes
    container.querySelectorAll('div').forEach(div => {
      if (div.innerHTML.trim() === '') {
        div.remove();
      }
    });
  
    return container.innerHTML;
  };
  

  const updateEditorContent = () => {
    if (editorRef.current) {
      const rawContent = editorRef.current.innerHTML;
      const cleanContent = sanitizeHTML(rawContent);
      setEditorContent(cleanContent);
    }
  };
  

  const handleImageInsert = (imgElement: HTMLImageElement) => {
    imgElement.style.width = "100%"; // Asegurar que la imagen ocupe el ancho completo del contenedor
    const wrapper = ResizableImageWrapper(imgElement);
    const editor = editorRef.current;
    if (editor) {
      editor.appendChild(wrapper);

      // Crear un párrafo limpio justo después de la imagen para seguir escribiendo texto
      const newParagraph = document.createElement("p");
      newParagraph.appendChild(document.createElement("br")); 
      wrapper.insertAdjacentElement("afterend", newParagraph);

      // Colocar el cursor en el nuevo párrafo limpio
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      updateEditorContent();
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

    // Procesar nodos para detectar líneas de texto
    selectedContent.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Si el nodo es texto, creamos un <li> para él
            const listItem = document.createElement('li');
            listItem.textContent = node.textContent;
            listElement.appendChild(listItem);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            if (element.tagName === 'BR') {
                // Ignorar <br> (solo para asegurar que no genere <li> vacíos)
                return;
            }

            // Procesar bloques de texto que pueden contener varias líneas
            const listItem = document.createElement('li');
            listItem.innerHTML = element.innerHTML;
            listElement.appendChild(listItem);
        }
    });

    // Asegurarse de que el último elemento <li> no esté vacío
    if (listElement.lastChild && listElement.lastChild.textContent?.trim() === '') {
        listElement.removeChild(listElement.lastChild);
    }

    // Insertar la lista en el lugar correcto
    range.deleteContents();
    range.insertNode(listElement);

    // Colocar el cursor al final de la lista
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(listElement);
    newRange.collapse(false);
    selection.addRange(newRange);

    updateEditorContent();
};


  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      if (range && range.endContainer.parentNode?.classList.contains('resizable-wrapper')) {
        e.preventDefault();
        
        const newParagraph = document.createElement("p");
        newParagraph.appendChild(document.createElement("br"));
        const wrapper = range.endContainer.parentNode;
        wrapper?.insertAdjacentElement("afterend", newParagraph);
        
        const newRange = document.createRange();
        newRange.setStart(newParagraph, 0);
        newRange.collapse(true);
        selection?.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  };
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
            onKeyDown={handleKeyDown}
        ></div>
    </div>
  );
};

export default RichTextEditor;
