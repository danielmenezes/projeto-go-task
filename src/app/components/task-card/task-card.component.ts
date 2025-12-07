import { Component, inject, input, Input } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  @Input() task: ITask = {} as ITask;

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openTaskModal({
      data: {
        mode: 'edit',
        formValues: {
          name: 'Nome teste',
          description: 'Descrição teste',
        },
      },
    });

    dialogRef.closed.subscribe((taskForm) => {
      if (taskForm) {
        this._taskService.addTask(taskForm);
      }
    });
  }
}
