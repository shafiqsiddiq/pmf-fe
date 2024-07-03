import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoard = ({ data }) => {

  // Define your column names or statuses (e.g., "To Do", "In Progress", "Done")
  const columns = data?.map((name)=>name?.firstName+" "+name?.lastName);

  // Function to handle drag-and-drop reordering
  const onDragEnd = (result) => {
    // Implement the logic to update the data after reordering cards
    // You'll need to use the result object to get the source and destination indices.
    // For simplicity, this example does not update the data.
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {columns.map((column, columnIndex) => (
          <Droppable droppableId={column} key={column}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  flex: '1',
                  padding: '8px',
                  backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                }}
              >
                <h3>{column}</h3>
                {data.filter((item) => item.login_id === columnIndex + 1)
                  .map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '8px',
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px grey',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <p>{`${item.firstName} ${item.lastName}`}</p>
                          <p>{item.email}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;