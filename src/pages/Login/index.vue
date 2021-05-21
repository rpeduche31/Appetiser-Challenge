<template>
  <LoginContainer>
    <div class="login">
      <div class="welcome-header">LOGIN</div>
      <form>
        <md-field>
          <label class="placeholder">Username</label>
          <md-input v-model="loginData.username"></md-input>
        </md-field>
        <div class="error-holder">{{ emailError }}</div>
        <md-field>
          <label class="placeholder">Password</label>
          <md-input
            class="password-input"
            v-model="loginData.password"
          ></md-input>
        </md-field>
        <div class="error-holder">{{ passwordError }}</div>
        <div class="error-holder general-error">{{ generalError }}</div>

        <md-card-actions>
          <div class="button-holder">
            <md-button
              @click="handleLogin"
              class="login-button md-raised md-dense md-primary"
              >Login</md-button
            >
            <span>OR</span>
            <md-button
              @click="handleGoToRegistration"
              class="register-button md-raised md-dense md-primary"
              >Register</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </div>
  </LoginContainer>
</template>

<script>
import styled from "vue-styled-components";
import { mapGetters, mapActions } from "vuex";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b);

  .login {
    padding: 80px 40px;
    padding-bottom: 40px;
    background: white;
    box-shadow: 12px 12px 0px 0px black;
    border: 5px solid black;
    border-radius: 7px;
    .password-input {
      -webkit-text-security: square;
    }

    .welcome-header {
      margin-bottom: 65px;
      font-size: 3rem;
      font-weight: 900;
      color: black;
      padding: 0 110px;
    }
    .md-field {
      margin: 4px 0 4px !important;
    }
    .error-holder {
      height: 10px;
      color: red;
      font-size: 10;
    }
    .general-error {
      height: 25px;
      padding-right: 30px;
      width: 330px;
    }
    .md-field:after {
      height: 2px;
      background: #366798;
    }
    .md-input {
      height: 40px;
    }
    .placeholder {
      color: #366798;
    }
    .button-holder {
      margin-top: 25px;

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .md-button {
        width: 100% !important;
        height: 45px;
        margin: 15px 0 !important;
        color: white;
      }
      .login-button {
        background: #366798;
      }
      .register-button {
        background: #3ea73e;
      }
    }
  }
`;

export default {
  name: "Login",
  components: {
    LoginContainer,
  },
  computed: { ...mapGetters(["authLoginStatus"]) },
  mounted() {
    this.checkAuthToken();
  },

  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      emailError: "",
      passwordError: "",
      generalError: "",
    };
  },
  watch: {
    authLoginStatus: function () {
      this.authLoginStatus.data.access_token &&
        this.authLoginStatus.http_status === 200 &&
        this.authLoginStatus.success &&
        this.$router.push("/");
      if (this.authLoginStatus.data.message) {
        this.generalError = this.authLoginStatus.data.message;
      }
    },
    "loginData.username": function () {
      this.emailError = "";
    },
    "loginData.password": function () {
      this.passwordError = "";
    },
  },
  methods: {
    ...mapActions(["handleAuthLogin"]),
    handleLogin() {
      if (this.loginData.username === "") {
        this.emailError = "Field are required";
      }
      if (this.loginData.password === "") {
        this.passwordError = "Field are required";
      }
      if (this.emailError || this.passwordError) {
        console.log("error");
      } else {
        this.handleAuthLogin(this.loginData);
      }
    },
    handleGoToRegistration() {
      this.$router.push("/register");
    },
    async checkAuthToken() {
      const token = await localStorage.getItem("@auth:token");

      token?.includes("login") ? this.$router.push("/") : null;
    },
  },
};
</script>






