import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../utils';

interface CertificateModalProps {
    goalName: string;
    totalAmount: number;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ goalName, totalAmount, onClose }) => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setIsGenerating(true);
        try {
            // Wait for fonts/images to be fully ready
            await document.fonts.ready;

            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher resolution
                useCORS: true,
                backgroundColor: null, // Transparent background if needed, but we set a gradient
                logging: false,
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `minha-meta-conquista-${goalName.replace(/\s+/g, '-').toLowerCase()}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating certificate", error);
            alert("Erro ao gerar a imagem. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    const currentDate = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in overflow-y-auto">
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Certificate Card - This part gets captured */}
                <div
                    ref={certificateRef}
                    className="w-full aspect-[4/5] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center border border-gray-700 select-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-primary rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-purple-600 rounded-full blur-[100px]"></div>
                        {/* Confetti/Noise Texture could go here */}
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center w-full h-full justify-between py-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-2 opacity-80">
                                <div className="w-6 h-6 bg-gradient-to-tr from-primary to-purple-500 rounded flex items-center justify-center">
                                    <span className="material-icons-round text-white text-[10px]">savings</span>
                                </div>
                                <span className="font-bold tracking-widest text-xs uppercase">Minha Meta</span>
                            </div>
                            <div className="inline-block px-4 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                                Certificado de Conquista
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-black mb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                META<br />CONCLUÍDA!
                            </h1>

                            <div className="text-6xl text-yellow-400 mb-6 drop-shadow-lg">
                                🏆
                            </div>

                            <div className="w-full border-t border-white/10 my-4"></div>

                            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Objetivo Alcançado</p>
                            <h2 className="text-2xl font-bold mb-4 text-white line-clamp-2 px-4">{goalName}</h2>

                            <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/5">
                                <p className="text-xs text-gray-400 mb-1">Valor Total Acumulado</p>
                                <p className="text-3xl font-mono font-bold text-primary">{formatCurrency(totalAmount)}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="w-full text-center mt-6">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{currentDate}</p>
                            <div className="flex justify-center gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className="material-icons-round text-yellow-500 text-xs">star</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 w-full">
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="w-full py-4 bg-primary hover:bg-primary-dark disabled:bg-gray-600 text-white font-bold rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        {isGenerating ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Gerando...
                            </>
                        ) : (
                            <>
                                <span className="material-icons-round group-hover:-translate-y-1 transition-transform">download</span>
                                Salvar Certificado
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-sm font-medium py-2"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
