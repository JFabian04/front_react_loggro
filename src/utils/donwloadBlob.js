export const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}${imageUrl}`);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = imageUrl.split('/').pop() ?? 'image.png';
      link.click();
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
    }
  };
