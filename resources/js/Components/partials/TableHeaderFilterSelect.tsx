import { ReactNode } from "react";

type TableHeaderFilterSelectProps = {
    label: string;
    children: ReactNode; // Ton <Select> customisé avec le prop compact
};

const TableHeaderFilterSelect = ({ label, children }: TableHeaderFilterSelectProps) => (
    <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">{label}</span>
        {children}
    </div>
);

export default TableHeaderFilterSelect;
