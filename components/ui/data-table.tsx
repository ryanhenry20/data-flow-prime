'use client';

import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Settings2,
    Download,
    Eye,
    EyeOff,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    title?: string;
    description?: string;
    searchKey?: string;
    searchPlaceholder?: string;
    showPagination?: boolean;
    showColumnVisibility?: boolean;
    showExport?: boolean;
    onExport?: (data: TData[]) => void;
    onPDFExport?: (data: TData[]) => void | Promise<void>;
    className?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    title,
    description,
    searchKey,
    searchPlaceholder = 'Search...',
    showPagination = true,
    showColumnVisibility = true,
    showExport = true,
    onExport,
    className,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handleExport = () => {
        if (onExport) {
            const filteredData = table
                .getFilteredRowModel()
                .rows.map((row) => row.original);
            onExport(filteredData);
        }
    };

    return (
        <Card className={className}>
            {title && (
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{title}</CardTitle>
                            {description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {Object.keys(rowSelection).length > 0 && (
                                <Badge variant="secondary">
                                    {Object.keys(rowSelection).length} selected
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
            )}
            <CardContent>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        {searchKey && (
                            <Input
                                placeholder={searchPlaceholder}
                                value={
                                    (table
                                        .getColumn(searchKey)
                                        ?.getFilterValue() as string) ?? ''
                                }
                                onChange={(event) =>
                                    table
                                        .getColumn(searchKey)
                                        ?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {showExport && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleExport}
                                className="h-8">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        )}
                        {showColumnVisibility && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-auto h-8">
                                        <Settings2 className="h-4 w-4 mr-2" />
                                        View
                                        <ChevronDown className="h-4 w-4 ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-[200px]">
                                    <DropdownMenuLabel>
                                        Toggle columns
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {table
                                        .getAllColumns()
                                        .filter(
                                            (column) =>
                                                typeof column.accessorFn !==
                                                    'undefined' &&
                                                column.getCanHide()
                                        )
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(
                                                            !!value
                                                        )
                                                    }>
                                                    <div className="flex items-center">
                                                        {column.getIsVisible() ? (
                                                            <Eye className="h-4 w-4 mr-2" />
                                                        ) : (
                                                            <EyeOff className="h-4 w-4 mr-2" />
                                                        )}
                                                        {column.id}
                                                    </div>
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {showPagination && (
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {Object.keys(rowSelection).length > 0 && (
                                <span>
                                    {Object.keys(rowSelection).length} of{' '}
                                    {table.getFilteredRowModel().rows.length}{' '}
                                    row(s) selected.
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium">
                                    Rows per page
                                </p>
                                <select
                                    value={table.getState().pagination.pageSize}
                                    onChange={(e) => {
                                        table.setPageSize(
                                            Number(e.target.value)
                                        );
                                    }}
                                    className="h-8 w-[70px] rounded border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                Page {table.getState().pagination.pageIndex + 1}{' '}
                                of {table.getPageCount()}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}>
                                    <span className="sr-only">
                                        Go to first page
                                    </span>
                                    {'<<'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}>
                                    <span className="sr-only">
                                        Go to previous page
                                    </span>
                                    {'<'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}>
                                    <span className="sr-only">
                                        Go to next page
                                    </span>
                                    {'>'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() =>
                                        table.setPageIndex(
                                            table.getPageCount() - 1
                                        )
                                    }
                                    disabled={!table.getCanNextPage()}>
                                    <span className="sr-only">
                                        Go to last page
                                    </span>
                                    {'>>'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Sortable column header component
export function SortableColumnHeader<TData, TValue>({
    column,
    title,
}: {
    column: any;
    title: string;
}) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2 lg:px-3">
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
}

// Row actions dropdown component
export function RowActionsDropdown({
    row,
    actions,
}: {
    row: any;
    actions: Array<{
        label: string;
        onClick: (row: any) => void;
        icon?: React.ReactNode;
        variant?: 'default' | 'destructive';
    }>;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actions.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => action.onClick(row)}
                        className={
                            action.variant === 'destructive'
                                ? 'text-destructive'
                                : ''
                        }>
                        {action.icon && (
                            <span className="mr-2">{action.icon}</span>
                        )}
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Checkbox column for row selection
export const selectColumn = {
    id: 'select',
    header: ({ table }: any) => (
        <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
        />
    ),
    cell: ({ row }: any) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    ),
    enableSorting: false,
    enableHiding: false,
} as const;
