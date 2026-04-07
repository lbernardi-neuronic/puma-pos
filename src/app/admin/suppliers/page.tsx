'use client';

import { mockSuppliers, mockCategories, Supplier, CondicionIVA, Category } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, X, Users, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

type ModalMode = 'none' | 'create' | 'edit' | 'delete';

const condicionesIVA: CondicionIVA[] = ['Responsable Inscripto', 'Monotributista', 'Exento', 'Consumidor Final'];

const emptyForm: Omit<Supplier, 'id'> = {
  name: '', contact: '', phone: '', email: '',
  cuit: '', address: '', condicionIVA: 'Responsable Inscripto',
  category: 'Café y Bebidas Calientes', notes: '', active: true,
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [modalMode, setModalMode] = useState<ModalMode>('none');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setModalMode('create');
  };

  const openEdit = (sup: Supplier) => {
    setForm({
      name: sup.name, contact: sup.contact, phone: sup.phone, email: sup.email,
      cuit: sup.cuit, address: sup.address, condicionIVA: sup.condicionIVA,
      category: sup.category, notes: sup.notes, active: sup.active,
    });
    setSelectedId(sup.id);
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
      const newSup: Supplier = { ...form, id: `sup-${Date.now()}` };
      setSuppliers([...suppliers, newSup]);
    } else if (modalMode === 'edit' && selectedId) {
      setSuppliers(suppliers.map(s => s.id === selectedId ? { ...s, ...form } : s));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedId) {
      setSuppliers(suppliers.filter(s => s.id !== selectedId));
    }
    closeModal();
  };

  // Get category color from mockCategories
  const getCatColor = (catName: string) => mockCategories.find(c => c.name === catName)?.color || '#64748b';

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 lg:mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-1 sm:mb-2">Proveedores</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Gestión de proveedores y contactos comerciales.</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-brand-primary-dark hover:bg-brand-primary text-white font-bold py-3 px-5 sm:px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-95 w-full sm:w-auto justify-center sm:justify-start shrink-0"
        >
          <Plus className="w-5 h-5" />
          Nuevo Proveedor
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6 lg:mb-10 overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 sm:px-8 py-4 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 tracking-widest uppercase items-center min-w-[700px]">
          <div className="col-span-3">Empresa</div>
          <div className="col-span-2">Contacto</div>
          <div className="col-span-2">Teléfono</div>
          <div className="col-span-1">CUIT</div>
          <div className="col-span-2">Categoría</div>
          <div className="col-span-1">Estado</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {suppliers.map((sup) => (
            <div key={sup.id} className="grid grid-cols-12 gap-4 px-4 sm:px-8 py-5 items-center hover:bg-slate-50 transition-colors group min-w-[700px]">
              {/* Company */}
              <div className="col-span-3">
                <p className="text-sm font-bold text-slate-800 leading-tight">{sup.name}</p>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">{sup.condicionIVA}</p>
              </div>
              {/* Contact */}
              <div className="col-span-2">
                <p className="text-sm font-medium text-slate-700">{sup.contact}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{sup.email}</p>
              </div>
              {/* Phone */}
              <div className="col-span-2 text-sm font-medium text-slate-700">{sup.phone}</div>
              {/* CUIT */}
              <div className="col-span-1 text-xs font-mono font-bold text-slate-500">{sup.cuit.split('-')[1]?.substring(0, 4)}...</div>
              {/* Category badge */}
              <div className="col-span-2">
                <span
                  className="inline-flex text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase border"
                  style={{
                    color: getCatColor(sup.category),
                    backgroundColor: `${getCatColor(sup.category)}10`,
                    borderColor: `${getCatColor(sup.category)}25`,
                  }}
                >
                  {sup.category.split(' ')[0]}
                </span>
              </div>
              {/* Status */}
              <div className="col-span-1 flex items-center gap-1.5">
                <div className={clsx("w-2 h-2 rounded-full", sup.active ? "bg-brand-primary" : "bg-slate-300")} />
                <span className={clsx("text-xs font-bold", sup.active ? "text-brand-primary" : "text-slate-400")}>
                  {sup.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              {/* Actions */}
              <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(sup)}
                  className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDelete(sup.id)}
                  className="p-2 text-slate-400 hover:text-pumas-red hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-brand-secondary rounded-2xl p-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-brand-primary-dark" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Proveedores Activos</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">{suppliers.filter(s => s.active).length}</p>
        </div>
        <div className="bg-brand-secondary rounded-2xl p-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-[#8b6f00]" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Categorías Cubiertas</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">
            {new Set(suppliers.filter(s => s.active).map(s => s.category)).size}
          </p>
        </div>
        <div className="bg-brand-secondary rounded-2xl p-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
            <Phone className="w-6 h-6 text-slate-700" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Inactivos</p>
          <p className="text-3xl font-black text-pumas-red tracking-tighter mt-1">{suppliers.filter(s => !s.active).length}</p>
        </div>
      </div>

      {/* ── Create / Edit Modal ────────────────────────────── */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-6">
              {modalMode === 'create' ? 'Nuevo Proveedor' : 'Editar Proveedor'}
            </h3>

            <div className="space-y-5">
              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Nombre de Empresa</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Distribuidora Norte S.A."
                  className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 outline-none transition-all"
                />
              </div>

              {/* Contact + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Persona de Contacto</label>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="Nombre y Apellido"
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Teléfono</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="011-XXXX-XXXX"
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email + CUIT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">CUIT</label>
                  <input
                    type="text"
                    value={form.cuit}
                    onChange={(e) => setForm({ ...form, cuit: e.target.value })}
                    placeholder="XX-XXXXXXXX-X"
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold font-mono placeholder-slate-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Dirección</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Calle, Número, Localidad"
                  className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 outline-none transition-all"
                />
              </div>

              {/* Category + Condición IVA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Categoría que Provee</label>
                  <select
                    defaultValue={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold appearance-none outline-none transition-all"
                  >
                    {mockCategories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Condición IVA</label>
                  <select
                    defaultValue={form.condicionIVA}
                    onChange={(e) => setForm({ ...form, condicionIVA: e.target.value as CondicionIVA })}
                    className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold appearance-none outline-none transition-all"
                  >
                    {condicionesIVA.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Notas</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Condiciones de entrega, plazos de pago, observaciones..."
                  className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-medium placeholder-slate-400 resize-none outline-none transition-all"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Proveedor Activo</p>
                  <p className="text-[11px] text-slate-500 font-medium">Habilitado para órdenes de compra</p>
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

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={closeModal}
                className="flex-1 py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-4 px-4 bg-brand-primary-dark hover:bg-brand-primary text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-primary/20"
              >
                {modalMode === 'create' ? 'Crear Proveedor' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ──────────────────────── */}
      {modalMode === 'delete' && selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 relative">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-pumas-red">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">¿Eliminar proveedor?</h3>
            <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
              Esta acción no se puede deshacer. Se eliminará permanentemente el proveedor del sistema.
            </p>
            <div className="flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-4 px-4 bg-pumas-red hover:bg-[#b71c1c] text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
