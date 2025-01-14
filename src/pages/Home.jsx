import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Button } from '@/components/ui/button';
import { handleDownload } from '@/utils/donwloadBlob';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Home = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleProcessImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    setIsProcessing(true);
    try {
      const response = await fetch(`${apiBaseUrl}/images/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error al procesar la imagen');
      const result = await response.json();
      setUploadedImage(result.image.url);
    } catch (error) {
      console.error('Error al convertir la imagen:', error);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Sube tu imagen</h2>

      {/* FilePond para cargar la imagen */}
      <FilePond
        allowMultiple={false}
        acceptedFileTypes={['image/*']}
        name="image"
        labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action">Explorar</span>'
        instantUpload={false}
        allowRevert={true}
        onaddfile={(error, file) => {
          if (error) {
            console.error('Error al agregar el archivo:', error);
          } else {
            setSelectedImage(file.file);
          }
        }}
        onremovefile={() => {
          setSelectedImage(null);
          setUploadedImage(null);
        }}
      />

      {/* Botón para convertir la imagen */}
      {selectedImage && !uploadedImage && (
        <Button
          onClick={handleProcessImage}
          disabled={isProcessing}
          style={{
            marginBottom: '20px',
            backgroundColor: isProcessing ? '#ccc' : '#007bff',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
          }}
        >
          {isProcessing ? 'Procesando...' : 'Convertir'}
        </Button>
      )}

      {/* Botón para descargar la imagen procesada */}
      {uploadedImage && (
        <div>
          <h3>Imagen convertida:</h3>
          <Button onClick={() => handleDownload(uploadedImage)}>
            Descargar
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
