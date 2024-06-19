/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styles from '../JobRuns/JobRuns.module.css';
import attributeGroupsStyles from './AttributeGroups.module.css';
import classNames from 'classnames';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import Pagination from '../../Pagination/Pagination';
import { attributeGroupsMock } from './AttributeGroups.mock';
import { BinLinearIcon, EditIcon } from '@commercetools-uikit/icons';
import { Switch, useHistory, useRouteMatch } from 'react-router';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import PrimaryButton from '@commercetools-uikit/primary-button';
import AiAttributesDetails from './attribute-groups-details';

export interface IAttributeGroups {
  id: number;
  name: string;
  fields: string[];
}

interface IProps {
  row: {
    original: {
      id: number;
      name: string;
      fields: string[];
    };
  };
}

const AttributeGroups = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const match = useRouteMatch();
  const { push } = useHistory();
  const [selectedRow, setSelectedRow] = useState<IAttributeGroups | null>(null);

  const ActionItems = ({ attributeId }: { attributeId: number }) => {
    const handleEditItem = () => {
      const item = attributeGroupsMock.find((item) => item.id === attributeId);
      if (item) {
        setSelectedRow(item);
      }
      push(`${match.url}/edit`);
    };
    return (
      <div className={attributeGroupsStyles.actions}>
        <button onClick={handleEditItem}>
          <EditIcon />
        </button>
        <button>
          <BinLinearIcon />
        </button>
      </div>
    );
  };

  const generateActionItemsColumn = (id: number) => {
    return <ActionItems attributeId={id} />;
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
      header: 'Fileds',
      cell: ({ row }: IProps) => {
        return (
          <p className={attributeGroupsStyles.attributeFields}>
            {row.original?.fields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </p>
        );
      },
    },

    {
      header: 'Actions',
      cell: ({ row }: IProps) => generateActionItemsColumn(row.original.id),
    },
  ];

  const tableInstance = useReactTable({
    columns: columns,
    data: attributeGroupsMock,
    getCoreRowModel: getCoreRowModel(),
  });

  const PER_PAGE = 10;

  const pageCount = Math.ceil(attributeGroupsMock.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  return (
    <>
      <div>
        <div className={attributeGroupsStyles.header}>
          <h2>Attribute Groups</h2>
          <PrimaryButton
            label="Create Attribute Group"
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
          <AiAttributesDetails onClose={() => push(`${match.url}`)} />
        </SuspendedRoute>
        <SuspendedRoute path={`${match.url}/edit`}>
          <AiAttributesDetails
            onClose={() => push(`${match.url}`)}
            isEdit={true}
            data={{
              key: `${selectedRow?.id ?? 0}`,
              value: {
                name: selectedRow?.name ?? '',
                fields: selectedRow?.fields ?? [],
                id: selectedRow?.id ?? 0,
              },
            }}
          />
        </SuspendedRoute>
      </Switch>
    </>
  );
};

export default AttributeGroups;
