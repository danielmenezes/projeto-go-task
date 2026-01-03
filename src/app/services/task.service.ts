import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { ITaskFormModalControls } from '../interfaces/task-form.modal.controls.interface';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-tomestamp';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TaskStatus } from '../types/task-status';
import { IComment } from '../interfaces/comment.interface';

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
      comments: [],
      ...taskInfos,
    };
    const currentTasks = this.todoTasks$.getValue();

    this.todoTasks$.next([...currentTasks, newTask]);
  }

  updateTask(
    taskId: string,
    taskForm: ITaskFormModalControls,
    status: TaskStatus,
  ) {
    const currentTasks = this.getTaskListByStatus(status).getValue();

    const updatedTasks = currentTasks.map((task) =>
      task.id === taskId ? { ...task, ...taskForm } : task,
    );

    this.getTaskListByStatus(status).next(updatedTasks);
  }

  updateTaskComments(
    taskId: string,
    taskStatus: TaskStatus,
    comments: IComment[],
  ) {
    const currentTasks = this.getTaskListByStatus(taskStatus).getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.id === taskId ? { ...task, comments } : task,
    );
    this.getTaskListByStatus(taskStatus).next(updatedTasks);
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    const currentTasksList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTasksList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus;
      const currentTaskWithoutTask = currentTasksList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTasksList.next([...currentTaskWithoutTask]);
      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  removeTask(taskId: string, taskStatus: TaskStatus) {
    const currentTasksList = this.getTaskListByStatus(taskStatus);
    const updatedTasks = currentTasksList
      .getValue()
      .filter((task) => task.id !== taskId);

    currentTasksList.next(updatedTasks);
  }

  private getTaskListByStatus(taskStatus: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };

    return taskListObj[taskStatus];
  }
}
