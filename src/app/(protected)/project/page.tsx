import { Suspense } from 'react';
import Project from './Project';
import ProjectLoading from './ProjectLoading';

export default function ProjectPage() {
  return (
    <Suspense fallback={<ProjectLoading />}>
      <Project />
    </Suspense>
  );
}
