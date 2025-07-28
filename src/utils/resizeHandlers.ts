export const startResizing = (
    e: MouseEvent,
    wrapper: HTMLElement,
    imgElement: HTMLImageElement,
    corner: string
  ) => {
    e.preventDefault();
    const initialWidth = wrapper.offsetWidth;
    const initialHeight = wrapper.offsetHeight;
    const initialX = e.clientX;
    const initialY = e.clientY;
    const aspectRatio = initialWidth / initialHeight;
  
    const resize = (e: MouseEvent) => {
      let newWidth, newHeight;
      const deltaX = e.clientX - initialX;
  
      if (corner === 'top-left' || corner === 'bottom-right') {
        newWidth = initialWidth + deltaX;
        newHeight = newWidth / aspectRatio;
      } else {
        newWidth = initialWidth - deltaX;
        newHeight = newWidth / aspectRatio;
      }
  
      if (newWidth > 50 && newHeight > 50) {
        wrapper.style.width = `${newWidth}px`;
        wrapper.style.height = `${newHeight}px`;
        imgElement.style.width = "100%";
        imgElement.style.height = "100%";
      }
    };
  
    const stopResizing = () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };
  
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };
  