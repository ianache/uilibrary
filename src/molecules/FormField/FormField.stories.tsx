import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';
import { Select } from '../../atoms/Select';
import { Textarea } from '../../atoms/Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Nombre completo',
    children: <Input placeholder="Juan Pérez" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Correo electrónico',
    required: true,
    children: <Input placeholder="juan@ejemplo.com" type="email" />,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Nombre de usuario',
    hint: 'Debe contener al menos 3 caracteres',
    children: <Input placeholder="juan123" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Contraseña',
    required: true,
    error: 'La contraseña debe tener al menos 8 caracteres',
    children: <Input type="password" />,
  },
};

export const ErrorReplacesHint: Story = {
  args: {
    label: 'Código postal',
    hint: 'Formato de 5 dígitos',
    error: 'Código postal inválido',
    children: <Input placeholder="28001" />,
  },
};

export const WithSelectChild: Story = {
  args: {
    label: 'País',
    required: true,
    children: (
      <Select
        placeholder="Seleccione un país"
        options={[
          { value: 'es', label: 'España' },
          { value: 'mx', label: 'México' },
          { value: 'co', label: 'Colombia' },
        ]}
      />
    ),
  },
};

export const WithTextareaChild: Story = {
  args: {
    label: 'Comentarios',
    hint: 'Máximo 500 caracteres',
    children: <Textarea placeholder="Escriba sus comentarios aquí..." />,
  },
};
