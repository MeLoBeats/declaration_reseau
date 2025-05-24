import { RequestStatus, RequestStatusColors, RequestStatusLabels } from '@/enums';

type Props = {
    status: RequestStatus;
    compact?: boolean;
};

const StatusTag = ({ status, compact }: Props) => {
    const statusStyle = status ? RequestStatusColors[status] : { color: '', background: '' };

    return (
        <span
            className={`
        inline-flex items-center gap-1 rounded-full
        ${compact ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
        font-medium
        // Couleurs personnalisées selon le cas
    `} style={{
                color: statusStyle.color,
                backgroundColor: statusStyle.background,
            }}
        >
            {RequestStatusLabels[status]}
        </span>
    );
};

export default StatusTag;
