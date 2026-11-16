import ListTable from './ListTable';

export default function ListView({ projectId, searchTerm }: { projectId: string, searchTerm: string }) {
  return (
    <>
      <ListTable projectId={projectId} searchTerm={searchTerm}/>
    </>
  );
}
