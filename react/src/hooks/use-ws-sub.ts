import { useEffect, useLayoutEffect, useRef } from 'react'

export type AddItem<TResource> = <K extends keyof TResource>(resourceKey: K, item: TResource[K]) => void
export type UpdateItem<TResource> = <K extends keyof TResource>(
  resourceKey: K,
  id: string,
  updater: (item: TResource[K]) => TResource[K]
) => void

export type WsSubProps<TResource> = {
  addItem: AddItem<TResource>
  updateItem: UpdateItem<TResource>
}

export function useWsSub<TResource>(
  { addItem, updateItem }: WsSubProps<TResource>,
  subscribe: (addItem: AddItem<TResource>, updateItem: UpdateItem<TResource>) => Array<() => void>
) {
  // subscription stability is useWsSub's responsibility
  // refs keep addItem / updateItem fresh without triggering re-subscription
  const addItemRef = useRef(addItem)
  const updateItemRef = useRef(updateItem)

  useLayoutEffect(() => {
    addItemRef.current = addItem
    updateItemRef.current = updateItem
  }, [addItem, updateItem])

  useEffect(() => {
    const offs = subscribe(
      (...args) => addItemRef.current(...args),
      (...args) => updateItemRef.current(...args)
    )
    return () => offs.forEach(off => off())
  }, [subscribe])
}
