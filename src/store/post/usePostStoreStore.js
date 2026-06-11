import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const usePostStoreStore = defineStore('postStoreStore', () => {
  // Actions
  const store = async (postForm) => {
    try {
      const url = 'api/posts';
      await myAxios.post(url, postForm); // postForm = { content, image }
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    store,
  }
});
