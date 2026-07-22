import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Molecules/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: { control: 'boolean' },
    icon: { control: 'boolean' },
    onDismiss: { action: 'dismissed' },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Nueva actualización',
    message: 'Una nueva versión del sistema está disponible. Revisa las notas de lanzamiento.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Operación exitosa',
    message: 'Los cambios se han guardado correctamente en la base de datos.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Advertencia de espacio',
    message: 'Tu almacenamiento está al 85% de su capacidad total.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error de conexión',
    message: 'No se pudo conectar con el servidor remoto. Intenta nuevamente más tarde.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Notificación descartable',
    message: 'Puedes cerrar esta notificación haciendo clic en el botón X de la esquina.',
    dismissible: true,
  },
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Suscripción por vencer',
    message: 'Tu plan actual expira en 3 días. Renueva hoy para mantener el acceso.',
    action: {
      label: 'Renovar ahora',
      onClick: () => alert('Acción de renovación ejecutada'),
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    message: 'Notificación simple sin icono informativo.',
    icon: false,
  },
};
