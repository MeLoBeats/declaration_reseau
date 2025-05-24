import { RequestStatus } from "@/enums";
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
    setStatus: (value: RequestStatus | string) => void;
    status: RequestStatus | string;
    compact?: boolean;
};

const StatusSelect = ({ setStatus, status, compact }: Props) => {
    const isDefault = status === " ";

    return (
        <Select
            onValueChange={(value: RequestStatus | string) => setStatus(value)}
            defaultValue={status}
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
                <SelectValue placeholder="Tous">
                    {isDefault ? "Tous" : <StatusTag status={status as RequestStatus} compact={compact} />}
                </SelectValue>
            </SelectTrigger>
            <SelectContent className={compact ? "text-xs" : ""}>
                <SelectGroup className="flex flex-col items-center justify-center gap-1">
                    <SelectItem value=" ">Tous</SelectItem>
                    {Object.entries(RequestStatus).map(([k, v], id) => (
                        <SelectItem key={id} value={v}>
                            <StatusTag status={v} compact={compact} />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default StatusSelect;
