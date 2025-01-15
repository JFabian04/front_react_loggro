import React, { useState } from 'react';
import { DataTable } from '@/components/data-table';
import ImageModal from '@/components/History/ImageViewer';
import { formatDate } from '@/utils/validationError';
import TableHour from '@/components/History/TableHour';
import { Button } from '@/components/ui/button';

const Historial = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isViwerOpen, setIsViwerOpen] = useState(false);
  const [params, setParams] = useState(null);
  const [detailStatus, setDetailStatus] = useState(true);

  // Función para abrir el vizualizador de imagenes (Modal)
  const handleOpenModal = (url) => {
    console.log(url);
    setImageUrl(url);
  };

  // Función para cerrar el vizualizador de imagenes (Modal)
  const handleCloseModal = () => {
    setImageUrl(null);
  };

  //Abrir el modal de detalles y pasarle los parametros de fechas
  const handleFilterChange = (filters) => {
    const { startDate, endDate } = filters;

    if (startDate && endDate) {
      setParams({ startDate, endDate });
      setDetailStatus(false)
    } else {
      setDetailStatus(true)
    }
  };


  const columns = [
    {
      accessorKey: "_id",
      header: "id",
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de creación",
      cell: ({ value }) => formatDate(value, true),
    },
    {
      accessorKey: "uploadedBy.name",
      header: "Nombre",
    },
    {
      header: "Vista previa",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex items-center h-6">
          <div className="w-10 cursor-pointer" onClick={() => handleOpenModal(row.original.url)}>
            <img src={`${import.meta.env.VITE_API_DOMAIN}${row.original.url}`} alt="" />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className=''>
      <div className="w-full flex justify-center items-center">
        <div className="w-full xl:w-auto">

          <div className="" title="Filtra por fechas para ver los detalles (Cantidad por horas)">
            <Button disabled={detailStatus} className="shadow-lg bg-sky-600 hover:bg-sky-400 mb-2 cursor-pointer" onClick={() => setIsViwerOpen(true)}>
              Detalles
            </Button>
          </div>
          <DataTable
            apiUrl="images/by-date"
            columns={columns}
            filters={[
              // { key: "search", label: "Search", type: "text" },
              // { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
              { key: "startDate", label: "Fecha Inicial", type: "date" },
              { key: "endDate", label: "Fecha Final", type: "date" },
            ]}
            initialPageSize={20}
            sortFieldParam="sortBy"
            sortOrderParam="sortOrder"
            searchParam="search"
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <ImageModal imageUrl={imageUrl} onClose={handleCloseModal} />
      <TableHour
        isOpen={isViwerOpen}
        onClose={() => setIsViwerOpen(false)}
        params={params}
      />
    </div>
  )

};

export default Historial;
