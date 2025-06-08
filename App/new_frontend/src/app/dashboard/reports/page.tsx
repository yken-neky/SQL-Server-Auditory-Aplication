'use client'

import Breadcrumb from '@/components/Breadcrumb'

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Breadcrumb 
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reportes' }
        ]} 
      />
      
      {/* Contenido de la página de reportes */}
    </div>
  )
} 