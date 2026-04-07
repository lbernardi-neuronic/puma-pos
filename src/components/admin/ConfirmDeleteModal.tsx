import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, description }: ConfirmDeleteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="p-6 pb-0">
          <div className="w-12 h-12 bg-red-50 text-pumas-red rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold text-white bg-pumas-red hover:bg-red-600 rounded-xl transition-colors shadow-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
