import { ITaskFormModalControls } from './task-form.modal.controls.interface';

export interface ITaskFormModalData {
  mode: 'create' | 'edit';
  formValues?: ITaskFormModalControls;
}
