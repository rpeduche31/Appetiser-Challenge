<template>
  <HomeContainer>
    <div class="logout-holder">
      <md-button
        @click="handleLogout"
        class="logout-button md-raised md-dense md-primary"
        >LOGOUT</md-button
      >
    </div>
    <div
      class="gran-cover tilt-element"
      v-tilt="{ speed: 500, perspective: 1200 }"
    >
      <div class="slide-in-fwd-center">
        <div class="congratulations-message">
          CONGRATULATIONS, LOGIN SUCCESSFUL!
        </div>
      </div>
    </div>
  </HomeContainer>
</template>

<script>
import styled from "vue-styled-components";
import { AUTH_LOGOUT } from "../../api/authApi";

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 100vh;
  width: 100vw;
  background: black;
  flex-direction: column;
  .logout-holder {
    width: 100vw;
    height: 10px;

    margin: 50px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 150px;
    .logout-button {
      height: 50px;
      width: 100px;
      background: #a70c0c;
      color: white;
    }
  }
  .tilt-element {
    transform-style: preserve-3d;
    transform: perspective(1000px);
  }

  .slide-in-fwd-center {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 70vh;
    width: 70vw;
    background-image: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b);

    border-radius: 15px;
    border: 10px solid white;
    .congratulations-message {
      transform: translateZ(500px);

      font-size: 38px;
      font-weight: 900;
      color: white;
      cursor: pointer;
      text-shadow: 5px 5px black;
    }
  }
`;

export default {
  name: "Home",
  components: {
    HomeContainer,
  },
  mounted() {
    this.checkAuthentication();
  },
  methods: {
    async checkAuthentication() {
      const checkToken = await localStorage.getItem("@auth:token");
      if (checkToken) {
        checkToken.includes("login") ? null : this.$router.push("/login");
      } else {
        this.$router.push("/login");
      }
    },
    handleLogout() {
      AUTH_LOGOUT(this.$router);
    },
  },
};
</script>






