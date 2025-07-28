import React, { RefObject } from 'react';
import { handleImageUpload } from '../utils/imageUtils';
import { FaBold, FaItalic, FaUnderline, FaLink, FaListOl, FaListUl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaImage } from 'react-icons/fa';
import { useState,useEffect } from 'react';
interface ToolbarProps {
  editorRef: RefObject<HTMLDivElement>;
  applyList: (type: 'ordered' | 'unordered') => void;
  onImageUpload: (imgElement: HTMLImageElement) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editorRef, applyList, onImageUpload }) => {
  const [activeFormats, setActiveFormats] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
    heading: string;
    align: 'left' | 'center' | 'right' | '';
    list: 'ordered' | 'unordered' | '';
    fontSize: string;
    color:string;
  }>({
    bold: false,
    italic: false,
    underline: false,
    heading: '',
    align: '',
    list: '',
    fontSize: '',
    color: '#000000'
  });
  

  
  const [currentColor, setCurrentColor] = useState("#000000");

  const toggleFormat = (tag: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !editorRef.current) return;
  
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
  
    if (!selectedText) return;
  
    const parent = range.startContainer.parentElement;
    if (!parent) return;
  
    // Si ya está envuelto por esa etiqueta, la quitamos
    if (tag && parent.closest(tag)) {
      const wrapper = parent.closest(tag);
      if (wrapper) {
        const unwrapped = document.createTextNode(wrapper.textContent || '');
        wrapper.replaceWith(unwrapped);
  
        // Restaurar selección sobre el nuevo nodo
        const newRange = document.createRange();
        newRange.setStart(unwrapped, 0);
        newRange.setEnd(unwrapped, unwrapped.length);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      return;
    }
  
    // Si no está formateado, aplicamos el formato
    const element = document.createElement(tag);
    element.textContent = selectedText;
  
    range.deleteContents();
    range.insertNode(element);
  
    // Restaurar selección sobre el nuevo nodo
    const newRange = document.createRange();
    newRange.setStart(element, 0);
    newRange.setEnd(element, element.childNodes.length);
    selection.removeAllRanges();
    selection.addRange(newRange);
  };
  



  const handleAddLink = () => {
    const url = prompt("Inserta la URL:");
    if (url) {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.textContent = selectedText;
      anchor.target = "_blank";

      range.deleteContents();
      range.insertNode(anchor);
      selection.removeAllRanges();
    }
  };

  const triggerImageUpload = () => {
    const imageInput = document.getElementById('image-upload') as HTMLInputElement;
    if (imageInput) {
      imageInput.click();
    }
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !editorRef.current) return;
  
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
  
    if (!selectedText) return;
  
    const span = document.createElement('span');
    span.style.color = color;
    span.textContent = selectedText;
  
    range.deleteContents();
    range.insertNode(span);
    selection.removeAllRanges();
  
    // Restaurar selección
    const newRange = document.createRange();
    newRange.setStart(span, 0);
    newRange.setEnd(span, span.childNodes.length);
    selection.addRange(newRange);
  };
  

  const handleFontSizeChange = (size: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !editorRef.current) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
      const span = document.createElement('span');
      span.style.fontSize = size;
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);
      selection.removeAllRanges();
    }
  };

  const alignText = (alignment: 'left' | 'center' | 'right') => {
    const editor = editorRef.current;
    if (editor) {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
  
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
  
      // Verifica si el contenedor es un bloque de texto y no un texto simple
      const parentElement = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
      
      // Crea un bloque <div> si el contenedor actual no es adecuado para aplicar alineación
      let targetElement = parentElement;
      if (parentElement && parentElement !== editor && !['P', 'DIV'].includes(parentElement.tagName)) {
        const contents = range.extractContents();
        const wrapper = document.createElement('div');
        wrapper.style.textAlign = alignment;
        wrapper.appendChild(contents);
        range.insertNode(wrapper);
      }
  
      if (targetElement) {
        targetElement.style.display = "block"; // Asegura que actúe como un bloque para la alineación
        targetElement.style.textAlign = alignment;
      }
    }
  };

  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    return (
      '#' +
      result.slice(0, 3)
        .map(x => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  };
  
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();

    
      if (!selection || !selection.rangeCount) return;
  
      const node = selection.anchorNode;
      if (!node) return;
  
      const parent = node.nodeType === 3 ? node.parentElement : node as HTMLElement;
      if (!parent) return;

      const computedStyle = window.getComputedStyle(parent);
      const newFormats = {
        bold: !!parent.closest('b,strong'),
        italic: !!parent.closest('i,em'),
        underline: !!parent.closest('u'),
        heading: parent.closest('h1,h2,h3')?.tagName.toLowerCase() || '',
        align:
          parent.closest('[style*="text-align: center"]') ? 'center' :
          parent.closest('[style*="text-align: right"]') ? 'right' :
          parent.closest('[style*="text-align: left"]') ? 'left' : '',
        list: parent.closest('ul') ? 'unordered' : parent.closest('ol') ? 'ordered' : '',
        fontSize: window.getComputedStyle(parent).fontSize || '',
        color: computedStyle.color || '#000000',
      };
  
      setActiveFormats(newFormats);
    };
  
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);
  

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-white shadow-md sticky top-0 z-[20]">
      <button onClick={() => toggleFormat('b')} className={`p-2 rounded hover:bg-gray-300 ${
    activeFormats.bold ? 'bg-blue-300' : 'bg-gray-200'
  }`} title="Negrita">
        <FaBold />
      </button>
      <button onClick={() => toggleFormat('i')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.italic ? 'bg-blue-300' : 'bg-gray-200'}`} title="Cursiva">
        <FaItalic />
      </button>
      <button onClick={() => toggleFormat('u')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.underline ? 'bg-blue-300' : 'bg-gray-200'}`} title="Subrayado">
        <FaUnderline />
      </button>
      <button onClick={handleAddLink} className="p-2 bg-gray-200 rounded hover:bg-gray-300" title="Agregar Enlace">
        <FaLink />
      </button>
      <button onClick={() => applyList('ordered')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.list === 'ordered' ? 'bg-blue-300' : 'bg-gray-200'}`} title="Lista Numerada">
        <FaListOl />
      </button>
      <button onClick={() => applyList('unordered')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.list === 'unordered' ? 'bg-blue-300' : 'bg-gray-200'}`} title="Lista con Viñetas">
        <FaListUl />
      </button>
      <button onClick={triggerImageUpload} className="p-2 bg-gray-200 rounded hover:bg-gray-300" title="Agregar Imagen">
        <FaImage />
      </button>
      {/* Input de archivo para subir imágenes */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => handleImageUpload(e, onImageUpload)} 
        className="hidden" 
        id="image-upload"
      />
      <button onClick={() => alignText('left')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.align === 'left' ? 'bg-blue-300' : 'bg-gray-200'}`} title="Alinear Izquierda">
        <FaAlignLeft />
      </button>
      <button onClick={() => alignText('center')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.align === 'center' ? 'bg-blue-300' : 'bg-gray-200'}`} title="Alinear Centro">
        <FaAlignCenter />
      </button>
      <button onClick={() => alignText('right')} className={`p-2 rounded hover:bg-gray-300 ${activeFormats.align === 'right' ? 'bg-blue-300' : 'bg-gray-200'}`} title="Alinear Derecha">
        <FaAlignRight />
      </button>
      {/* Color Picker */}
      <input 
  type="color" 
  value={currentColor} 
  onChange={(e) => handleColorChange(e.target.value)} 
  className={`w-8 h-8 p-0 rounded hover:bg-gray-300 border-2 ${
    activeFormats.color && currentColor.toLowerCase() === rgbToHex(activeFormats.color)
      ? 'border-blue-500'
      : 'border-transparent'
  }`} 
  title="Seleccionar Color de Texto"
/>

      <select
        onChange={(e) => toggleFormat(e.target.value)}
        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        title="Formato"
      >
        <option value="">Formato</option>
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="p">Párrafo</option>
      </select>
      <select
        onChange={(e) => handleFontSizeChange(e.target.value)}
        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        title="Tamaño de texto"
        value={activeFormats.fontSize}
      >
        <option value="">Tamaño</option>
        <option value="12px">Pequeño</option>
        <option value="16px">Normal</option>
        <option value="24px">Grande</option>
        <option value="32px">Muy Grande</option>
      </select>
    </div>
  );
};

export default Toolbar;
