import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const sesion = await getServerSession();

  if( !sesion ) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">

      {/* TODO: src/components <WidgetItem /> */}
      <WidgetItem title="Usuario desde S-Side">
        <div className="flex flex-col">
          <span>{ sesion.user?.name}</span>
          <span>{ sesion.user?.image}</span>
          <span>{ sesion.user?.email}</span>
        </div>
      </WidgetItem>
      {/* TODO: Fin <WidgetItem /> */}

    </div>
  );
}