import PageWrapper from "../../_components/PageWrapper";
import EpicsList from "./EpicsLists";

export default async function Epics({ params }: {params: Promise<{projectId: string}>}) {
  const { projectId } = await params; 
  return (
    <PageWrapper>
      <EpicsList projectId={projectId} />
    </PageWrapper>
)
}
