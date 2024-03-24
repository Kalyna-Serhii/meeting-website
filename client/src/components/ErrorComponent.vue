<template>
  <v-dialog v-model="this.$store.state.error" max-width="500">
    <v-card>
      <v-card-title>Error</v-card-title>
      <v-card-text>
        {{this.$store.state.errorMessage || 'Internal server error, try later :('}}
      </v-card-text>
      <div class="block block-button dialog-button">
        <button @click="this.$store.dispatch('clearError')">OK</button>
      </div>
    </v-card>
  </v-dialog>
</template>