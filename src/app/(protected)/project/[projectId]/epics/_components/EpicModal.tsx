'use client';

import { useEffect, useState } from 'react';
import type { Epic } from '@/lib/types';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalHeaderLoading from './ModalHeaderLoading';
import ModalBodyLoading from './ModalBodyLoading';
import ModalError from './ModalError';

type EpicModalProps = {
  epicId?: string;
  projectId: string;
  onClose: () => void, 
  onNetworkError: () => void
};

export default function EpicModal({ epicId, projectId, onClose, onNetworkError }: EpicModalProps) {
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
        // console.log(epic, 'epic');
        setEpic(epic);
        setStatus('success');
      } catch (error) {
        // setStatus('error');
        onNetworkError()
        return;
      }
    };
    fetchEpic();
  }, [epicId]);

  if (status === 'error') return <ModalError onClose={onClose}/>

  if (status === 'loading') {
    return <div onClick={onClose} className="fixed inset-0 backdrop-blur-xs bg-black/50 z-100 flex items-center justify-center">
    <div onClick={e => e.stopPropagation()}  className="bg-white w-[672px] max-h-[80vh] overflow-y-auto rounded-[8px] shadow-modal">
      <ModalHeaderLoading />
      <ModalBodyLoading />
    </div>
  </div>;
  }

  if (!epic) return null;

  return <div onClick={onClose} className="fixed inset-0 backdrop-blur-xs bg-black/50 z-100 flex items-center justify-center">
    <div onClick={e => e.stopPropagation()} className="bg-white w-[672px] max-h-[80vh] overflow-y-auto rounded-[8px] shadow-modal">
        <ModalHeader epicId={epic.epic_id} title={epic.title} onClose={onClose} />
        <ModalBody description={epic.description} createdBy={epic.created_by.name} assignee={epic.assignee?.name ?? 'Unassigned'}  deadline={epic.deadline} createdAt={epic.created_at} />
    </div>
  </div>;
  
}
