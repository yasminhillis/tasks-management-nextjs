'use client';

import { useEffect, useState } from 'react';
import type { Epic } from '@/lib/types';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalHeaderLoading from './ModalHeaderLoading';
import ModalBodyLoading from './ModalBodyLoading';
import ModalError from './ModalError';
import { updateEpic } from '@/lib/actions/epicActions';

type EpicModalProps = {
  epicId?: string;
  projectId: string;
  onClose: () => void, 
};

export default function EpicModal({ epicId, projectId, onClose }: EpicModalProps) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'fetchError' | 'networkError'
  >('idle');
  const [epic, setEpic] = useState<Epic | null>(null);

  useEffect(() => {
    const fetchEpic = async () => {
      console.log(epicId, 'epicId');
      
      if (!epicId) return;
      setStatus('loading');
      try {
        const res = await fetch(`/api/epics/${epicId}?projectId=${projectId}`);

        if (!res.ok) {
          const error = await res.json();
          console.log(error, 'errpr');
          
          setStatus('fetchError');
          return;
        }
        const { epic } = await res.json();
        setEpic(epic);
        setStatus('success');
      } catch (error) {
        setStatus('networkError')
      }
    };
    fetchEpic();

    // if (epicId) {
    //   updateEpic({
    //     epicId: epicId, 
    //     data: {
    //       title: 'New title test 888'        
    //     }
    //   }).then(console.log)
    // }

  }, [epicId]);

  if (status === 'fetchError') return <ModalError onClose={onClose}/>
  if (status === 'networkError') return <ModalError onClose={onClose} title={`You're offline`} message={`Network error. Please try again later`}/>

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
    <div onClick={e => e.stopPropagation()} className="bg-white  md:max-h-[80vh] max-w-[672px] overflow-y-auto rounded-[8px] shadow-modal">
        <ModalHeader epicId={epic.id} displayId={epic.epic_id} title={epic.title} onClose={onClose} />
        <ModalBody description={epic.description ?? 'No description provided'} createdBy={epic.created_by.name} assignee={epic.assignee?.name ?? 'Unassigned'}  deadline={epic.deadline} createdAt={epic.created_at} />
    </div>
  </div>;
  
}
