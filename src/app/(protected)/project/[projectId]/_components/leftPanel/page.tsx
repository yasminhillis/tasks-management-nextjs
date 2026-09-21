import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

export default function LeftPanel() {
  return (
    <div className="flex flex-col flex-1 bg-red-50">
      <ModalHeader />
      <ModalBody />
      <ModalFooter />
    </div>
  );
}
