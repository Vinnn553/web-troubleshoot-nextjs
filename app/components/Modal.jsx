// app/components/Modal.jsx
'use client';
import "@/app/globals.css"

export default function Modal({ isOpen, onClose, tutorial }) {
    if (!isOpen || !tutorial) return null;

    return (
        // Backdrop overlay
        <div
            onClick={onClose}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-modal-backdrop"
        >
            {/* Modal Dialog Card */}
            <div
                onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-modal-content will-change-transform"
            >
                {/* Header Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <span className="text-xs uppercase tracking-wider font-bold text-[#42a6f8] bg-[#E8F5E9] px-3 py-1 rounded-full inline-block mb-2">
                            {tutorial.kategori}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {tutorial.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer text-lg font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* Konten Langkah Solusi (Scrollable) */}
                <div className="p-6 overflow-y-auto space-y-4">
                    <h3 className="font-semibold text-gray-800 text-lg">Langkah Pemecahan Masalah:</h3>

                    <div className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                        {tutorial.langkah}
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#42a6f8] hover:bg-[#3283c7] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
                    >
                        Selesai Membaca
                    </button>
                </div>
            </div>
        </div>
    );
}