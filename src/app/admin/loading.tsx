export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">Cargando datos...</p>
      </div>
    </div>
  );
}
