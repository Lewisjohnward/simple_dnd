"use client";
import { useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const items = [
  { id: 0, name: "test" },
  { id: 1, name: "hsdf" },
  { id: 2, name: "434" },
];

const Item = ({ index, todo, todos }) => {
  return (
    <Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
      {(draggableProvided, draggableSnapshot) => (
        <form
          className="flex rounded-md bg-yellow-300  w-full p-[20px] mt-[15px] transition hover:scale-105 hover:shadow-md"
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          <span className="flex-1">{todo.name}</span>
        </form>
      )}
    </Draggable>
  );
};

export default function Home() {
  const handleDragEnd = () => {
    console.log("end");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="test">
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="bg-red-300 px-5 py-3 rounded"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              <p className="bg-red-50">Title</p>
              {items.map((item, index) => (
                <Item index={index} key={item.id} todo={item} todos={items} />
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
