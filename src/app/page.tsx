"use client";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const backlogTodos = [
  { id: 3450, name: "test" },
  { id: 5435, name: "hsdf" },
  { id: 8484, name: "434" },
];

enum TodosStatus {
  BacklogTodos = "BacklogTodos",
}

const TodoItem = ({ index, todo, todos }) => {
  return (
    <Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
      {(draggableProvided, draggableSnapshot) => (
        <form
          className="flex rounded-md bg-yellow-300  w-full p-[20px] mt-[15px] transition hover:scale-105 hover:shadow-md"
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          hello
        </form>
      )}
    </Draggable>
  );
};

const Todos: React.FC<Props> = ({ backlogTodos }) => (
  <div className="grid grid-cols-1 w-full gap-6 mt-4 lg:grid-cols-3">
    <Droppable droppableId={"hello"}>
      {(droppableProvided, droppableSnapshot) => (
        <div
          className="bg-gray-400 px-5 py-3 rounded-md"
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          <span className="text-white text-2xl font-semibold">Backlog</span>
          {backlogTodos?.map((todo, index) => (
            <TodoItem
              index={index}
              key={todo?.id}
              todo={todo}
              todos={backlogTodos}
            />
          ))}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default function Home() {
  const [todos, setTodos] = useState(backlogTodos);
  const handleDragEnd = (result) => {
    console.log(result);
    console.log("end");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Todos backlogTodos={todos} />
      </DragDropContext>
    </main>
  );
}
