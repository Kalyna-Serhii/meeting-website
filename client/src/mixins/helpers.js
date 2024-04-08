import Inputmask from "inputmask"
import {serverURL} from "@/api/axiosInstance";

export default {
    methods: {
        validateForm() {
            const form = this.$refs.form;
            if (form.checkValidity()) {
                return true
            } else {
                form.classList.add('was-validated');
            }
        },
        addPhoneMask(phone) {
            const inputMask = new Inputmask('+38(999)-999-99-99');
            inputMask.mask(phone);
        }
    },

    computed: {
        serverPhotoUrl() {
            return `${serverURL}/photos/`
        }
    }
}