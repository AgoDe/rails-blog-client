import {defineStore } from 'pinia';
import swal from 'sweetalert2';

export const useAlertStore = defineStore('Alert', {
    state: () => ({
        alert: null,
        alertOptions: []    

    }), // end of state
    actions: {
        success(message) {
            this.alertOptions = ['Success', message, 'success']
        },
        error(message) {
            this.alertOptions = ['Error', message, 'error'];   
        },
        warning(message) {
            this.alertOptions = ['Warning', message, 'warning'];
        },
        info(message) {
            this.alert = swal.fire('Info', message, 'info');
        },  
        delete(message, deletedMessage, returnMessage) {
            const button = swal.mixin({
                customClass: {  
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-secondary'
                },
                buttonsStyling: false
            });

            this.alert = button.fire({
                title: 'Are you sure?',
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'return back',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    button.fire(
                        'Deleted!',
                        deletedMessage,
                        'success'
                    )
                } else if (
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    button.fire(
                        'Cancelled',
                        returnMessage,
                        'error'
                    )
                }
            })
        },
        successToast(message) {
            const Toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', swal.stopTimer)    
                    toast.addEventListener('mouseleave', swal.resumeTimer)
                }
            });

            this.alert = Toast.fire({
               icon: 'success',
               title: message
            })
        }
    }, // end of actions
    getters: {
        alert() {
            return this.alert.fire(this.alertOptions);
        }
});