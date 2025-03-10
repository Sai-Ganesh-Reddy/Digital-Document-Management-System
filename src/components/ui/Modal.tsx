import React, { useEffect, useRef } from 'react'
import {X} from 'lucide-react'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm'|'md'|'lg'|'xl';
}

const Modal:React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size ='md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handleEscape = (e: KeyboardEvent) =>{
      if (e.key === 'Escape') {
        onClose();
    }
  }

  const handleClickOutside = (e: MouseEvent) =>{
    if (modalRef.current && !modalRef.current.contains(e.target as Node)){
      onClose();
    }
  }

  if (isOpen) {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown',handleClickOutside);
    document.body.style.overflow = 'hidden';
  }

  return () => {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'unset';
  };
  }, [isOpen,onClose]);

  if (!isOpen) return null;

  return (
    <div className='modal-backdrop'>
      <div 
        ref={modalRef}
        className={`modal modal-${size} animate-fade-in-up`}
      >
        <div className='modal-close'>
          <h3 className='modal-title'>{title}</h3>
          <button
            onClick={onClose}
            className='modal-close'
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className='modal-body'> {children }</div>
      </div>
    </div>
  )
  };

export default Modal;
