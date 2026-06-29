import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="space-y-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-9 w-full" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-28 w-full" />
      </CardContent>
    </Card>
  );
}
