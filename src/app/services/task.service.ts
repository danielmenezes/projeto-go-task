import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { ITaskFormModalControls } from '../interfaces/task-form.modal.controls.interface';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-tomestamp';
import { TaskStatusEnum } from '../enums/task-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todoTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTasks = this.todoTasks$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  private doingTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTasks = this.doingTasks$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  private doneTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTasks = this.doneTasks$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  addTask(taskInfos: ITaskFormModalControls) {
    const newTask: ITask = {
      id: generateUniqueIdWithTimestamp(),
      status: TaskStatusEnum.TODO,
      ...taskInfos,
    };
    const currentTasks = this.todoTasks$.getValue();

    this.todoTasks$.next([...currentTasks, newTask]);
  }
}
