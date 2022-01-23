<template>
  <div>
    <h1>{{ msg }}</h1>
    <a-button type="primary" @click="count++">
      <template #icon>count is: {{ count }}</template>
    </a-button>
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
