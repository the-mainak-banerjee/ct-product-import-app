/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './TableReports.module.css';
import classNames from 'classnames';
import { tableMockData } from './TableReports.mock';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { CFormCheck } from '@coreui/react';

interface IProps {
  row: {
    original: {
      id: string;
      name: string;
      startTime: string;
      endTime: string;
      status: string;
      viewPayload: string;
    };
  };
}

const TableReports = () => {
  const ActionItems = () => {
    return (
      <div className={styles.reTriggerJobRadio}>
        <CFormCheck type="radio" name="reTriggerJob" id="reTriggerJobId" />
      </div>
    );
  };

  const generateActionItemsColumn = () => {
    return <ActionItems />;
  };

  const columns = [
    {
      header: 'Name',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.name}</p>;
      },
    },
    {
      header: 'Start Time',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.startTime}</p>;
      },
    },
    {
      header: 'End Time',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.endTime}</p>;
      },
    },
    {
      header: 'Status',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.status}</p>;
      },
    },
    {
      header: 'View Payload',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.viewPayload}</p>;
      },
    },
    {
      header: 'Re-trigger Job',
      cell: ({ row }: IProps) => generateActionItemsColumn(),
    },
  ];
  const tableInstance = useReactTable({
    columns: columns,
    data: tableMockData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className={classNames(styles.table)}>
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => {
          return (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => {
                return (
                  <th key={columnEl.id} colSpan={columnEl.colSpan}>
                    {columnEl.isPlaceholder
                      ? null
                      : flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((rowEl) => {
          return (
            <tr key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl: any) => {
                return (
                  <td 
                    key={cellEl.id}
                    style={{
                      width:
                        cellEl.column.getSize() !== 150
                          ? cellEl.column.getSize()
                          : null,
                    }}
                  >
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext()
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableReports;
