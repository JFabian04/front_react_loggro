import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";

export function DataTable({
    columns,
    apiUrl,
    initialPageSize = 10,
    filters = [],
    sortFieldParam = "sortField",
    sortOrderParam = "sortOrder",
    searchParam = "search",
    onFilterChange = () => { },
}) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    useEffect(() => {
        const sortField = sorting.length ? sorting[0].id : undefined;
        const sortOrder = sorting.length ? (sorting[0].desc ? "desc" : "asc") : undefined;

        setIsLoading(true);

        // Construcción dinámica de parámetros para la consulta
        const params = {
            page: pageIndex + 1,
            limit: pageSize,
            [sortFieldParam]: sortField,
            [sortOrderParam]: sortOrder,
            [searchParam]: globalFilter,
            ...filterValues,
        };

        axiosInstance
            .get(apiUrl, { params })
            .then((response) => {
                setData(response.data.data);
                setTotal(response.data.total);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [pageIndex, pageSize, globalFilter, sorting, apiUrl, filterValues, filters, sortFieldParam, sortOrderParam, searchParam]);

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(total / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
            sorting,
            globalFilter,
        },
        manualPagination: true,
        manualSorting: true,
        manualGlobalFilter: true,
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === "function"
                    ? updater({ pageIndex, pageSize })
                    : updater;
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
    });

    // Manejo dinámico de los filtros
    const handleFilterChange = (key, value) => {
        const newFilterValues = { ...filterValues, [key]: value };
        setFilterValues(newFilterValues)
        onFilterChange(newFilterValues);
    };

    const getNestedValue = (obj, path) => {
        return path
            .split('.')
            .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
    };

    return (
        // <div className="w-full flex justify-center">
            <div className="bg-white md:min-w-[900px] max-w-7xl rounded-md border overflow-hidden ">
                <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-14">
                    {/* Search Input */}
                    {/* <div className="p-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={globalFilter || ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="border p-2 w-full rounded-md mt-4"
                        />
                    </div> */}

                    {/* Dynamic Filters */}
                    {filters.map((filter, index) => (
                        <div key={index} className="p-4 w-full sm:w-auto flex gap-4">
                            <div className="w-full ">
                                <label htmlFor={filter.key} className="block text-sm">{filter.label}</label>
                                {filter.type === "date" ? (
                                    <input
                                        id={filter.key}
                                        type="date"
                                        value={filterValues[filter.key] || ""}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        className="border p-2 rounded-md w-full"
                                    />
                                ) : filter.type === "select" ? (
                                    <select
                                        id={filter.key}
                                        value={filterValues[filter.key] || ""}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        className="border p-2 rounded-md w-full"
                                    >
                                        {filter.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={filter.key}
                                        type="text"
                                        value={filterValues[filter.key] || ""}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        className="border p-2 rounded-md w-full"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Records Per Page Selector */}
                    <div className="p-4 w-full sm:w-auto">
                        <label htmlFor="pageSize" className="block text-sm">Items por página</label>
                        <select
                            id="pageSize"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="border p-2 rounded-md w-full"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                {/* Table container with scroll */}
                <div className="overflow-x-auto max-h-[calc(100vh-400px)]  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <Table>
                        <TableHeader className="shadow">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            onClick={
                                                header.column.getCanSort()
                                                    ? () => header.column.toggleSorting()
                                                    : undefined
                                            }
                                            className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() === "asc" && " 🔼"}
                                            {header.column.getIsSorted() === "desc" && " 🔽"}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            const value = getNestedValue(row.original, cell.column.id);
                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, {
                                                        ...cell.getContext(),
                                                        value, 
                                                    })}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No hay resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between p-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 border rounded-md"
                    >
                        Atrás
                    </button>
                    <span>
                        Pagina {pageIndex + 1} de {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 border rounded-md"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        //</div>
    );
}
