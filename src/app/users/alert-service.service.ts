import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  showAlert(icon: 'success' | 'error' | 'info' | 'warning', title: string) {
    const snackBarConfig = {
      duration: 2000,
      panelClass: [`snack-bar-${icon}`]
    };

    this.snackBar.open(title, undefined, snackBarConfig);
  }

  showConfirmBox(icon: 'success' | 'error' | 'info' | 'warning', title: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { icon, title }
    });
    return dialogRef.afterClosed().toPromise();
  }

  showSuccessMessage(title: string, showConfirmButton: boolean = false) {
    return this.showAlert('success', title);
  }

  showErrorMessage(title: string, showConfirmButton: boolean = false) {
    return this.showAlert('error', title);
  }

  showInfoMessage(title: string, showConfirmButton: boolean = false) {
    return this.showAlert('info', title);
  }

  showWarningMessage(title: string, showConfirmButton: boolean = false) {
    return this.showAlert('warning', title);
  }

  showConfirmMessage(title: string) {
    return this.showConfirmBox('warning', title);
  }
}