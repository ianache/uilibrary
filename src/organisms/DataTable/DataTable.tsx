import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { Checkbox } from '../../atoms/Checkbox';
import { Spinner } from '../../atoms/Spinner';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Notification } from '../../molecules/Notification';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  sortable?: boolean;
  defaultSort?: { key: keyof T | string; direction: 'asc' | 'desc' };
  pagination?: { page: number; pageSize: number; total: number };
  onPageChange?: (page: number) => void;
  onSort?: (key: keyof T | string, direction: 'asc' | 'desc') => void;
  caption?: string;
  rowIdKey?: keyof T | string;
}

const getRowId = <T,>(row: T, index: number, rowIdKey?: keyof T | string): string => {
  if (rowIdKey && row && typeof row === 'object' && rowIdKey in row) {
    return String((row as any)[rowIdKey]);
  }
  if (row && typeof row === 'object' && 'id' in row) {
    return String((row as any).id);
  }
  return String(index);
};

export function DataTable<T>({
  data = [],
  columns = [],
  loading = false,
  error,
  emptyMessage = 'No hay datos que mostrar',
  selectable = false,
  selectedIds,
  onSelectionChange,
  sortable = true,
  defaultSort,
  pagination,
  onPageChange,
  onSort,
  caption,
  rowIdKey,
  className,
  style,
  ...restProps
}: DataTableProps<T>) {
  // Selection state
  const isSelectionControlled = selectedIds !== undefined;
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const currentSelectedIds = isSelectionControlled ? selectedIds : internalSelectedIds;

  // Sort state
  const [sortState, setSortState] = useState<{ key: keyof T | string; direction: 'asc' | 'desc' } | null>(
    defaultSort || null
  );

  const currentPageRowIds = useMemo(
    () => data.map((row, idx) => getRowId(row, idx, rowIdKey)),
    [data, rowIdKey]
  );

  const allCurrentSelected =
    currentPageRowIds.length > 0 && currentPageRowIds.every((id) => currentSelectedIds.includes(id));
  const someCurrentSelected =
    currentPageRowIds.some((id) => currentSelectedIds.includes(id));
  const isIndeterminate = someCurrentSelected && !allCurrentSelected;

  const handleMaestroCheckboxChange = () => {
    let nextSelectedIds: string[];
    if (allCurrentSelected) {
      nextSelectedIds = currentSelectedIds.filter((id) => !currentPageRowIds.includes(id));
    } else {
      const set = new Set([...currentSelectedIds, ...currentPageRowIds]);
      nextSelectedIds = Array.from(set);
    }
    if (!isSelectionControlled) {
      setInternalSelectedIds(nextSelectedIds);
    }
    onSelectionChange?.(nextSelectedIds);
  };

  const handleRowCheckboxChange = (rowId: string) => {
    let nextSelectedIds: string[];
    if (currentSelectedIds.includes(rowId)) {
      nextSelectedIds = currentSelectedIds.filter((id) => id !== rowId);
    } else {
      nextSelectedIds = [...currentSelectedIds, rowId];
    }
    if (!isSelectionControlled) {
      setInternalSelectedIds(nextSelectedIds);
    }
    onSelectionChange?.(nextSelectedIds);
  };

  const handleHeaderClick = (column: Column<T>) => {
    const isColSortable = sortable && column.sortable !== false;
    if (!isColSortable) return;

    let nextDirection: 'asc' | 'desc' = 'asc';
    if (sortState && sortState.key === column.key) {
      nextDirection = sortState.direction === 'asc' ? 'desc' : 'asc';
    }

    const nextSort = { key: column.key, direction: nextDirection };
    setSortState(nextSort);
    onSort?.(column.key, nextDirection);
  };

  // Local sorting if onSort is not driving server-side data
  const processedData = useMemo(() => {
    if (!sortState) return data;
    const { key, direction } = sortState;
    return [...data].sort((a, b) => {
      const valA = (a as any)[key];
      const valB = (b as any)[key];
      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      let comp = 0;
      if (typeof valA === 'string' && typeof valB === 'string') {
        comp = valA.localeCompare(valB);
      } else {
        comp = valA < valB ? -1 : 1;
      }
      return direction === 'asc' ? comp : -comp;
    });
  }, [data, sortState]);

  // Pagination calculation
  const paginationInfo = useMemo(() => {
    if (!pagination) return null;
    const { page, pageSize, total } = pagination;
    const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);
    const hasPrev = page > 1;
    const hasNext = page * pageSize < total;
    return { page, pageSize, total, startItem, endItem, hasPrev, hasNext };
  }, [pagination]);

  const totalColumnsCount = columns.length + (selectable ? 1 : 0);

  return (
    <div
      className={clsx(styles.container, className)}
      style={{ margin: 0, ...style }}
      {...restProps}
    >
      {error ? (
        <Notification variant="error" message={error} />
      ) : (
        <>
          <div className={styles.tableWrapper}>
            {loading && (
              <div className={styles.spinnerOverlay} role="status">
                <Spinner size="lg" label="Cargando tabla..." />
              </div>
            )}

            <table className={styles.table}>
              {caption && <caption className={styles.caption}>{caption}</caption>}
              <thead>
                <tr>
                  {selectable && (
                    <th className={clsx(styles.th, styles.thCheckbox)} style={{ width: '48px' }}>
                      <Checkbox
                        checked={allCurrentSelected}
                        indeterminate={isIndeterminate}
                        onChange={handleMaestroCheckboxChange}
                        aria-label="Seleccionar todas las filas"
                      />
                    </th>
                  )}
                  {columns.map((col) => {
                    const isColSortable = sortable && col.sortable !== false;
                    const isSorted = sortState?.key === col.key;
                    const direction = isSorted ? sortState.direction : undefined;

                    return (
                      <th
                        key={String(col.key)}
                        className={clsx(styles.th, isColSortable && styles.thSortable)}
                        style={{
                          width: col.width,
                          textAlign: col.align || 'left',
                        }}
                        onClick={() => handleHeaderClick(col)}
                        aria-sort={
                          isSorted
                            ? direction === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : undefined
                        }
                      >
                        <div
                          className={styles.headerContent}
                          style={{
                            justifyContent:
                              col.align === 'center'
                                ? 'center'
                                : col.align === 'right'
                                ? 'flex-end'
                                : 'flex-start',
                          }}
                        >
                          <span>{col.header}</span>
                          {isColSortable && (
                            <span
                              className={clsx(
                                styles.sortIcon,
                                isSorted && styles.sortIconActive
                              )}
                            >
                              <Icon
                                name={
                                  isSorted
                                    ? direction === 'asc'
                                      ? 'chevron-up'
                                      : 'chevron-down'
                                    : 'chevron-down'
                                }
                                size="xs"
                              />
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {!loading && processedData.length === 0 ? (
                  <tr>
                    <td colSpan={totalColumnsCount}>
                      <div className={styles.emptyContainer}>
                        <Icon name="info" size="lg" className={styles.emptyIcon} />
                        <span>{emptyMessage}</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  processedData.map((row, idx) => {
                    const rowId = getRowId(row, idx, rowIdKey);
                    const isSelected = currentSelectedIds.includes(rowId);

                    return (
                      <tr
                        key={rowId}
                        className={clsx(styles.tr, isSelected && styles.trSelected)}
                      >
                        {selectable && (
                          <td className={clsx(styles.td, styles.tdCheckbox)}>
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleRowCheckboxChange(rowId)}
                              aria-label={`Seleccionar fila ${rowId}`}
                            />
                          </td>
                        )}
                        {columns.map((col) => {
                          const cellValue = (row as any)[col.key];
                          const content = col.render ? col.render(row) : cellValue;

                          return (
                            <td
                              key={String(col.key)}
                              className={styles.td}
                              style={{ textAlign: col.align || 'left' }}
                            >
                              {content}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {paginationInfo && (
            <div className={styles.paginationRow}>
              <div className={styles.paginationMetrics}>
                Mostrando {paginationInfo.startItem}-{paginationInfo.endItem} de{' '}
                {paginationInfo.total}
              </div>
              <div className={styles.paginationButtons}>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!paginationInfo.hasPrev || loading}
                  onClick={() => onPageChange?.(paginationInfo.page - 1)}
                  aria-label="Página anterior"
                >
                  <Icon name="chevron-left" size="sm" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!paginationInfo.hasNext || loading}
                  onClick={() => onPageChange?.(paginationInfo.page + 1)}
                  aria-label="Página siguiente"
                >
                  <Icon name="chevron-right" size="sm" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
