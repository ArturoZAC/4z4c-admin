export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";

export const metadata = {
 title: 'Listado de Todos',
 description: 'SEO Title',
};

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});

  return (
    <>

      <span className="text-3xl mb-10">Server Actions</span>
      {/* <h1>Hello RestTodosPage</h1>
      {
        JSON.stringify(todos)
      } */}

      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodoGrid todos={ todos }/>

    </>
  );
}