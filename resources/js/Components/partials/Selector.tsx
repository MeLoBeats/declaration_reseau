import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export type SelectorData<T> = { accessor: string, label: T }

type Props<T> = {
    data: SelectorData<T>[]
    value: string | number | undefined
    onChange: (value: any) => void;
    placeholder?: string;
}

const Selector = ({ data, onChange, value, placeholder }: Props<any>) => {
    return (
        <Select
            onValueChange={(v) => onChange(v)}
            defaultValue={value !== undefined ? String(value) : undefined}
        >
            <SelectTrigger className="w-full">
                <SelectValue className="font-[300]" placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((item, id) => {
                        return <SelectItem key={id} value={item.accessor}>{item.label}</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Selector
