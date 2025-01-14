import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios';
import { DataTable } from '@/components/data-table';
const Home = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "description",
      header: "description",
    },
    {
      accessorKey: "created_at",
      header: "fecha",
    },
  ]

  return (
    <div>
      <DataTable
        apiUrl="projects" 
        columns={columns}  
        filters={[
          { key: "search", label: "Search", type: "text" },
          { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
          { key: "startDate", label: "Start Date", type: "date" },
          { key: "endDate", label: "End Date", type: "date" },
        ]} 
        initialPageSize={20} 
        sortFieldParam="sortField"
        sortOrderParam="sortOrder"
        searchParam="searc" 
      />

    </div>
  )

};

export default Home;
