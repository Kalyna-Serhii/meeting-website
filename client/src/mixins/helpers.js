import InputMask from 'inputmask';
import { serverURL } from '@/api/axiosInstance';

export default {
  methods: {
    validateForm() {
      const { form } = this.$refs;
      if (form.checkValidity()) {
        return true;
      }
      form.classList.add('was-validated');
    },
    addPhoneMask(phone) {
      const inputMask = new InputMask('+38(999)-999-99-99');
      inputMask.mask(phone);
    },
  },

  computed: {
    serverPhotoUrl() {
      return `${serverURL}/photos/`;
    },
  },
};
