import {useState, useCallback} from 'react'

export type UseModalResult = [boolean, () => void, () => void]

export function useModal(): UseModalResult {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return [isOpen, open, close]
}
