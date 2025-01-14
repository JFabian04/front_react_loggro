import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios';
import { DataTable } from '@/components/data-table';
import ImageModal from '@/components/History/ImageViewer';
const Historial = () => {

  const [imageUrl, setImageUrl] = useState(null);  // Estado para la imagen

  // Función para abrir el modal con una imagen
  const handleOpenModal = (url) => {
    console.log(url);

    setImageUrl(url);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setImageUrl(null);
  };


  const columns = [
    {
      accessorKey: "_id",
      header: "id",
    },
    {
      accessorKey: "createdAt",
      header: "fecha de creación",
    },
    {
      accessorKey: "uploadedBy.name",
      header: "Nombre",
    },
    {
      header: "Vista previa",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="w-10 cursor-pointer" onClick={() => handleOpenModal(row.original.url)}>
            <img src={`${import.meta.env.VITE_API_DOMAIN}${row.original.url}`} alt="" />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <DataTable
        apiUrl="images/by-date"
        columns={columns}
        filters={[
          // { key: "search", label: "Search", type: "text" },
          // { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
          { key: "startDate", label: "Start Date", type: "date" },
          { key: "endDate", label: "End Date", type: "date" },
        ]}
        initialPageSize={20}
        sortFieldParam="sortBy"
        sortOrderParam="sortOrder"
        searchParam="search"
      />
      <ImageModal imageUrl={imageUrl} onClose={handleCloseModal} />
    </div>
  )

};

export default Historial;
