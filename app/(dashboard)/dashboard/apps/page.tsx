import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/app-tables/columns";
import { EmployeeTable } from "@/components/tables/app-tables/employee-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AppCard } from "@/components/tables/app-tables/employee-table";

const breadcrumbItems = [{ title: "Apps", link: "/dashboard/apps" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const apps = [
    {
      name: "Google Gmail",
      icon: "/gmail-icon.svg",
      link: "/login?app=gmail"
    },
    // {
    //   name: "Google Gmail",
    //   icon: "/gmail-icon.svg",
    //   link: "/login?app=gmail"
    // },
  ];  // Example static data


  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Apps`}
            description="Manage application login protocols / permissions."
          />

          <Link
            href={"/dashboard/apps/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New App
          </Link>
        </div>
        <Separator />

        <div className="flex flex-wrap justify-start">
          {apps.map(app => (
            <AppCard
              key={app.name}
              appName={app.name}
              appIcon={app.icon}
              appLink={app.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}
