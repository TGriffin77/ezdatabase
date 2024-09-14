'use client'

import { useCallback, useState } from "react"
import CodeBlock from "./codeblock"

type Item = {
    id: number
    content: string
}

export default function QueryPage(){
    const [availableItems, setAvailableItems] = useState<Item[]>([
        { id: 1, content: 'Item 1' },
        { id: 2, content: 'Item 2' },
        { id: 3, content: 'Item 3' },
        { id: 4, content: 'Item 4' },
    ])
    const [selectedItems, setSelectedItems] = useState<Item[]>([{id:5, content: '!!!!!!!!!!!!!!!'}])
    
    const onDragStart = useCallback((e: React.DragEvent, id: number) => {
        e.dataTransfer.setData('id', id.toString())
    }, [])

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
    }, [])

    const onDrop = useCallback((e: React.DragEvent, target: 'available' | 'selected') => {
        e.preventDefault()
        const id = parseInt(e.dataTransfer.getData('id'), 10)
        
        if (target === 'selected') {
          const item = availableItems.find(item => item.id === id)
          if (item) {
            setSelectedItems(prev => [...prev, item])
            setAvailableItems(prev => prev.filter(item => item.id !== id))
          }
        } else {
          const item = selectedItems.find(item => item.id === id)
          if (item) {
            setAvailableItems(prev => [...prev, item])
            setSelectedItems(prev => prev.filter(item => item.id !== id))
          }
        }
      }, [availableItems, selectedItems])

    const renderList = useCallback((items: Item[], listType: 'available' | 'selected') => (
        <ul
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, listType)}>
            {items.map(item => (
                <li
                    className="hover:cursor-move"
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                >{item.content}</li>
            ))}
        </ul>
    ), [onDragStart, onDragOver, onDrop])

    return(
        <div className="flex">
            <div className="flex-1">
                <h1>Query Blocks</h1>
                {renderList(availableItems, 'available')}
            </div>
            <div className="flex-1">
                <h1>User's Query</h1>
                {renderList(selectedItems, 'selected')}
            </div>
            <div className="flex-1">Output Data</div>
        </div>
    )
}