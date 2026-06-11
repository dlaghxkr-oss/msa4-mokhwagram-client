<script setup>
import { useRouter } from 'vue-router';
import { useFileStore } from '../../store/file/useFileStore';
import { usePostStoreStore } from '../../store/post/usePostStoreStore';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';
import { content, image } from '../../util/validator/rule/postRule';
import postValidator from '../../util/validator/domain/post/postValidator';
import MyButton from '../../components/button/MyButton.vue';


const router = useRouter();
const fileStore = useFileStore();
const postStore = usePostStoreStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null);
const postData = reactive ({
  content:'',
  image:'',
});

const handleSubmit = async () => {
  // 유효성 검사
  const validationList = [
  postValidator.content(postData.content),
  postValidator.image(postData.image)
  ];

  const errorList = validationList.filter(val => val);

  if(errorList.length > 0) {
    alert(errorList.join('\n'));
    return;
  }

  try {
    await postStore.store(postData);
    alert("게시글이 작성되었습니다.");
    router.replace('/posts');
  } catch (error) {
    const data = error.response.data;
    if(data.code === 'E21') {
      alert('잘못된 양식입니다.');   
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  }
}

const handleChangeImage = async  (e) => {
  const file = e.target.files[0];

  if(file) {
    if(preview.value) {
      // 기존 미리보기 메모리 URL 해제
      URL.revokeObjectURL(preview.value);
    }

    // API 서버에 이미지 업로드 -> URL 받기
    const fileUri = await fileStore.uploadPost(file);

    if(fileUri) {
      postData.image = fileUri;
      preview.value = URL.createObjectURL(file);
    }
  }
}

</script>

<template>
<form @submit.prevent="handleSubmit">
  <div
    class="preview"
    v-if="preview"
    :style="{backgroundImage:`url(${preview})`}"
    ></div>
  <input
    type="file"
    accept="image/*"
    @change="handleChangeImage"
  >
    
  <textarea
    v-model="postData.content"
    placeholder="내용을 입력하세요 (200자 이내)"
    maxlength="200"
    rows="5"
  ></textarea> 

  <MyButton
    :btntype="'submit'"
    :color="'black'"
    :size="'middle'"
    :content="'작성'"
  ></MyButton>
</form>
</template>

<style scoped>
form {
  padding:20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview {
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}

textarea {
  padding: 10px;
  width: 300px;
  font-size: 20px;
  outline: none;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
  resize: none;
}

</style>
