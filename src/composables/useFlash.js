import swal from "sweetalert2";

export function useFlash() {
    function flash(title, message, status) {
        return swal.fire(title, message, status)
    }

    function toast(title, status) {

        const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', swal.stopTimer)
              toast.addEventListener('mouseleave', swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: status,
            title: title,
          })
    }




    return {flash, toast};
}