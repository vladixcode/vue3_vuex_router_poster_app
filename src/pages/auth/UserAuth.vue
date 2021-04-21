<template>
  <base-card v-if="!!error" class="error">
    <h3>{{ error }}</h3>
  </base-card>

  <base-card v-if="isLoading">
    <base-loading />
  </base-card>
  <base-card v-else class="auth">
    <Logo class="login-logo" />
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">email</label>
        <input type="email" id="email" v-model.trim="credentials.email" />
      </div>
      <div class="form-control">
        <label for="passowrd">password</label>
        <input
          type="password"
          id="password"
          v-model.trim="credentials.password"
        />
      </div>
      <section class="buttons">
        <div class="form-control">
          <base-button :disabled="authDisabled">{{
            submitButtonCaption
          }}</base-button>
        </div>
        <div class="form-control">
          <base-button link mode="flat" @click="switchAuthMode">
            {{ switchModeButtonCaption }}
          </base-button>
        </div>
      </section>
    </form>
  </base-card>
</template>

<script>
import Logo from '../../components/layout/Logo';
export default {
  components: {
    Logo
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      formIsValid: true,
      mode: 'login',
      authDisabled: true,
      isLoading: false,
      error: null
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'login';
      } else {
        return 'register';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Register';
      } else {
        return 'Login';
      }
    }
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.credentials.email === '' ||
        !this.credentials.email.includes('@') ||
        this.credentials.password.length < 6
      ) {
        this.formIsValid = false;
        this.error = 'Please enter valid email and password';
        return;
      }

      this.isLoading = true;
      this.error = null;

      const actionPayload = {
        email: this.credentials.email,
        password: this.credentials.password
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', actionPayload);
        } else {
          await this.$store.dispatch('auth/register', actionPayload);
        }
        this.$router.replace({ name: 'posts' });
      } catch (err) {
        this.error = `Failed to atuthenticate! ${err.message}`;
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'register';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    }
  },
  watch: {
    credentials: {
      deep: true,
      handler() {
        if (
          this.credentials.email.length > 0 &&
          this.credentials.password.length > 0
        ) {
          this.authDisabled = false;
        } else {
          this.authDisabled = true;
        }
      }
    }
  }
};
</script>

<style scoped>
.form-control {
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0;
}

label {
  display: block;
}

input {
  display: block;
  width: 10rem;
  font-family: inherit;

  border: none;
  border-bottom: 1px solid var(--mainBlack);
  background: var(--mainYellow);
  outline: none !important;
  margin-left: 0.5rem;
}

@media screen and (min-width: 600px) {
  input {
    width: 30rem;
    font-weight: 900;
    font-size: 1.2rem;
  }
}

/* input:focus {
  background: var(--mainYellow);
  outline: none;
} */

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  outline: none !important;
  border: none;
  border-bottom: 1px solid var(--mainBlack);
  -webkit-text-fill-color: var(--mainBlack);
  transition: background-color 5000s ease-in-out 0s;
}

.buttons {
  margin-top: 2rem;
}
</style>
