'use client';

import { mockCategories, mockProducts, CategoryItem } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import clsx from 'clsx';

type ModalMode = 'none' | 'create' | 'edit' | 'delete';

const emptyForm: Omit<CategoryItem, 'id'> = {
  name: '' as CategoryItem['name'],
  icon: '📦',
  color: '#00701a',
  description: '',
  active: true,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [modalMode, setModalMode] = useState<ModalMode>('none');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Count products per category from mock data
  const productCount = (catName: string) => mockProducts.filter(p => p.category === catName).length;

  const openCreate = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setModalMode('create');
  };

  const openEdit = (cat: CategoryItem) => {
    setForm({ name: cat.name, icon: cat.icon, color: cat.color, description: cat.description, active: cat.active });
    setSelectedId(cat.id);
    setModalMode('edit');
  };

  const openDelete = (id: string) => {
    setSelectedId(id);
    setModalMode('delete');
  };

  const closeModal = () => {
    setModalMode('none');
    setSelectedId(null);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newCat: CategoryItem = { ...form, id: `cat-${Date.now()}` };
      setCategories([...categories, newCat]);
    } else if (modalMode === 'edit' && selectedId) {
      setCategories(categories.map(c => c.id === selectedId ? { ...c, ...form } : c));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedId) {
      setCategories(categories.filter(c => c.id !== selectedId));
    }
    closeModal();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (modalMode === 'create' || modalMode === 'edit')) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalMode]);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 lg:mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-1 sm:mb-2">Categorías de Productos</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Organización del catálogo de tienda y combustibles.</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand-primary-dark hover:bg-brand-primary text-white font-bold py-3 px-5 sm:px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-95 w-full sm:w-auto justify-center sm:justify-start shrink-0"
        >
          <Plus className="w-5 h-5" />
          Nueva Categoría
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative"
          >
            {/* Action Buttons (hover) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(cat)}
                className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => openDelete(cat.id)}
                className="p-2 text-slate-400 hover:text-pumas-red hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
                aria-label={`Eliminar categoría ${cat.name}`}
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Icon + Count */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                {cat.icon}
              </div>
              <span className="text-3xl font-black text-slate-800 tracking-tight">
                {productCount(cat.name)}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-sm font-bold text-slate-800 mb-1 leading-tight">{cat.name}</h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">{cat.description}</p>

            {/* Footer: Color dot + Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Color</span>
              </div>
              <span className={clsx(
                "text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5",
                cat.active ? "text-brand-primary" : "text-slate-400"
              )}>
                <div className={clsx("w-2 h-2 rounded-full", cat.active ? "bg-brand-primary" : "bg-slate-300")} />
                {cat.active ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-brand-secondary rounded-2xl p-6">
          <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase mb-1">Categorías Activas</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">{categories.filter(c => c.active).length}</p>
        </div>
        <div className="bg-brand-secondary rounded-2xl p-6">
          <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase mb-1">Total Productos</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">{mockProducts.length}</p>
        </div>
        <div className="bg-brand-secondary rounded-2xl p-6">
          <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase mb-1">Sin Productos</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">
            {categories.filter(c => productCount(c.name) === 0).length}
          </p>
        </div>
      </div>

      {/* ── Create / Edit Modal ────────────────────────────── */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSave(); }}
            className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 relative"
            role="dialog"
            aria-modal="true"
            aria-label={modalMode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
          >
            {/* Close */}
            <button type="button" onClick={closeModal} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-6">
              {modalMode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
            </h3>

            <div className="space-y-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value as CategoryItem['name'] })}
                  placeholder="Ej: Snacks Frescos"
                  required
                  className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 outline-none transition-all"
                />
              </div>

              {/* Icon + Color row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Icono (Emoji)</label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    required
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-2xl text-center outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Color</label>
                  <div className="flex items-center gap-3 bg-slate-50 ring-1 ring-slate-200 rounded-xl px-4 py-2.5">
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-10 h-10 rounded-lg border-0 p-0"
                    />
                    <span className="text-sm font-mono font-bold text-slate-500">{form.color}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Descripción</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Descripción breve de la categoría..."
                  className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-medium placeholder-slate-400 resize-none outline-none transition-all"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Categoría Activa</p>
                  <p className="text-[11px] text-slate-500 font-medium">Visible en POS y Backoffice</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, active: !form.active })}
                  className={clsx(
                    "w-14 h-8 rounded-full flex items-center p-1 transition-colors",
                    form.active ? "bg-brand-primary" : "bg-slate-300"
                  )}
                >
                  <div className={clsx(
                    "bg-white w-6 h-6 rounded-full shadow-sm transition-transform",
                    form.active ? "translate-x-6" : "translate-x-0"
                  )} />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-4 px-4 bg-brand-primary-dark hover:bg-brand-primary text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-primary/20"
              >
                {modalMode === 'create' ? 'Crear Categoría' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={modalMode === 'delete'}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="¿Eliminar categoría?"
        description="Esta acción no se puede deshacer. Los productos asociados quedarán sin categoría asignada."
      />
    </div>
  );
}
