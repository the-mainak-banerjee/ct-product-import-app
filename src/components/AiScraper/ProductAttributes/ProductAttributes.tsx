/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styles from '../JobRuns/JobRuns.module.css';
import productAttributeStyles from './ProductAttributes.module.css';
import classNames from 'classnames';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import Pagination from '../../Pagination/Pagination';
import { productAttributesMock } from './ProductAttributes.mock';
import { BinLinearIcon, EditIcon } from '@commercetools-uikit/icons';
import { Switch, useHistory, useRouteMatch } from 'react-router';
import ProductAttributesDetails from './product-attributes-details';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import PrimaryButton from '@commercetools-uikit/primary-button';

export interface IProductAttributes {
  id: number;
  name: string;
  description: string;
}

interface IProps {
  row: {
    original: {
      id: number;
      name: string;
      description: string;
    };
  };
}

const ProductAttributes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const match = useRouteMatch();
  const { push } = useHistory();
  const [selectedRow, setSelectedRow] = useState<IProductAttributes | null>(
    null
  );
  const [productAttributes, setProductAttributes] = useState(
    productAttributesMock
  );

  const ActionItems = ({ attributeId }: { attributeId: number }) => {
    const handleEditItem = () => {
      const item = productAttributes.find((item) => item.id === attributeId);
      if (item) {
        setSelectedRow(item);
      }
      push(`${match.url}/edit`);
    };

    const handleDeleteItem = () => {
      setProductAttributes((prevState) =>
        prevState.filter((item) => item.id !== attributeId)
      );
    };

    return (
      <div className={productAttributeStyles.actions}>
        <button onClick={handleEditItem}>
          <EditIcon />
        </button>
        <button onClick={handleDeleteItem}>
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
      header: 'Description',
      cell: ({ row }: IProps) => {
        return <p>{row.original?.description}</p>;
      },
    },

    {
      header: 'Actions',
      cell: ({ row }: IProps) => generateActionItemsColumn(row.original.id),
    },
  ];

  const tableInstance = useReactTable({
    columns: columns,
    data: productAttributes,
    getCoreRowModel: getCoreRowModel(),
  });

  const PER_PAGE = 5;

  const pageCount = Math.ceil(productAttributes.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  return (
    <>
      <div>
        <div className={productAttributeStyles.header}>
          <h2>Product Attributes</h2>
          <PrimaryButton
            label="Create Product Attribute"
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
        {productAttributes.length > 0 && (
          <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
        )}
      </div>
      <Switch>
        <SuspendedRoute path={`${match.url}/create`}>
          <ProductAttributesDetails onClose={() => push(`${match.url}`)} />
        </SuspendedRoute>
        <SuspendedRoute path={`${match.url}/edit`}>
          <ProductAttributesDetails
            onClose={() => push(`${match.url}`)}
            isEdit={true}
            data={{
              key: `${selectedRow?.id ?? 0}`,
              value: {
                name: selectedRow?.name ?? '',
                description: selectedRow?.description ?? '',
                id: selectedRow?.id ?? 0,
              },
            }}
          />
        </SuspendedRoute>
      </Switch>
    </>
  );
};

export default ProductAttributes;
