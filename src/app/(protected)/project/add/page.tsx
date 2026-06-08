import Header from '../_components/Header';
import PageWrapper from '../_components/PageWrapper';
import ProjectForm from '../_components/ProjectForm';

export default function AddProject() {
  return (
    <PageWrapper>
      <Header
        mobileTitle="Initialize New Project"
        mobileDescription="Define the scope and foundational details of your project."
        desktopTitle="Add New Project"
        buttonLabel="Invite Member"
        materialIcon="person_add"
      />
      <ProjectForm mode="add" />
    </PageWrapper>
  );
}
