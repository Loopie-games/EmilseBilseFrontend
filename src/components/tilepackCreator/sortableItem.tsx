import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react'

const SortableItem = (props: any) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id});

      const style = {
        transform: CSS.Transform.toString(transform),
        transition
      };
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          AAAAAAAAAAAAAAAAA
        </div>
      );
}

export default SortableItem