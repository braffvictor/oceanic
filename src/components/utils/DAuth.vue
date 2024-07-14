<template>
  <main
    class="inset-0 fixed z-20 backdrop-blur-md top-0 left-0 min-h-screen h-auto transition-all ease-in-out duration-700"
    :class="form ? '-translate-y-0 ' : 'translate-y-full opacity-0'"
  >
    <section class="flex justify-center mt-32">
      <!-- container form -->
      <registerComp :themeState="themeState" v-if="type == 'registration'" />
      <loginComp :themeState="themeState" v-if="type == 'login'" />
    </section>
    <div class="mx-auto text-center flex justify-center mt-20 transit">
      <div
        @click="$emit('closeForm')"
        class="rounded-full p-3 backdrop-blur-md transit"
        :class="
          themeState == 'light' || themeState == null
            ? 'whiteT border-gray-200'
            : 'darkT border-gray-600'
        "
      >
        <svg-comp
          Sclass="active:stroke-red-500"
          icon="M12,14.1215 L17.3032,19.4248 C17.889,20.0106 18.8388,20.0106 19.4246,19.4248 C20.0104,18.839 20.0104,17.8893 19.4246,17.3035 L14.1213,12.0002 L19.4246,6.6969 C20.0104,6.11112 20.0104,5.16137 19.4246,4.57558 C18.8388,3.9898 17.889,3.9898 17.3032,4.57558 L12,9.87888 L6.69665,4.57557 C6.11086,3.98978 5.16111,3.98978 4.57533,4.57557 C3.98954,5.16136 3.98954,6.1111 4.57533,6.69689 L9.87863,12.0002 L4.57533,17.3035 C3.98954,17.8893 3.98954,18.839 4.57533,19.4248 C5.16111,20.0106 6.11086,20.0106 6.69665,19.4248 L12,14.1215 Z"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import svgComp from "@/components/svgComp.vue";
import registerComp from "@/components/extUtils/registerComp.vue";
import loginComp from "@/components/extUtils/loginComp.vue";
const props = defineProps({
  themeState: {
    default: null,
  },
  form: {
    default: false,
  },
  type: {
    type: String,
    default: "registration",
  },
});
</script>

<style></style>
