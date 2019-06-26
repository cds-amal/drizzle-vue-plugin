<template>
  <div>
    <drizzle-contract
      contractName="SimpleStorage"
      method="storedData"
      label="Value"
    />
    <!-- <drizzle-contract
       -   contractName="SimpleStorage"
       -   method="delta"
       -   label="Value"
       -   :methodArgs="[1]"
       - /> -->
    <drizzle-contract-form
      contractName="SimpleStorage"
      method="set"
      :placeholders="['Value']"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SimpleStorage',

  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style></style>
