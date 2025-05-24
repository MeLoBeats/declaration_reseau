import { ColumnDef } from "@tanstack/react-table";
import { UserRequest } from "@/types";
import { DataTableColumnHeader } from "@/Components/ui/column-header";
import StatusTag from "@/Components/ui/status-tag";

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
        accessorKey: "exposed",
        header: "Exposition",
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ cell, row }) => <StatusTag status={row.original.status} />,
    },
];
