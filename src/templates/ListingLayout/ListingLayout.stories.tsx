import { Meta, StoryObj } from '@storybook/react';
import { ListingLayout } from './ListingLayout';
import { Header } from '../../organisms/Header';
import { Breadcrumb } from '../../molecules/Breadcrumb';
import { Button } from '../../atoms/Button';
import { FilterBar } from '../../organisms/FilterBar';
import { Card } from '../../organisms/Card';

const meta: Meta<typeof ListingLayout> = {
  title: 'Templates/ListingLayout',
  component: ListingLayout,
  tags: ['autodocs'],
  argTypes: {
    contentLayout: {
      control: 'select',
      options: ['table', 'grid', 'list'],
    },
    gridColumns: {
      control: 'select',
      options: [2, 3, 4],
    },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ListingLayout>;

const mockHeader = (
  <Header
    logo={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#4f46e5' }}>Proyectos</span>}
    user={{ name: 'Laura Martinez', avatarSrc: 'https://i.pravatar.cc/150?u=laura' }}
    sticky={false}
  />
);

const mockBreadcrumb = (
  <Breadcrumb
    items={[
      { label: 'Inicio', href: '#' },
      { label: 'Proyectos', href: '#' },
      { label: 'Listado' },
    ]}
  />
);

const mockFilterBar = (
  <FilterBar
    searchQuery=""
    values={{}}
    onChange={() => {}}
    onReset={() => {}}
    onSearch={() => {}}
    filters={[
      {
        id: 'status',
        label: 'Estado',
        type: 'select',
        options: [
          { label: 'Activo', value: 'active' },
          { label: 'Completado', value: 'completed' },
        ],
      },
    ]}
  />
);

export const GridView: Story = {
  args: {
    header: mockHeader,
    breadcrumb: mockBreadcrumb,
    title: <h1 style={{ margin: 0, fontSize: '24px' }}>Catálogo de Productos</h1>,
    actions: (
      <>
        <Button variant="secondary">Exportar</Button>
        <Button variant="primary">Nuevo Producto</Button>
      </>
    ),
    filterBar: mockFilterBar,
    contentLayout: 'grid',
    gridColumns: 3,
    loading: false,
    children: Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} title={`Producto ${i + 1}`}>
        <p style={{ margin: 0, color: '#475569' }}>Descripción corta del elemento del catálogo {i + 1}.</p>
      </Card>
    )),
  },
};

export const ListView: Story = {
  args: {
    ...GridView.args,
    contentLayout: 'list',
    children: Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} title={`Elemento de Lista ${i + 1}`}>
        <p style={{ margin: 0, color: '#475569' }}>Vista de lista detallada con información horizontal expandida.</p>
      </Card>
    )),
  },
};
