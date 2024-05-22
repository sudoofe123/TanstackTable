import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

function TanstackTable({ data }) {
  const [sorting, setSorting] = React.useState([]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => row.ratings_average || '-', {
      id: 'ratings_average',
      header: 'Ratings Average',
    }),
    columnHelper.accessor('author_name', {
      header: 'Author Name',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('first_publish_year', {
      header: 'First Publish Year',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('subject', {
      header: 'Subject',
      cell: (info) => {
        const value = info.getValue();
        return Array.isArray(value) ? value.join(', ') : value || '-';
      },
    }),
    columnHelper.accessor('author_birth_date', {
      header: 'Author Birth Date',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('author_top_work', {
      header: 'Author Top Work',
      cell: (info) => info.getValue() || '-',
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    className={
                      header.column.getCanSort() ? 'cursor-pointer' : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TanstackTable;
