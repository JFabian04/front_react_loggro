import axiosInstance from "@/utils/axios";
import { formatDate, formatHour } from "@/utils/validationError";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const TableHour = ({ isOpen, onClose, params }) => {
    const [data, setData] = useState();
    console.log('PARAMS: ', params);

    //Funcion para obtener los resutados de las horas
    const fetchData = async () => {
        const data = await axiosInstance.get('images/by-hour', { params });
        setData(data.data.data);
        console.log('RESPP: ', data.data.data);

    }

    useEffect(() => {
        if (params && params.startDate && params.endDate) {
            fetchData();
        }
    }, [params]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white py-4 px-5 text-left shadow-xl transition-all">
                                <Dialog.Title className="">
                                    <p className="text-lg font-medium px-2 rounded-lg bg-sky-100 text-sky-600 w-fit">Cantidad de Registros por hora</p>
                                </Dialog.Title>
                                <div className="mt-4 space-y-4 min-h-[100px] max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400/70 scrollbar-track-transparent">
                                    {data && Object.keys(data).length > 0 ? (
                                        Object.entries(data).map(([date, hours]) => (
                                            <div key={date} className="border rounded p-4">
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Fecha: {formatDate(date)}
                                                </h3>
                                                <table className="w-full border-collapse border">
                                                    <thead>
                                                        <tr>
                                                            <th className="border px-4 py-2">Hora</th>
                                                            <th className="border px-4 py-2">Cantidad</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {hours.map(({ hour, count }, index) => (
                                                            <tr key={index}>
                                                                <td className="border px-4 py-2">{formatHour(hour)}</td>
                                                                <td className="border px-4 py-2">{count}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-gray-100 text-gray-600 shadow font-bold p-4 rounded-lg">
                                            <p>No hay datos disponibles.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TableHour;
