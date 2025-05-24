import DefaultLayout from "@/Layouts/DefaultLayout";
import { usePage } from "@inertiajs/react";
import { CollectionDataWithPagination, UsePageProps, UserRequest } from "@/types";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { useState } from "react";
import useDebouncedValue from "@/Hooks/useDebouncedValue";
import { RequestExpositionEnum, RequestStatus } from "@/enums";
import { FiltersBar } from "@/Components/partials/FiltersBar";
import useFilterQuery from "@/Hooks/useFilterQuery";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";

const Index = () => {
    const { props } = usePage<UsePageProps<{ requests: CollectionDataWithPagination<UserRequest> }>>();
    const urlParams = new URLSearchParams(window.location.search);

    const [search, setSearch] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<RequestStatus | string>(urlParams.get("status") || "");
    const [exposed, setExposed] = useState<RequestExpositionEnum | string>(urlParams.get("exposed") || "");

    const [debouncedSearch] = useDebouncedValue(search, 500);

    useFilterQuery({
        q: debouncedSearch || "",
        status,
        exposed,
    });

    return (
        <DefaultLayout>
            <div className="flex items-center justify-between w-full pb-3 mt-5">
                <h1 className="text-2xl font-bold text-primary leading-tight">Mes demandes</h1>

            </div>


            <div className="pt-2 mb-3 flex items-center justify-between">
                <FiltersBar
                    search={search}
                    setSearch={setSearch}
                />
                <Button size="lg" className="text-primary-foreground flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Nouvelle demande
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={props.requests.data}
                pagination={props.requests}
            />
        </DefaultLayout>
    );
};

export default Index;
