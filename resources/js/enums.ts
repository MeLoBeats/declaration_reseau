export enum RequestStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    CANCELLED = 'cancelled',
}

export enum RequestExpositionEnum {
    EXPOSED = "Publique",
    NOT_EXPOSED = "Privée"
}

export const RequestStatusLabels: Record<RequestStatus, string> = {
    [RequestStatus.PENDING]: 'En attente',
    [RequestStatus.APPROVED]: 'Approuvée',
    [RequestStatus.REJECTED]: 'Rejetée',
    [RequestStatus.CANCELLED]: 'Annulée',
};

export const RequestStatusColors: Record<RequestStatus, { background: string; color: string }> = {
    [RequestStatus.PENDING]: { background: '#FFF5CC', color: '#8C6C1D' },
    [RequestStatus.APPROVED]: { background: '#E6F4EA', color: '#1B5E20' },
    [RequestStatus.REJECTED]: { background: '#FDECEA', color: '#8B0000' },
    [RequestStatus.CANCELLED]: { background: '#FFE6CC', color: '#C05000' },
};
