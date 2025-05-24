import { RequestStatus } from "./enums"

export type UsePageProps<T> = {
    auth: {
        user?: {
            name?: string,
            role?: string
        }
    }
} & T

export type CollectionData<TData> = TData[]

export type PaginationData = {
    links: {
        first: string | null,
        last: string | null,
        next: string | null,
        prev: string | null
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            url: string,
            label: string,
            active: boolean
        }[],
        path: string,
        per_page: number,
        to: number,
        total: number
    }
}

export type CollectionDataWithPagination<TData> = {
    data: CollectionData<TData>,
} & PaginationData

interface UserRequest {
    created_at: string;
    requester: string;
    ip_address: string;
    fqdn: string;
    exposed: boolean;
    status: RequestStatus;
    ports: { port: number; protocol: string }[];
  }

export type TypeRequest = "Hébergement Web" | "Port" | "Machine virtuelle" 