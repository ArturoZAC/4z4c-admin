'use client';

import { Todo } from '@prisma/client';
import { TodoItem } from './TodoItem';
import { updateTodo } from '../helpers/todos';
import { useRouter } from 'next/navigation';
import { toggleTodo } from '../actions/todos-action';

interface Props {
  todos?: Todo[];
}

export const TodoGrid = ({ todos = [] }: Props) => {

  const router = useRouter();

  // const toggleTodo = async(id: string, complete: boolean) => {
  //   await updateTodo( id, complete);
  //   router.refresh();
  // }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {
        todos.map( todo => (
          <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo }/>
        ))
      }

    </div>
  )
}
