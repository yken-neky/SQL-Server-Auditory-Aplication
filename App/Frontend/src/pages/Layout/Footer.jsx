
export function Footer() {
  return (
    <div className="w-full h-12 bg-white p-3 shadow-lg shadow-gray-500/50 z-50 sticky bottom-0 border-t-2 border-black">
      <div className="flex justify-between items-center text-blue-900 font-semibold">
        <p className="text-sm">© 2024 S.H.I.E.L.D. por Yan Luis González Palomo</p>
        <div className="flex space-x-4">
          <a href="#" className="text-sm hover:underline">Política de Privacidad</a>
          <a href="#" className="text-sm hover:underline">Términos de servicio</a>
        </div>
      </div>
    </div>
  )
}
