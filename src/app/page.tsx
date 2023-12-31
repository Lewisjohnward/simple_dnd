"use client";
import clsx from "clsx";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

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
      {(provided, snapshot) => {
        return (
          <form
            className={clsx(
              "flex rounded-md bg-yellow-300  w-full p-[20px] mt-[15px]",
              snapshot.isDragging && "bg-blue-200"
            )}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div {...provided.dragHandleProps}>
              <HiOutlineEllipsisVertical />
            </div>
            {todo.name}
          </form>
        );
      }}
    </Draggable>
  );
};

const Todos: React.FC<Props> = ({ backlogTodos }) => (
  <div className="grid grid-cols-1 w-full gap-6 mt-4 lg:grid-cols-3">
    <Droppable droppableId={"droppable-1"}>
      {(provided, snapshot) => (
        <div
          className={clsx(
            "bg-gray-400 px-5 py-3 rounded-md",
            snapshot.isDraggingOver && "bg-red-200"
          )}
          ref={provided.innerRef}
          {...provided.droppableProps}
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default function Home() {
  const [todos, setTodos] = useState(backlogTodos);
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add,
      previous = todos;

    console.log(destination, source);
    add = todos[source.index];
    previous.splice(source.index, 1);

    previous.splice(destination.index, 0, add);

    setTodos(previous);
  };

  const handleOnBeforeCapture = () => {
    console.log("onBeforeCapture");
  };

  const handleOnBeforeDragStart = () => {
    console.log("OnBeforeDragStart");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DragDropContext
        onDragEnd={handleDragEnd}
        onBeforeCapture={handleOnBeforeCapture}
        onBeforeDragStart={handleOnBeforeDragStart}
      >
        <Todos backlogTodos={todos} />
      </DragDropContext>
    </main>
  );
}
