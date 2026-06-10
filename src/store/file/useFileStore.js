import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const useFileStore = defineStore('fileStore', () => {
  // State

  // Getters

  // Actions
  const upload = async (type,file) => {
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await myAxios.post(`api/files/${type}`, data, {
        headers: { 'Content-Type': 'multipart/form-data'}
      });
      return res.data.data.fileUri;
    } catch (error) {
      console.error(error);
      return null;
    }      
  }

  const uploadProfile = (file) => upload('profiles',file);
  const uploadPost = (file) => upload('posts',file);
  
  return {
    uploadProfile,uploadPost
  };
});
