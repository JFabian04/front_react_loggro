import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Button } from '@/components/ui/button';
import { handleDownload } from '@/utils/downloadBlob';
import '../styles/background.css'
import { Download } from 'lucide-react';


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

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
    <>
      <div id="particle-container">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className='bg-white ' style={{ maxWidth: '600px', margin: 'auto', marginTop: 40 }}>

        <h2 className='bg-sky-400 text-gray-800 font-bold text-2xl p-6'>Sube tu imagen</h2>

        {/* FilePond para cargar la imagen */}
        <FilePond
          allowMultiple={false}
          acceptedFileTypes={['image/jpeg']}
          name="image"
          labelFileTypeNotAllowed="Solo se permite JPG/JPEG"
          labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action cursor-pointer">Examinar</span>'
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
            <h3 className='my-6 bg-green-400/80 px-4 py-2 rounded-md shadow-lg'>Imagen convertida (PNG):</h3>
            <Button onClick={() => handleDownload(uploadedImage)} className="shadow-lg">
              Descargar <Download />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
