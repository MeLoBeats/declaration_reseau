import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    CollectionDataWithPagination,
    UsePageProps,
    UserRequest,
} from "@/types";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { Input } from "@/Components/ui/input";
import { useEffect, useState } from "react";
import useDebouncedValue from "@/Hooks/useDebouncedValue";
import { Search } from "lucide-react";
import { Button } from "@/Components/ui/button";
import StatusSelect from "@/Components/partials/StatusSelect";
import ExposedSelect from "@/Components/partials/ExposedSelect";
import { route } from "ziggy-js"
import { RequestExpositionEnum, RequestStatus } from "@/enums";

const Index = () => {
    // Récupère les props de la page avec le typage approprié
    // UsePageProps est un type générique qui contient les données de pagination des demandes utilisateur
    const { props, url } = usePage<
        UsePageProps<{
            requests: CollectionDataWithPagination<UserRequest>;
        }>
    >();

    let params = new URLSearchParams(window.location.search)

    // État local pour stocker la valeur de recherche
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<RequestStatus | string>(params.get("status") || "");
    const [exposed, setExposed] = useState<RequestExpositionEnum | string>(params.get("exposed") || "");

    // Utilise le hook personnalisé pour débouncer la recherche
    // debouncedSearch: valeur après le délai de 500ms
    // isDebouncing: indique si le debounce est en cours
    const [debouncedSearch] = useDebouncedValue(search, 500);

    // Fonction pour effectuer la requête de recherche
    const handleQuery = (value: string) => {
        // Effectue une requête GET avec Inertia
        router.get(
            "",
            {
                q: value, // Ajoute le paramètre de recherche à l'URL,
                status,
                exposed,
                page: 1,
            },
            {
                preserveState: true, // Conserve l'état du composant pendant la requête
                preserveScroll: true, // Conserve le scroll du composant pendant la requête
                only: ["requests"], // Ne recharge que les données de la page
                replace: true, // Remplace l'ancienne URL
            }
        );
    };

    // Effect qui se déclenche quand la valeur debouncée change
    useEffect(() => {
        if (debouncedSearch || debouncedSearch === "" || status || exposed) {
            handleQuery(debouncedSearch as string);
        }
    }, [debouncedSearch, status, exposed]);

    return (
        <DefaultLayout>
            <div className="flex items-end justify-between w-full mb-2">
                {/* Titre avec le nom de l'utilisateur */}
                <h1 className={"text-2xl mt-5 font-bold text-primary"}>
                    Mes demandes
                </h1>
                {/* <Link href={route('request.new')}>
                    <Button>Nouvelle demande</Button>
                </Link> */}
            </div>

            {/* Container pour la barre de recherche */}
            <div className={"w-full flex items-center border justify-between"}>
                {/* Input de recherche qui occupe 1/3 de la largeur */}
                <div className="w-1/3">
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher une demande"
                        className={"bg-white"}
                        icon={Search}
                        iconPosition="left"
                    />
                </div>
                <div className="flex items-center justify-center gap-10">
                    <div className="flex flex-col items-center">
                        {/* <p className="w-full mb-1 font-bold text-left">
                            Exposition
                        </p> */}
                        <ExposedSelect exposed={exposed} setExposed={setExposed} />
                    </div>
                    <div className="flex flex-col items-center">
                        {/* <p className="w-full mb-1 font-bold text-left">
                            Statut
                        </p> */}
                        <StatusSelect setStatus={setStatus} status={status} />
                    </div>
                </div>
            </div>

            {/* Table de données avec pagination */}
            <DataTable
                columns={columns} // Configuration des colonnes
                data={props.requests.data} // Données à afficher
                pagination={props.requests} // Information de pagination
            />
        </DefaultLayout>
    );
};

export default Index;
