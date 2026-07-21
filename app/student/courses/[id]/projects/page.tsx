import { redirect } from "next/navigation";

export default async function ProjectsRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/student/settings?course=${id}`);
}
