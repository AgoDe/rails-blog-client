import swal from "sweetalert";

export function useFlash() {
    function flash(title, message, status) {
        return swal(title, message, status)
    }


    return {flash};
}