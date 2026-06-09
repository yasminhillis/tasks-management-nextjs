'use client';

import { useEffect, useState } from 'react';
import type { Epic } from '@/lib/types';

type EpicModalProps = {
  epicId?: string;
  projectId: string;
};

export default function EpicModal({ epicId, projectId }: EpicModalProps) {
//   console.log(epicId, 'epicId');
//   console.log(projectId, 'projectId');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [epic, setEpic] = useState<Epic | null>(null);

  useEffect(() => {
    const fetchEpic = async () => {
      if (!epicId) return;
      setStatus('loading');
      try {
        const res = await fetch(`/api/epics/${epicId}?projectId=${projectId}`);

        if (!res.ok) {
          setStatus('error');
          return;
        }
        const { epic } = await res.json();
        console.log(epic, 'epic');
        setEpic(epic);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };
    fetchEpic();
  }, [epicId]);
  return <div></div>;
}
