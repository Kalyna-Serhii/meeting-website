<template>
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fs-5" id="exampleModalLabel">Confirm</h3>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center">
            <span class="flex-grow-1">
              Are you sure you want to delete your account?</span>
            <button type="button" class="btn btn-primary me-2"
                    data-bs-dismiss="modal">
              No
            </button>
            <button type="button" class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="this.$emit('confirmed')">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['confirmed']
}
</script>