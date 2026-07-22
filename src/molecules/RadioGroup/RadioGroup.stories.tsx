import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupWrapper = (args: Partial<RadioGroupProps>) => {
  const [value, setValue] = useState(args.value || 'option1');
  return (
    <RadioGroup
      name="demo-radio"
      options={[
        { value: 'option1', label: 'Opción 1', description: 'Descripción de la opción 1' },
        { value: 'option2', label: 'Opción 2', description: 'Descripción de la opción 2' },
        { value: 'option3', label: 'Opción 3', description: 'Opción deshabilitada', disabled: true },
      ]}
      {...args}
      value={value}
      onChange={(newVal) => {
        setValue(newVal);
        args.onChange?.(newVal);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    label: 'Selecciona una opción',
    name: 'default-radio',
  },
};

export const CardVariant: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    label: 'Planes disponibles',
    name: 'card-radio',
    variant: 'card',
    options: [
      { value: 'basic', label: 'Plan Básico', description: '10 GB de almacenamiento, 1 usuario' },
      { value: 'pro', label: 'Plan Pro', description: '100 GB de almacenamiento, usuarios ilimitados' },
      { value: 'enterprise', label: 'Plan Enterprise', description: 'Almacenamiento ilimitado, soporte 24/7' },
    ],
  },
};

export const Horizontal: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    label: 'Frecuencia de pago',
    name: 'horizontal-radio',
    direction: 'horizontal',
    options: [
      { value: 'monthly', label: 'Mensual' },
      { value: 'quarterly', label: 'Trimestral' },
      { value: 'annual', label: 'Anual (20% descuento)' },
    ],
  },
};

export const WithError: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    label: 'Método de envío',
    name: 'error-radio',
    error: 'Debes seleccionar un método de envío para continuar',
  },
};

export const DisabledGroup: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    label: 'Grupo deshabilitado',
    name: 'disabled-radio',
    disabled: true,
  },
};
