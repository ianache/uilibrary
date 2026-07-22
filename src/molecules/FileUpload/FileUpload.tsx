import React, { forwardRef, useState, useRef, useId } from 'react';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { Spinner } from '../../atoms/Spinner';
import { Divider } from '../../atoms/Divider';
import styles from './FileUpload.module.css';

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  onFilesChange: (files: File[]) => void;
  label?: string;
  sublabel?: string;
}

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  const formatted = val % 1 === 0 ? val.toString() : val.toFixed(1);
  return `${formatted} ${sizes[i]}`;
};

const matchesAccept = (file: File, accept?: string): boolean => {
  if (!accept || accept.trim() === '' || accept.trim() === '*') return true;
  const rules = accept.split(',').map((r) => r.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return rules.some((rule) => {
    if (rule.startsWith('.')) {
      return fileName.endsWith(rule);
    }
    if (rule.endsWith('/*')) {
      const category = rule.slice(0, -1);
      return fileType.startsWith(category);
    }
    return fileType === rule;
  });
};

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(({
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  loading = false,
  error,
  onFilesChange,
  label = 'Arrastra archivos aquí',
  sublabel = 'o haz clic para seleccionar',
  className,
  id: customId,
  ...restProps
}, ref) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;

  const processFiles = (newFiles: File[]) => {
    setDragError(null);

    // Single file mode vs multiple check
    if (!multiple && newFiles.length > 1) {
      setDragError('Solo se permite adjuntar 1 archivo');
      return;
    }

    const targetTotalCount = multiple ? internalFiles.length + newFiles.length : newFiles.length;
    if (maxFiles !== undefined && targetTotalCount > maxFiles) {
      setDragError(`No puedes subir más de ${maxFiles} ${maxFiles === 1 ? 'archivo' : 'archivos'}`);
      return;
    }

    // Validate type and size for each file
    for (const file of newFiles) {
      if (!matchesAccept(file, accept)) {
        setDragError(`El archivo "${file.name}" no tiene un formato válido (${accept})`);
        return;
      }
      if (maxSize !== undefined && file.size > maxSize) {
        setDragError(`El archivo "${file.name}" supera el tamaño máximo permitido (${formatBytes(maxSize)})`);
        return;
      }
    }

    const updatedFiles = multiple ? [...internalFiles, ...newFiles] : newFiles;
    setInternalFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !loading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || loading) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleClickZone = () => {
    if (disabled || loading) return;
    fileInputRef.current?.click();
  };

  const handleZoneKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    e.target.value = '';
  };

  const handleDeleteFile = (indexToRemove: number) => {
    if (disabled || loading) return;
    const nextFiles = internalFiles.filter((_, idx) => idx !== indexToRemove);
    setInternalFiles(nextFiles);
    setDragError(null);
    onFilesChange(nextFiles);
  };

  const currentError = error || dragError;

  return (
    <div ref={ref} className={clsx(styles.container, className)} {...restProps}>
      <div
        className={clsx(
          styles.dropzone,
          isDragging && styles.isDragging,
          disabled && styles.disabled,
          loading && styles.loading,
          currentError && styles.hasError
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickZone}
        tabIndex={disabled || loading ? -1 : 0}
        onKeyDown={handleZoneKeyDown}
        role="button"
        aria-disabled={disabled || loading}
        aria-invalid={currentError ? true : undefined}
        aria-describedby={currentError ? errorId : undefined}
      >
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || loading}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

        {loading ? (
          <div className={styles.loadingContainer}>
            <Spinner size="lg" variant="primary" label="Cargando archivos..." />
          </div>
        ) : (
          <>
            <Icon name="upload" size="xl" className={styles.uploadIcon} />
            <Typography variant="body" color="primary" className={styles.label}>
              {label}
            </Typography>
            {sublabel && (
              <Typography variant="body-sm" color="muted" className={styles.sublabel}>
                {sublabel}
              </Typography>
            )}
          </>
        )}
      </div>

      {currentError && (
        <p id={errorId} role="alert" className={styles.errorText}>
          {currentError}
        </p>
      )}

      {internalFiles.length > 0 && (
        <>
          <Divider className={styles.divider} />
          <ul className={styles.fileList}>
            {internalFiles.map((file, index) => {
              const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name);
              const iconName = isImage ? 'image' : 'file';

              return (
                <li key={`${file.name}-${index}`} className={styles.fileItem}>
                  <Icon name={iconName} size="md" className={styles.fileIcon} />
                  <div className={styles.fileDetails}>
                    <Typography variant="body-sm" className={styles.fileName} truncate>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="muted" className={styles.fileSize}>
                      {formatBytes(file.size)}
                    </Typography>
                  </div>
                  {!disabled && !loading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(index);
                      }}
                      aria-label={`Eliminar ${file.name}`}
                    >
                      <Icon name="close" size="sm" />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
