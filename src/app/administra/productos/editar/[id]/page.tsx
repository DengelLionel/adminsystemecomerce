// src/app/administra/productos/editar/[id]/page.tsx
import EditarProducto from '@/components/EditarProducto';

export default function Page({ params }: { params: { id: string } }) {
  return <EditarProducto params={params} />;
}



