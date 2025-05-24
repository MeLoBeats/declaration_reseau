import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

import { PaginationData } from "@/types";
import { FC, useMemo } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: PaginationData;
}

const PaginationComponent: FC<{ pagination: PaginationData }> = ({ pagination }) => (
    <Pagination className="py-5 text-primary">
        <PaginationContent>
            {pagination.links.prev && (
                <PaginationItem>
                    <PaginationPrevious href={pagination.links.prev} />
                </PaginationItem>
            )}

            {pagination.meta.links.slice(1, -1).map((link) => (
                <PaginationItem key={link.url}>
                    <PaginationLink
                        href={link.url}
                        isActive={link.active}
                    >
                        {link.label}
                    </PaginationLink>
                </PaginationItem>
            ))}

            {pagination.links.next && (
                <PaginationItem>
                    <PaginationNext href={pagination.links.next} />
                </PaginationItem>
            )}
        </PaginationContent>
    </Pagination>
);

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const hasData = table.getRowModel().rows.length > 0;

    return (
        <div className="relative w-full px-8 mt-5 mb-5 overflow-y-auto max-h-[800px] border rounded-md bg-primary-foreground">
            <Table className="w-full">
                <TableHeader className="sticky top-0 bg-primary-foreground">
                    {table.getHeaderGroups().map((group) => (
                        <TableRow key={group.id}>
                            {group.headers.map((header) => (
                                <TableHead key={header.id} className="font-bold text-lg text-primary">
                                    {!header.isPlaceholder &&
                                        flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {hasData ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:cursor-pointer text-base text-primary"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-primary">
                                Aucune demande pour le moment.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {pagination && pagination.meta?.links.length > 2 && (
                <div className="sticky bottom-0 bg-primary-foreground w-full">
                    <PaginationComponent pagination={pagination} />
                </div>
            )}
        </div>
    );
}
