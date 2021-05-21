<template>
  <VerificationContainer>
    <div class="verification">
      <div class="back-button-holder">
        <md-button
          @click="goBack"
          class="back-button md-raised md-dense md-primary"
          >BACK</md-button
        >
      </div>
      <div class="welcome-header">VERIFICATION</div>
      <form>
        <div class="verification-input">
          <md-field>
            <label class="placeholder">Enter Verification Code</label>
            <md-input
              class="main-input"
              v-model="verificationData.token"
            ></md-input>
          </md-field>
        </div>
        <div class="error-holder">{{ verificationError }}</div>
        <div @click="resendVerificationToken" class="resend-rerification">
          RESEND VERIFICATION CODE
        </div>
        <md-card-actions>
          <div class="button-holder">
            <div class="message-token">Check your email for the token</div>
            <md-button
              @click="submitToken"
              class="submit-button md-raised md-dense md-primary"
              >SUBMIT</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </div>
  </VerificationContainer>
</template>

<script>
import styled from "vue-styled-components";
import { mapGetters, mapActions } from "vuex";
import { AUTH_VERIFY_RESEND } from "../../api/authApi";

const VerificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b);

  .verification {
    padding: 20px 40px 40px;

    background: white;
    box-shadow: 12px 12px 0px 0px black;
    border: 5px solid black;
    border-radius: 7px;

    .back-button-holder {
      display: flex;
      align-items: flex-start;
      margin-bottom: 60px;
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
      margin-bottom: 65px;
      font-size: 3rem;
      font-weight: 900;
      color: black;
      padding: 0 50px;
    }
    .verification-input {
      padding: 0 60px;
    }
    .md-field {
      margin: 4px 0 4px !important;
    }
    .main-input {
      text-align: center;
    }
    .error-holder {
      height: 55px;
      padding: 0 60px;
      width: 420px;
      font-size: 12px;
      color: red;
    }
    .message-token {
      text-align: center;
      color: #366798;
      font-weight: 900;
    }
    .resend-rerification {
      text-align: center;
      color: #366798;
      font-weight: 900;
      cursor: pointer;
      &:hover {
        color: black;
      }
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
      text-align: center;
    }

    .button-holder {
      margin-top: 25px;

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 50px;
      .md-button {
        width: 100% !important;
        height: 45px;
        margin: 15px 0 !important;
        color: white;
      }

      .submit-button {
        background: #366798;
      }
    }
  }
`;

export default {
  name: "Verification",
  components: {
    VerificationContainer,
  },
  mounted() {
    this.checkEmail();
  },
  computed: { ...mapGetters(["authVerifyStatus"]) },
  data() {
    return {
      verificationData: {
        token: "",
        email: "",
      },
      verificationError: "",
    };
  },
  watch: {
    authVerifyStatus: function () {
      if (
        this.authVerifyStatus.http_status === 200 &&
        this.authVerifyStatus.success
      ) {
        this.$router.push("/login");
      } else {
        this.verificationError = this.authVerifyStatus;
      }
    },
    "verificationData.token": function () {
      this.verificationError = "";
    },
  },
  methods: {
    ...mapActions(["handleAuthVerify"]),
    goBack() {
      this.$router.push("/register");
    },
    submitToken() {
      if (this.verificationData.token) {
        this.handleAuthVerify(this.verificationData);
      } else {
        this.verificationError = "FIeld is required";
      }
    },
    async resendVerificationToken() {
      await AUTH_VERIFY_RESEND(this.$router.currentRoute.params.email);
    },
    async checkEmail() {
      this.$router.currentRoute.params.email
        ? null
        : this.$router.push("/register");
    },
  },
};
</script>






