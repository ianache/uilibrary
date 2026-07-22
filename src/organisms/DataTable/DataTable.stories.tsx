import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

interface SampleUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: SampleUser[] = [
  { id: '1', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Administrador', status: 'Activo' },
  { id: '2', name: 'Carlos López', email: 'carlos.lopez@example.com', role: 'Editor', status: 'Inactivo' },
  { id: '3', name: 'María Rodríguez', email: 'maria.rodriguez@example.com', role: 'Usuario', status: 'Activo' },
  { id: '4', name: 'Juan Martínez', email: 'juan.martinez@example.com', role: 'Editor', status: 'Pendiente' },
  { id: '5', name: 'Laura Sánchez', email: 'laura.sanchez@example.com', role: 'Administrador', status: 'Activo' },
];

const sampleColumns = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'email', header: 'Correo Electrónico', sortable: true },
  { key: 'role', header: 'Rol', sortable: true },
  { key: 'status', header: 'Estado', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
    sortable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<SampleUser>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    caption: 'Listado general de usuarios registrados',
  },
};

export const SelectableAndPaginated: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
    selectedIds: ['1', '3'],
    pagination: {
      page: 1,
      pageSize: 5,
      total: 15,
    },
  },
};

export const LoadingState: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    loading: true,
  },
};

export const ErrorState: Story = {
  args: {
    data: [],
    columns: sampleColumns,
    error: 'Error al obtener los registros del servidor. Intente nuevamente.',
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: sampleColumns,
    emptyMessage: 'No se encontraron resultados para los criterios de búsqueda.',
  },
};
