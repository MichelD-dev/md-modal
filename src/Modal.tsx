import React, {
  forwardRef,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import {createPortal} from 'react-dom'
import {useModal} from './useModal'

interface ModalProps {
  children: ReactNode
}

export interface ModalRef {
  open: () => void
  close: () => void
}

const modalRootId = Math.random().toString(36).slice(2, 10)

const Modal = forwardRef<ModalRef, ModalProps>(
  ({children}, ref) => {
    const [isOpen, open, close] = useModal()

    const modalRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      [open, close],
    )

    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') close()
      },
      [close],
    )

    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) close()
      },
      [close],
    )

    useEffect(() => {
      const modalRoot = document.createElement('div')
      modalRoot.id = `modal-root-${modalRootId}`
      document.body.appendChild(modalRoot)

      document.addEventListener('keydown', handleEscape)
      document.body.classList.add('modal-open')
      document.body.dataset.modalOpen = 'true'

       return () => {
        document.body.classList.remove('modal-open')
        document.body.removeAttribute('data-modal-open')

        document.body.removeChild(modalRoot)

        document.removeEventListener('keydown', handleEscape)
      }
    }, [handleEscape])

    useEffect(() => {
      const handleFocus = (e: FocusEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          modalRef.current.focus()
        }
      }
      document.addEventListener('focusin', handleFocus)
      return () => {
        document.removeEventListener('focusin', handleFocus)
      }
    }, [])

    const modalContent = useMemo(
      () => (
        <div
          onClick={handleClick}
          role="dialog"
          aria-modal={isOpen}
          className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
        >
          <div
            ref={modalRef}
            role="document"
            className="bg-white max-w-lg mx-auto rounded-lg drop-shadow-xl  text-center"
          >
            <div className="modal-header flex justify-end px-4 py-2 relative">
              <button
                onClick={() => {
                  close()
                }}
                aria-label="Close Modal"
                className="absolute top-0 translate-x-1/3 -translate-y-1/2 right-0 p-1 rounded-full bg-black text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59l-4.88-4.88a1 1 0 1 0-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L12 13.41l4.88 4.88a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L13.41 12l4.88-4.88a1 1 0 0 0 0-1.41z" />
                </svg>
              </button>
            </div>
            <div className="modal-body px-20 pb-6 pt-2">{children}</div>
          </div>
        </div>
      ),
      [children, open],
    )

    return isOpen
      ? createPortal(
          modalContent,
          document.getElementById(`modal-root-${modalRootId}`) as Element,
        )
      : null
  },
)

export default Modal

Modal.displayName = 'Modal'