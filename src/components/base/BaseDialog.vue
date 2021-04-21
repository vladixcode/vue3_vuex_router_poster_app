<template>
  <teleport to="body">
    <section class="overlay-wrapper">
      <div v-if="show" @click="tryClose" class="overlay"></div>
    </section>
    <dialog open v-if="show" :style="{ top: position + 'px' }">
      <header>
        <slot name="header">
          <h2>{{ title }}</h2>
          <span @click="tryClose" class="close-x">
            <i class="fa fa-times" size="35"></i>
          </span>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu v-if="!fixed">
        <slot name="actions">
          <base-button @click="tryClose">Close</base-button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false
    },
    position: {
      type: Number,
      required: false,
      default: 0
    }
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
dialog {
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 0;
  margin: 0;
  border: 1px solid var(--olive);
  background: var(--mainYellow);
}

header {
  background-color: var(--mainYellow);
  color: var(--mainBlack);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid var(--olive);
}

header h2 {
  margin: 0;
}

.close-x {
  margin-left: 1rem;
  font-weight: 800;
  font-size: 2rem;
  color: var(--mainWhite);
  cursor: pointer;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.overlay-wrapper {
  display: flex;
  justify-content: center;
}
.overlay {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--dialogOverlay);
  z-index: 50;
}

/* Medium devices (landscape tablets, 768px and up) */
@media screen and (min-width: 768px) {
  .overlay,
  dialog {
    max-width: var(--maxWidthContentTablet);
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media screen and (min-width: 992px) {
  .overlay,
  dialog {
    max-width: var(--maxWidthContentDesktops);
  }
}
</style>
