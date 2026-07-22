import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, FileUploadProps } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

const FileUploadWrapper = (args: Partial<FileUploadProps>) => {
  return (
    <FileUpload
      {...args}
      onFilesChange={(newFiles) => {
        args.onFilesChange?.(newFiles);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <FileUploadWrapper {...args} />,
  args: {
    label: 'Arrastra tu archivo aquí',
    sublabel: 'o haz clic para examinar tus archivos',
  },
};

export const MultipleImagesOnly: Story = {
  render: (args) => <FileUploadWrapper {...args} />,
  args: {
    label: 'Sube tus imágenes',
    sublabel: 'Solo formatos PNG, JPG, WEBP (Máx. 5MB cada uno, máximo 3 archivos)',
    accept: 'image/*',
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    maxFiles: 3,
  },
};

export const WithPDFConstraint: Story = {
  render: (args) => <FileUploadWrapper {...args} />,
  args: {
    label: 'Sube tu documento PDF',
    sublabel: 'Máximo 2 MB',
    accept: '.pdf',
    maxSize: 2 * 1024 * 1024,
  },
};

export const LoadingState: Story = {
  render: (args) => <FileUploadWrapper {...args} />,
  args: {
    label: 'Procesando archivos...',
    loading: true,
  },
};

export const DisabledState: Story = {
  render: (args) => <FileUploadWrapper {...args} />,
  args: {
    label: 'Carga deshabilitada',
    sublabel: 'No puedes subir archivos en este momento',
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => <FileUploadWrapper {...args} />,
  args: {
    label: 'Sube tu comprobante',
    error: 'Formato de archivo no soportado. Por favor sube un PDF.',
  },
};
