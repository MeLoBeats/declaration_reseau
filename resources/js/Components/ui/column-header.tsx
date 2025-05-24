import {
  ArrowDownIcon,
  ArrowUpIcon,
  SortAscIcon,
  EyeOffIcon,
} from "lucide-react"
import { Column } from "@tanstack/react-table"

import { cn } from "@/Lib/utils"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { router } from "@inertiajs/react"
import { useCallback, useEffect, useState } from "react"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  q: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  q,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [direction, setDirection] = useState<"asc" | "desc" | undefined>(undefined);
  if (!column.getCanSort()) {
    return <div className={cn(className, "font-bold text-lg")}>{title}</div>
  }

  useEffect(() => {
    inertiaSort()
  }, [direction])

  const inertiaSort = useCallback(() => {
    router.get("", {
      order: q,
      direction
    }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
    })

  }, [direction])

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 font-bold text-lg h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {direction === "desc" ? (
              <ArrowDownIcon className="w-4 h-4 ml-2" />
            ) : direction === "asc" ? (
              <ArrowUpIcon className="w-4 h-4 ml-2" />
            ) : (
              <SortAscIcon className="w-4 h-4 ml-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setDirection("asc")}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDirection("desc")}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Cacher
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
