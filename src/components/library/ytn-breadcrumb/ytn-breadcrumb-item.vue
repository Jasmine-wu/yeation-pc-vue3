<template>
  <div class="ytn-breadcrumb-item">
    <RouterLink v-if="to" :to="to">
      <slot />
    </RouterLink>
    <span v-else>
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: "YtnBreadcrumbItem",
  props: {
    to: {
      type: [String, Object],
    },
  },
};
</script>