import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnOverlay: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirmar Acción"
          description="¿Estás seguro de que deseas guardar los cambios realizados?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
            </>
          }
        >
          <p>Este es el contenido principal del modal. Puedes incluir cualquier tipo de elemento interactivo.</p>
        </Modal>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal Cargando</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Procesando Datos"
          description="Por favor espera mientras finaliza el proceso..."
          loading={true}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button loading>Guardando...</Button>
            </>
          }
        >
          <p>Los botones del footer se encuentran deshabilitados mientras el estado loading sea verdadero.</p>
        </Modal>
      </div>
    );
  },
};

export const LargeSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Modal Grande</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          title="Configuración Avanzada"
          footer={<Button onClick={() => setIsOpen(false)}>Cerrar</Button>}
        >
          <p>Este modal usa el tamaño grande (lg: 720px).</p>
        </Modal>
      </div>
    );
  },
};
