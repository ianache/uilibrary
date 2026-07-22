import { Meta, StoryObj } from '@storybook/react';
import { DetailLayout } from './DetailLayout';
import { Header } from '../../organisms/Header';
import { Breadcrumb } from '../../molecules/Breadcrumb';
import { Button } from '../../atoms/Button';
import { Card } from '../../organisms/Card';
import { Badge } from '../../atoms/Badge';

const meta: Meta<typeof DetailLayout> = {
  title: 'Templates/DetailLayout',
  component: DetailLayout,
  tags: ['autodocs'],
  argTypes: {
    metaPanelPosition: {
      control: 'select',
      options: ['right', 'left'],
    },
    metaPanelWidth: { control: { type: 'number', min: 200, max: 480 } },
    maxWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DetailLayout>;

const mockHeader = (
  <Header
    logo={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#4f46e5' }}>Detalles</span>}
    user={{ name: 'Marcos Soler', avatarSrc: 'https://i.pravatar.cc/150?u=marcos' }}
    sticky={false}
  />
);

const mockBreadcrumb = (
  <Breadcrumb
    items={[
      { label: 'Inicio', href: '#' },
      { label: 'Proyectos', href: '#' },
      { label: 'Proyecto #4028' },
    ]}
  />
);

const mockMetaPanel = (
  <Card title="Metadatos">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
      <div>
        <strong>Estado:</strong> <Badge variant="success">Activo</Badge>
      </div>
      <div>
        <strong>Creado por:</strong> Marcos Soler
      </div>
      <div>
        <strong>Fecha:</strong> 21/07/2026
      </div>
      <div>
        <strong>Versión:</strong> v2.4.0
      </div>
    </div>
  </Card>
);

export const RightMetaPanel: Story = {
  args: {
    header: mockHeader,
    breadcrumb: mockBreadcrumb,
    title: <h1 style={{ margin: 0, fontSize: '24px' }}>Rediseño de Sistema de Componentes</h1>,
    actions: (
      <>
        <Button variant="secondary">Editar</Button>
        <Button variant="danger">Eliminar</Button>
      </>
    ),
    metaPanel: mockMetaPanel,
    metaPanelPosition: 'right',
    metaPanelWidth: 320,
    maxWidth: 1000,
    children: (
      <Card title="Información Detallada">
        <p style={{ lineHeight: 1.6, color: '#334155' }}>
          Este proyecto contempla la implementación de nuevos layouts atómicos y templates estandarizados.
          Se busca una integración ágil con Storybook y soporte completo de tipado con TypeScript.
        </p>
        <p style={{ lineHeight: 1.6, color: '#334155' }}>
          Se ha estructurado la maquetación en DashboardLayout, AuthLayout, ListingLayout, DetailLayout y BlankLayout.
        </p>
      </Card>
    ),
  },
};

export const LeftMetaPanel: Story = {
  args: {
    ...RightMetaPanel.args,
    metaPanelPosition: 'left',
  },
};
