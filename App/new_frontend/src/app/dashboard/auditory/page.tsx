'use client'

import Breadcrumb from '@/components/Breadcrumb'

export default function AuditoryPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Breadcrumb 
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Auditoría' }
        ]} 
      />
      
      {/* Contenido de la página de reportes */}
    </div>
  )
} 