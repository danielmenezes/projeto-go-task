import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { TaskCommentsModalComponent } from '../components/task-comments-modal/task-comments-modal.component';
import { ITaskFormModalData } from '../interfaces/task-form-modal-data.interface';
import { ITaskCommentsModalData } from '../interfaces/task-comments-modal-data.interface';
import { ITaskFormModalControls } from '../interfaces/task-form.modal.controls.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%',
  };
  private readonly _dialog = inject(Dialog);

  openTaskModal({ data }: { data: ITaskFormModalData }) {
    return this._dialog.open<ITaskFormModalControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data,
    });
  }

  openTaskCommentsModal({ data }: { data: ITaskCommentsModalData }) {
    return this._dialog.open(TaskCommentsModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data,
    });
  }
}
