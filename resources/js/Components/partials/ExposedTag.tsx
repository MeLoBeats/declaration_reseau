import { RequestExpositionEnum } from "@/enums";
import { ShieldCheck, ShieldOff } from "lucide-react";


const ExposedTag = ({ exposed, compact }: { exposed: boolean; compact?: boolean }) => (
    <span
        className={`
        inline-flex items-center gap-1 rounded-full
        ${compact ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
        font-medium
        // Couleurs personnalisées selon le cas
        ${exposed ? "bg-red-100 text-red-700 border border-red-200" : "bg-green-100 text-green-700 border border-green-200"}    
    `}
        style={{
            color: exposed ? "#dc2626" : "#16a34a", // red-700 or green-700
            backgroundColor: exposed ? "#fee2e2" : "#dcfce7", // red-100 or green-100
        }}
    >
        {exposed ? <ShieldOff className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
        {exposed ? "Publique" : "Privée"}
    </span >
);

export default ExposedTag;
