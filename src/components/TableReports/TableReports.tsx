/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import styles from './TableReports.module.css';
import classNames from 'classnames';
import {
  productsTableMockData,
  variantsTableMockData,
} from './TableReports.mock';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { CFormCheck, CFormSelect } from '@coreui/react';
import Pagination from '../Pagination/Pagination';

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

const TableReports = ({
  tableType,
  statusText,
}: {
  tableType: string;
  statusText: string;
}) => {
  const [currentPage, setCurrentPage] = useState(0);

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
        return <p>{statusText}</p>;
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

  const selectTableView = (tableType: string) => {
    switch (tableType) {
      case 'products':
        return productsTableMockData;
      case 'variants':
        return variantsTableMockData;
      default:
        return productsTableMockData;
    }
  };

  const tableData = selectTableView(tableType)?.filter((data) => {
    return data.status === statusText 
  })

  const tableInstance = useReactTable({
    columns: columns,
    data: tableData?.length > 0 ? tableData : selectTableView(tableType),
    getCoreRowModel: getCoreRowModel(),
  });

  const PER_PAGE = 10;

  const pageCount = Math.ceil(selectTableView(tableType).length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  return (
    <>
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
          {tableInstance
            .getRowModel()
            .rows.slice(offset, offset + PER_PAGE)
            .map((rowEl) => {
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
      <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default TableReports;
