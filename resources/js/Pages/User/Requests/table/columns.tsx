import { ColumnDef } from "@tanstack/react-table";
import { UserRequest } from "@/types";
import { DataTableColumnHeader } from "@/Components/ui/column-header";
import StatusTag from "@/Components/ui/status-tag";
import ExposedTag from "@/Components/partials/ExposedTag";
import StatusSelect from "@/Components/partials/StatusSelect";
import ExposedSelect from "@/Components/partials/ExposedSelect";
import { RequestStatus } from "@/enums";
import TableHeaderFilterSelect from "@/Components/partials/TableHeaderFilterSelect";

export const columns: ColumnDef<UserRequest>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Date"
                q="created_at"
            />
        ),
        cell: ({ cell }) => {
            const date = new Date(cell.getValue() as string);
            return (
                <p className="text-sm font-[550]">
                    {date.toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                </p>
            );
        },
    },
    {
        accessorKey: "requester",
        header: "Demandeur",
    },
    {
        accessorKey: "ip_address",
        header: "IP",
    },
    {
        accessorKey: "fqdn",
        header: "FQDN",
    },
    {
        accessorKey: "ports",
        header: "Ports",
        cell: ({ row }) => {
            const ports = row.original.ports as { port: number | string; protocol: string }[];
            return (
                <div className="flex flex-wrap gap-1 text-sm">
                    {ports.map(({ port, protocol }: { port: number | string; protocol: string }, idx: number) => (
                        <span
                            key={idx}
                            className="bg-blue-300/20 px-2 py-1 rounded-full border text-xs font-medium"
                        >
                            {port}/{protocol.toUpperCase()}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "exposed",
        header: ({ table }) => (
            <TableHeaderFilterSelect label="Exposition">
                <ExposedSelect
                    exposed={String(table.getState().columnFilters.find(f => f.id === "exposed")?.value ?? "")}
                    setExposed={val => {
                        table.getColumn("exposed")?.setFilterValue(val === "" ? "" : val);
                    }}
                    compact
                />
            </TableHeaderFilterSelect>
        ),
        cell: ({ cell }) => <ExposedTag exposed={Boolean(cell.getValue())} compact />,
    },
    {
        accessorKey: "status",
        header: ({ table }) => (
            <TableHeaderFilterSelect label="Statut">
                <StatusSelect
                    status={String(table.getState().columnFilters.find(f => f.id === "status")?.value ?? "")}
                    setStatus={val => {
                        table.getColumn("status")?.setFilterValue(val === " " ? "" : val);
                    }}
                    compact
                />
            </TableHeaderFilterSelect>
        ),
        cell: ({ cell }) => <StatusTag status={cell.getValue() as RequestStatus} compact />,
    },
];
