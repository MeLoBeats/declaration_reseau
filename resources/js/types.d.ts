import { RequestStatusEnum } from "./enums"

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

export type UserRequest = {
    fqdn: string,
    demandeur: string,
    type: TypeRequest
    description?: string,
    exposition: "Publique" | "Privée",
    vlan?: number,
    status: RequestStatusEnum
    date: Date
}

export type TypeRequest = "Hébergement Web" | "Port" | "Machine virtuelle" 