import React,{useEffect} from 'react';

interface ImageVariantProps {
  handleImageChange: (index: number, file: File) => void;
  variant: any;
  index: number;
}

const ImagenInputVariante: React.FC<ImageVariantProps> = ({ handleImageChange, variant, index }) => {
  useEffect(() => {

  },[variant])
  return (
    <div className="image-upload-container" style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="file"
        id={`imageUpload-${index}`}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleImageChange(index, e.target.files[0])}
      />

      {/* Contenedor del botón de subida */}
      <label htmlFor={`imageUpload-${index}`} style={{ cursor: 'pointer' }}>
        {variant.imagenUrl ? (
          <img src={variant.imagenUrl} alt="Variante Imagen" width="50" />
        ) : (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H28.6364L30 1.36364V30H1.36364L0 28.6364V0ZM2.72727 2.72727V16.6665L7.56198 11.8318L17.4793 21.7493L23.6776 15.5509L27.2727 19.1458V2.72727H2.72727ZM27.2727 23.0029L23.6776 19.4078L17.4793 25.6062L7.56198 15.6887L2.72727 20.5235V27.2727H27.2727V23.0029ZM19.9587 7.68595C18.6578 7.68595 17.6033 8.74049 17.6033 10.0413C17.6033 11.3422 18.6578 12.3967 19.9587 12.3967C21.2595 12.3967 22.314 11.3422 22.314 10.0413C22.314 8.74049 21.2595 7.68595 19.9587 7.68595ZM14.876 10.0413C14.876 7.23425 17.1516 4.95867 19.9587 4.95867C22.7658 4.95867 25.0413 7.23425 25.0413 10.0413C25.0413 12.8484 22.7658 15.124 19.9587 15.124C17.1516 15.124 14.876 12.8484 14.876 10.0413Z"
              fill="#080341"
            />
          </svg>
        )}
      </label>
    </div>
  );
};

export default ImagenInputVariante;
