import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateUniqueIdWithTimestamp } from '../../utils/generate-unique-id-with-tomestamp';
import { IComment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  taskCommentsChanged = false;
  readonly _task = inject(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  commentControl = new FormControl('', [Validators.required]);

  addComment() {
    if (this.commentControl.valid) {
      const newComment: IComment = {
        id: generateUniqueIdWithTimestamp(),
        description: this.commentControl.value || '',
      };

      this._task.comments.unshift(newComment);
      this.commentControl.reset();
      this.taskCommentsChanged = true;
    }
  }

  deleteComment(commentId: string) {
    this._task.comments = this._task.comments.filter(
      (comment: IComment) => comment.id !== commentId,
    );
    this.taskCommentsChanged = true;
  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChanged);
  }
}
