
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";

const Tap = ({ PageName }: { PageName: string }) => {
  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Shop */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/shop">Shop</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Dynamic Page Name */}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[gold] capitalize">
    {PageName }
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Tap;
