import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { ActivityForm } from "@/components/ActivityForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "編輯活動",
  description: "編輯活動詳情",
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EditActivityPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const queryParams = await searchParams;
  console.log(queryParams);
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/transactions');
  }

  const activity = await prisma.activity.findUnique({
    where: { id: params.id },
  });

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">編輯活動</h1>
        <ActivityForm 
          defaultValues={{
            name: activity.name,
            startDate: activity.startDate,
            endDate: activity.endDate,
            description: activity.description || '',
            enabled: activity.enabled,
          }}
          activityId={activity.id}
        />
      </div>
    </div>
  );
} 