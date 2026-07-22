import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from './InputGroup';

const meta: Meta<typeof InputGroup> = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: {
    inputProps: {
      placeholder: 'ejemplo.com',
    },
    addonLeft: 'https://',
  },
};

export const WithRightAddon: Story = {
  args: {
    inputProps: {
      placeholder: '0.00',
    },
    addonLeft: '$',
    addonRight: 'USD',
  },
};

export const WithLeftButton: Story = {
  args: {
    inputProps: {
      placeholder: 'Buscar...',
    },
    buttonLeft: {
      label: 'Filtro',
      icon: 'filter',
      onClick: () => alert('Filtro click'),
    },
  },
};

export const WithRightButton: Story = {
  args: {
    inputProps: {
      placeholder: 'Buscar en la base de datos...',
    },
    buttonRight: {
      label: 'Buscar',
      icon: 'search',
      onClick: () => alert('Buscar click'),
    },
  },
};

export const WithBothAddonsAndButtons: Story = {
  args: {
    inputProps: {
      placeholder: 'mi-usuario',
    },
    addonLeft: '@',
    buttonRight: {
      label: 'Verificar',
      onClick: () => alert('Verificando...'),
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    inputProps: {
      placeholder: 'Buscar...',
    },
    addonLeft: 'https://',
    buttonRight: {
      label: 'Ir',
      onClick: () => {},
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    inputProps: {
      placeholder: 'Buscar...',
    },
    addonLeft: 'https://',
    buttonRight: {
      label: 'Ir',
      onClick: () => {},
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    inputProps: {
      label: 'Sitio Web',
      placeholder: 'tu-dominio',
      hint: 'Ingresa tu subdominio de empresa',
    },
    addonLeft: 'https://',
    addonRight: '.midominio.com',
  },
};

export const WithError: Story = {
  args: {
    inputProps: {
      label: 'Nombre de usuario',
      placeholder: 'usuario',
      error: 'Este nombre de usuario ya está registrado',
    },
    addonLeft: '@',
  },
};

export const Disabled: Story = {
  args: {
    inputProps: {
      label: 'Campo deshabilitado',
      placeholder: 'No editable',
      disabled: true,
    },
    addonLeft: 'https://',
    buttonRight: {
      label: 'Buscar',
      icon: 'search',
      onClick: () => {},
    },
  },
};
