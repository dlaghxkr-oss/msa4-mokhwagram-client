<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import MyStrikeThroughBehindeWord from '../../components/decoration/MyStrikeThroughBehindeWord.vue';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const loginform = reactive({
  email:'',
  password:'',
})

const handleSubmit = async () => {
  await authStore.login(loginform);
  router.replace('/posts');
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
