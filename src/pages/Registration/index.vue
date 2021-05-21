<template>
  <RegisterContainer>
    <div class="register">
      <div class="back-button-holder">
        <md-button
          @click="goBack"
          class="back-button md-raised md-dense md-primary"
          >BACK</md-button
        >
      </div>
      <div class="welcome-header">Register</div>

      <form @submit="submitRegistrationData">
        <md-field>
          <label class="placeholder">Email</label>
          <md-input type="email" v-model="registrationData.email"></md-input>
        </md-field>
        <div class="error-holder">{{ emailError }}</div>
        <md-field>
          <label class="placeholder">Username</label>
          <md-input v-model="registrationData.username"></md-input>
        </md-field>
        <div class="error-holder">{{ usernameError }}</div>
        <md-field>
          <label class="placeholder">Password</label>
          <md-input
            class="password-input"
            v-model="registrationData.password"
          ></md-input>
        </md-field>
        <div class="error-holder">{{ passwordError }}</div>
        <md-field>
          <label class="placeholder">Confirm Password</label>
          <md-input
            class="password-input"
            v-model="registrationData.confirmPassword"
          ></md-input>
        </md-field>
        <div class="error-holder">{{ confirmPasswordError }}</div>

        <md-card-actions>
          <div class="button-holder">
            <md-button
              @click="submitRegistrationData"
              class="register-button md-raised md-dense md-primary"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </div>
  </RegisterContainer>
</template>

<script>
import styled from "vue-styled-components";
import { validateEmail } from "../../helpers/validation";
import { mapGetters, mapActions } from "vuex";

const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b);

  .register {
    padding: 30px 40px 40px;
    background: white;
    box-shadow: 12px 12px 0px 0px black;
    border: 5px solid black;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    .password-input {
      -webkit-text-security: circle;
    }
    .back-button-holder {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      .back-button {
        padding: 10px 20px;
        background: #3ea73e;
        color: white;
        font-weight: 900;
        letter-spacing: 2px;
        border-radius: 3px;
        box-shadow: 5px 5px 0 0 black;
        cursor: pointer;
      }
    }
    .welcome-header {
      font-size: 3rem;
      padding: 0 90px;
      font-weight: 900;
      margin: 30px 0;
    }
    .md-field {
      margin: 4px 0 4px !important;
    }
    .error-holder {
      height: 10px;
      color: red;
      font-size: 12px;
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
      .register-button {
        background: #366798;
      }
    }
  }
`;

export default {
  name: "Registration",
  components: {
    RegisterContainer,
  },
  computed: { ...mapGetters(["authRegisterStatus"]) },
  mounted() {
    this.checkAuthToken();
  },
  data() {
    return {
      registrationData: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      passwordError: "",
      usernameError: "",
      confirmPasswordError: "",
      emailError: "",
    };
  },
  watch: {
    "registrationData.confirmPassword": function () {
      this.checkConfirmPassword();
      this.confirmPasswordError = "";
      this.emailError = "";
      this.passwordError = "";
      this.usernameError = "";
    },
    "registrationData.email": function () {
      this.emailError = "";
    },
    "registrationData.password": function () {
      this.passwordError = "";
    },
    "registrationData.username": function () {
      this.usernameError = "";
    },
    authRegisterStatus: function () {
      if (this.authRegisterStatus === "success") {
        this.$router.push({
          name: "Verification",
          path: "/verification",
          params: { email: this.registrationData.email },
        });
      } else {
        this.emailError = this.authRegisterStatus;
      }
    },
  },
  methods: {
    ...mapActions(["handleAuthRegister"]),
    submitRegistrationData() {
      if (validateEmail(this.registrationData.email)) {
        // this.emailError = "";?
      } else {
        if (this.registrationData.email !== "") {
          this.emailError = "Enter valid email address!";
        }
      }
      if (this.registrationData.email === "")
        this.emailError = "Field are required";
      if (this.registrationData.username === "")
        this.usernameError = "Field are required";
      if (this.registrationData.password === "")
        this.passwordError = "Field are required";
      if (this.registrationData.password.length < 8)
        this.passwordError = "Password must be atleast 8 characters";
      if (this.registrationData.confirmPassword === "")
        this.confirmPasswordError = "Field are required";
      if (
        this.emailError ||
        this.usernameError ||
        this.usernameError ||
        this.passwordError ||
        this.confirmPasswordError
      ) {
        console.log("error");
      } else {
        this.handleAuthRegister(this.registrationData);
      }
    },
    checkConfirmPassword() {
      this.confirmPasswordError = "";
      setTimeout(() => {
        if (
          this.registrationData.password !==
          this.registrationData.confirmPassword
        ) {
          this.confirmPasswordError = "Password do not match!";
        } else {
          this.confirmPasswordError = "";
        }
      }, 1500);
    },
    goBack() {
      this.$router.push("/login");
    },
    async checkAuthToken() {
      const token = await localStorage.getItem("@auth:token");

      token?.includes("login") ? this.$router.push("/") : null;
    },
  },
};
</script>






