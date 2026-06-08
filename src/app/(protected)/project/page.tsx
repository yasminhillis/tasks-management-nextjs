import InfiniteScroll from '../_components/InfiniteScroll';
import PageWrapper from './_components/PageWrapper';
import ProjectsList from './ProjectsList';

export default function Project() {
  return (
    <PageWrapper>
      <ProjectsList />
      <InfiniteScroll slice="projects" />
    </PageWrapper>
  );
}
