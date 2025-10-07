import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export function SectionTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-headline text-xl font-semibold">{title}</h2>
      <Button variant="ghost" asChild>
        <Link to={href}>
          See All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}