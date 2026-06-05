<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import MyStrikeThroughBehindeWord from '../../components/decoration/MyStrikeThroughBehindeWord.vue';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useRouter } from 'vue-router';
import loginValidator from '../../util/validator/domain/auth/loginValidator.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const router = useRouter();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();
const loginform = reactive({
  email:'',
  password:'',
})

const handleSubmit = async () => {
  // 유효성 검사
  const resultValidationEmail = loginValidator.email(loginform.email);
  const resultValidationPassword =loginValidator.password(loginform.password); 

  if(!resultValidationEmail && !resultValidationPassword ) {
    // 유효성 검사 통과 패턴
    try{ 
      await authStore.login(loginform);
      router.replace('/posts');
    } catch(error) {
      if(error.response) {
        if(error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  } else {
    // 유효성 검사 실패 패턴
    alert(`${resultValidationEmail}\n${resultValidationPassword}`);
  }
}
</script>

<template>
<form @submit.prevent="handleSubmit">
  <MyInput
    :type="'email'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    v-model="loginform.email"
  ></MyInput>
  <MyInput
    :type="'password'"
    :placeholder="'password'"
    :readonly="false"
    :required="true"
    v-model="loginform.password"
  ></MyInput>

  <MyButton
    :btntype="'submit'"
    :color="'gray'"

    :size="'middle'"
    :content="'Log In'"
  ></MyButton>

    <MyStrikeThroughBehindeWord
    :content="'or'"
  ></MyStrikeThroughBehindeWord>

    <MyButton
    :btntype="'button'"
    :color="'white'"
    :size="'middle'"
    :content="'Sign Up'"
  ></MyButton>

</form>

</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
