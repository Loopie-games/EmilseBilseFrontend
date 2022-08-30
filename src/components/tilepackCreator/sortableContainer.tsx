import React from 'react'

import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableItem from './sortableItem';
const SortableContainer = (props: any) => {

    const { id, items } = props;

    const { setNodeRef } = useDroppable({
        id
    });

    const containerStyle = {
        background: "#dadada",
        padding: 10,
        margin: 10,
        flex: 1
    };

    
    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} style={containerStyle}>
                {items.map((id: any) => (
                    <SortableItem key={id} id={id} />
                ))}
            </div>
        </SortableContext>
    )
}

export default SortableContainer