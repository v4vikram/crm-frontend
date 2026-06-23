import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaginatedMeta } from "@/types/api";

interface UsersPaginationProps {
  meta: PaginatedMeta;
  onPageChange: (page: number) => void;
}

export function UsersPagination({ meta, onPageChange }: UsersPaginationProps) {
  const { page, totalPages, total } = meta;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {total} {total === 1 ? "user" : "users"} total
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
