import { RequestExpositionEnum } from "@/enums";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import StatusTag from "../ui/status-tag";

type Props = {
    setExposed: (value: RequestExpositionEnum) => void;
    exposed: RequestExpositionEnum | string;
};

const ExposedSelect = ({ setExposed, exposed }: Props) => {

    return (
        <Select
            onValueChange={(value: RequestExpositionEnum) => setExposed(value)}
            defaultValue={exposed}
        >
            <SelectTrigger className="w-full">
                <SelectValue className="font-[300]" placeholder="Exposition" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value=" ">Toutes</SelectItem>
                    {Object.entries(RequestExpositionEnum).map(([k, v], id) => (
                        <SelectItem key={id} value={v}>{v}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ExposedSelect;
