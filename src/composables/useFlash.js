import swal from "sweetalert2";

export function useFlash() {
    function flash(title, message, status) {
        return swal.fire(title, message, status)
    }


    return {flash};
}