import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput, TagInputProps } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Molecules/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  argTypes: {
    tagVariant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    disabled: { control: 'boolean' },
    allowDuplicates: { control: 'boolean' },
    maxTags: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

const TagInputWrapper = (args: Partial<TagInputProps>) => {
  const [tags, setTags] = useState<string[]>(args.value || ['React', 'TypeScript']);
  return (
    <TagInput
      {...args}
      value={tags}
      onChange={(newTags) => {
        setTags(newTags);
        args.onChange?.(newTags);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <TagInputWrapper {...args} />,
  args: {
    label: 'Etiquetas',
    placeholder: 'Añadir tecnología...',
    value: ['React', 'TypeScript', 'CSS'],
  },
};

export const WithMaxTags: Story = {
  render: (args) => <TagInputWrapper {...args} />,
  args: {
    label: 'Habilidades (Máximo 3)',
    placeholder: 'Añadir habilidad...',
    value: ['HTML', 'CSS'],
    maxTags: 3,
  },
};

export const WithError: Story = {
  render: (args) => <TagInputWrapper {...args} />,
  args: {
    label: 'Etiquetas requeridas',
    value: [],
    error: 'Debes añadir al menos una etiqueta',
  },
};

export const Disabled: Story = {
  render: (args) => <TagInputWrapper {...args} />,
  args: {
    label: 'Etiquetas bloqueadas',
    value: ['Frontend', 'UI/UX'],
    disabled: true,
  },
};

export const AllowDuplicates: Story = {
  render: (args) => <TagInputWrapper {...args} />,
  args: {
    label: 'Permitir duplicados',
    value: ['Tag1', 'Tag1'],
    allowDuplicates: true,
  },
};
