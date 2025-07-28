import React from 'react';
import { startResizing } from '../utils/resizeHandlers';

const ResizableImageWrapper = (imgElement: HTMLImageElement): HTMLElement => {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.border = "1px solid transparent";
  wrapper.style.width = `${imgElement.naturalWidth}px`;
  wrapper.style.height = "auto"; // Ajustamos la altura para que sea proporcional
  wrapper.style.overflow = "hidden";
  wrapper.style.textAlign = "center";
  wrapper.style.maxWidth = "100%"; // Limitar ancho máximo al 100% del contenedor
  wrapper.style.boxSizing = "border-box"; // Evita que el tamaño se salga de los límites
  wrapper.style.padding = "0";
  wrapper.style.margin = "0 auto";

  // Ajustes para la imagen
  imgElement.style.display = "block";
  imgElement.style.width = "100%"; // Asegura que la imagen ocupe el ancho del contenedor
  imgElement.style.height = "auto"; // Mantiene la proporción de la imagen

  wrapper.appendChild(imgElement);

  const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  corners.forEach(corner => {
    const resizer = document.createElement("div");
    resizer.className = `resizer ${corner}`;
    resizer.style.width = "10px";
    resizer.style.height = "10px";
    resizer.style.background = "red";
    resizer.style.position = "absolute";
    resizer.style.userSelect = "none";
    resizer.style.zIndex = "10";

    switch (corner) {
      case 'top-left':
        resizer.style.top = "0";
        resizer.style.left = "0";
        resizer.style.cursor = "nwse-resize";
        break;
      case 'top-right':
        resizer.style.top = "0";
        resizer.style.right = "0";
        resizer.style.cursor = "nesw-resize";
        break;
      case 'bottom-left':
        resizer.style.bottom = "0";
        resizer.style.left = "0";
        resizer.style.cursor = "nesw-resize";
        break;
      case 'bottom-right':
        resizer.style.bottom = "0";
        resizer.style.right = "0";
        resizer.style.cursor = "nwse-resize";
        break;
    }

    resizer.addEventListener("mousedown", (e) => startResizing(e, wrapper, imgElement, corner));
    wrapper.appendChild(resizer);
  });

  return wrapper;
};

export const applyImageAlignment = (wrapper: HTMLElement, alignment: string) => {
  switch (alignment) {
    case 'left':
      wrapper.style.marginLeft = "0";
      wrapper.style.marginRight = "auto";
      break;
    case 'center':
      wrapper.style.marginLeft = "auto";
      wrapper.style.marginRight = "auto";
      break;
    case 'right':
      wrapper.style.marginLeft = "auto";
      wrapper.style.marginRight = "0";
      break;
    default:
      wrapper.style.marginLeft = "";
      wrapper.style.marginRight = "";
      break;
  }
};

export default ResizableImageWrapper;
