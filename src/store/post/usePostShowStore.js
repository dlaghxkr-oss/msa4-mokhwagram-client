import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";
import { ref } from "vue";

export const usePostShowStore = defineStore('postShowStore', () => {
  // 1. State
  const post = ref();

  // 2. Getters

  // 3. Actions
  const getPost = async (id) => {
    try {
      const url = `/api/posts/${id}`;
      const result = await myAxios.get(url);

      post.value = result.data.data;
    } catch (error) {
      throw error;
    }
  }

  const clearPostShow = () => {
    post.value = null;
  }

  return {
    post,
    getPost,
    clearPostShow,

  }
});
