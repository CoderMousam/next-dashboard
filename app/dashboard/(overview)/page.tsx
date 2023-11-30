
import dynamic from 'next/dynamic';
// import RevenueChart from "../../ui/dashboard/revenue-chart";
// import LatestInvoices from "../../ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
//import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
//import {  fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import { RevenueChartSkeleton, LatestInvoicesSkeleton , CardSkeleton} from "@/app/ui/skeletons";

export const revalidate = 0;
const RevenueChart = dynamic(() => import("../../ui/dashboard/revenue-chart"), {
    loading: () => <RevenueChartSkeleton/>, 
    ssr:false
  })

const LatestInvoices = dynamic(()=> import("../../ui/dashboard/latest-invoices"),{
    loading: () => <LatestInvoicesSkeleton/>,
    ssr:false
})

const RevenueCard = dynamic (()=> import("@/app/ui/dashboard/cards"),{
    loading:()=> <CardSkeleton/>,
    ssr:false
})

export default async function Page() {
 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton/>}>
        <RevenueCard/>
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart  />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton/>}>
            <LatestInvoices/>
        </Suspense>
      </div>
    </main>
  );
}
