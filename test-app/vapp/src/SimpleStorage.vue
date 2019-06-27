<template>
  <div>
    <drizzle-contract
      contractName="SimpleStorage"
      method="storedData"
      label="Value"
    />
    <drizzle-contract
      contractName="SimpleStorage"
      method="delta"
      label="delta-5"
      :methodArgs="['5']"
    />
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
