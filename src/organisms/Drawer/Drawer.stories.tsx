import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Organisms/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    closeOnOverlay: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const DefaultRight: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abrir Drawer (Derecha)</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Panel Lateral"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsOpen(false)}>Guardar</Button>
            </>
          }
        >
          <p>Contenido deslizable desde la derecha.</p>
        </Drawer>
      </div>
    );
  },
};

export const LeftPlacement: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abrir Drawer (Izquierda)</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="left"
          title="Navegación de Menú"
        >
          <p>Contenido deslizable desde la izquierda.</p>
        </Drawer>
      </div>
    );
  },
};

export const BottomPlacement: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abrir Drawer (Inferior)</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="bottom"
          size="md"
          title="Acciones Rápidas"
        >
          <p>Contenido deslizable desde el borde inferior.</p>
        </Drawer>
      </div>
    );
  },
};
