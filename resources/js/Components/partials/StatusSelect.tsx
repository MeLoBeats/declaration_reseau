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
    setStatus: (value: RequestStatus) => void;
    status: RequestStatus | string;
};

const StatusSelect = ({ setStatus, status }: Props) => {

    return (
        <Select
            onValueChange={(value: RequestStatus) => setStatus(value)}
            defaultValue={status}
        >
            <SelectTrigger className="w-full">
                <SelectValue className="font-[300]" placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="flex flex-col items-center justify-center gap-1">
                    {Object.entries(RequestStatus).map(([k, v], id) => (
                        <SelectItem key={id} value={v}><StatusTag status={v} /></SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default StatusSelect;
