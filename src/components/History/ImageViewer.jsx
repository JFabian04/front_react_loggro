import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import { handleDownload } from '@/utils/downloadBlob';

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="bg-white p-4 rounded-lg w-full sm:w-96 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Vista previa</h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-700 hover:text-gray-900"
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_API_DOMAIN}${imageUrl}`}
                                    alt="Vista previa"
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                            <div className="flex justify-end items-center pt-3">
                                <Button onClick={() => handleDownload(imageUrl)}>
                                    Descargar <Download />
                                </Button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ImageModal;
