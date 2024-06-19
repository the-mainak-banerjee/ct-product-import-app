/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styles from './JobRuns.module.css';
import classNames from 'classnames';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import Pagination from '../../Pagination/Pagination';
import { jobRunsMockData } from './JobRuns.mock';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { Switch, useHistory, useRouteMatch } from 'react-router';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import JobRunsDetails from './job-runs-details';

interface IProps {
  row: {
    original: {
      id: number;
      name: string;
      date: string;
      urls: number;
    };
  };
}

const JobRuns = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const match = useRouteMatch();
  const { push } = useHistory();

  const ActionItems = () => {
    return (
      <div>
        <p>Download</p>
      </div>
    );
  };

  const generateActionItemsColumn = () => {
    return <ActionItems />;
  };

  const columns = [
    {
      header: 'id',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.id}</p>;
      },
    },
    {
      header: 'Name',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.name}</p>;
      },
    },
    {
      header: 'Date',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.date}</p>;
      },
    },
    {
      header: 'Urls',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.urls}</p>;
      },
    },
    {
      header: 'Actions',
      cell: ({ row }: IProps) => generateActionItemsColumn(),
    },
  ];

  const tableInstance = useReactTable({
    columns: columns,
    data: jobRunsMockData,
    getCoreRowModel: getCoreRowModel(),
  });

  const PER_PAGE = 5;

  const pageCount = Math.ceil(jobRunsMockData.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  return (
    <>
      <div>
        <div className={styles.header}>
          <h2>Ai Tool Jobs Runs</h2>
          <PrimaryButton
            label="Create Jobs"
            onClick={() => push(`${match.url}/create`)}
          />
        </div>
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
      </div>
      <Switch>
        <SuspendedRoute path={`${match.url}/create`}>
          <JobRunsDetails onClose={() => push(`${match.url}`)} />
        </SuspendedRoute>
      </Switch>
    </>
  );
};

export default JobRuns;
