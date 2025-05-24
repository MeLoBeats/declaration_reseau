import { RequestStatus, RequestStatusColors, RequestStatusLabels } from '@/enums';

type Props = {
    status: RequestStatus
}

const StatusTag = ({ status }: Props) => {
    const statusStyle = RequestStatusColors[status];
    return (
        <p
            style={{
                color: statusStyle.color,
                backgroundColor: statusStyle.background,
                padding: "4px 8px",
                borderRadius: "8px",
                display: "inline-block",
            }}
            className="text-sm font-[550]"
        >
            {RequestStatusLabels[status]}
        </p>
    );
}

export default StatusTag
