// utils/imageUtils.ts
export const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  onImageUpload: (imgElement: HTMLImageElement) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Aquí se asume que tienes una URL en tu backend que maneja la subida de imágenes
      fetch(`${process.env.NEXT_PUBLIC_URL_ADMIN}/archivos/upload`, {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
          // Crear un elemento de imagen con la URL devuelta
          const imgElement = document.createElement("img");
          imgElement.src = data.url; // La URL de la imagen desde tu servidor
          imgElement.style.maxWidth = "100%";
          imgElement.style.width = "100%";
          imgElement.style.height = "auto";
          imgElement.style.display = "block";
          imgElement.onload = () => {
              onImageUpload(imgElement);
          };
      })
      .catch(error => {
          console.error("Error al subir la imagen:", error);
          alert("Hubo un problema al subir la imagen.");
      });
  }
};
