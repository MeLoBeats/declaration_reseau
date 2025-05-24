import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";
import StatusSelect from "@/Components/partials/StatusSelect";
import ExposedSelect from "@/Components/partials/ExposedSelect";

type Props = {
    search: string | undefined;
    setSearch: (v: string) => void;
};


export const FiltersBar = ({
    search, setSearch,
}: Props) => {

    const filters: any[] = [];

    return (
        <div className="w-full flex items-center justify-between">
            <div className="w-1/3">
                <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une demande"
                    className="bg-white"
                    icon={Search}
                    iconPosition="left"
                />
            </div>
            <div className="flex items-center justify-center gap-10">
                {filters.length > 0 && filters.map(({ label, component }) => (
                    <div key={label} className="flex space-x-4 items-center">
                        <p className="mb-1 text-nowrap font-bold">{label} :</p>
                        {component}
                    </div>
                ))}
            </div>
        </div>
    )

};
