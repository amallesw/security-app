import BreadCrumb from "@/components/breadcrumb";
import { EmployeeClient } from "@/components/tables/employees-tables/client";
import { users } from "@/constants/data";

const breadcrumbItems = [{ title: "Employees", link: "/dashboard/employees" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeeClient data={users} />
      </div>
    </>
  );
}
