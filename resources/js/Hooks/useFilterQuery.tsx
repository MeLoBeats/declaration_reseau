import { useEffect, useRef } from "react";
import { router } from "@inertiajs/react";

/**
 * Lance une requête Inertia sur les changements de filtres.
 * - Ignore les filtres vides pour une URL propre.
 * - Se relance si un filtre change (dépendances dynamiques).
 * - Ne requête pas si aucun filtre n’est défini au premier mount.
 */
export default function useFilterQuery<T extends Record<string, any>>(params: T) {
    // Pour éviter l'appel initial inutile (optionnel)
    const isFirstRun = useRef(true);

    useEffect(() => {
        // Ignore l’appel initial si tout est vide
        if (
            isFirstRun.current &&
            Object.values(params).every(v => v === undefined || v === "" || v === null)
        ) {
            isFirstRun.current = false;
            return;
        }

        isFirstRun.current = false;

        // Nettoie les filtres vides (évite les ?status=&q= dans l’URL)
        const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") acc[key] = value;
            return acc;
        }, {} as Record<string, any>);

        router.get(
            "",
            { ...cleanParams, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["requests"],
                replace: true,
            }
        );
        // Dépendances : n'importe quel filtre passé
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, Object.values(params));
}
