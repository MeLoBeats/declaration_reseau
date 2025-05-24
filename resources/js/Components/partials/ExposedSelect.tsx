import { RequestExpositionEnum } from "@/enums";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import ExposedTag from "./ExposedTag";

type Props = {
    setExposed: (value: RequestExpositionEnum | string) => void;
    exposed: RequestExpositionEnum | string;
    compact?: boolean;
};

const labelToBool = (label: string) => label === RequestExpositionEnum.EXPOSED;

const ExposedSelect = ({ setExposed, exposed, compact }: Props) => {
    const current = exposed as RequestExpositionEnum;

    return (
        <Select
            onValueChange={(value: RequestExpositionEnum | string) => setExposed(value)}
            defaultValue={current}
        >
            <SelectTrigger
                className={`
        min-h-0 h-7 px-2 text-xs bg-gray-50 border border-gray-200
        rounded font-medium shadow-none transition
        focus:ring-1 focus:ring-primary/40 focus:border-primary
        hover:border-gray-300
    `}
                style={{ minWidth: 100, maxWidth: 130 }}
            >
                <SelectValue placeholder="Toutes">
                    {current.trim() === "" ? "Toutes" : <ExposedTag exposed={labelToBool(current)} compact />}
                </SelectValue>
            </SelectTrigger>
            <SelectContent className={compact ? "text-xs" : ""}>
                <SelectGroup>
                    <SelectItem value=" ">Toutes</SelectItem>
                    {Object.values(RequestExpositionEnum).map((label, id) => (
                        <SelectItem key={id} value={label}>
                            <ExposedTag exposed={labelToBool(label)} compact />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ExposedSelect;
