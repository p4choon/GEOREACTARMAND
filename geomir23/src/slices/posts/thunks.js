import {
    setInfo,
    setPosts,
    startLoadingPosts,
    setError,
    setPost,
    setPages,
    setLikes,
    setLiked
  } from "./postSlice";
  
  // Obtenim un sol post
  export const getPost = (authToken, id) => {
    return async (dispatch, getState) => {
      dispatch(startLoadingPosts());
  
      try {
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" + id,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            method: "GET",
          }
        );
        const resposta = await data.json();
  
        dispatch(setPost(resposta.data));
      } catch (e) {
        console.log(e);
        //dispatch(setError(e))
      }
    };
  };
  export const getPosts = (authToken, page = 0) => {
    return async (dispatch, getState) => {
      dispatch(startLoadingPosts());
   
      // Obtenim el filtre
      const state = getState();
      const filter = state.posts.filter;
  
      let url =
        page > 0
          ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page
          : "https://backend.insjoaquimmir.cat/api/posts";
  
      // let url2 = filter == undefined ? "" : filter.description
      let interrogant = page>0 ? "&" : "?"
      let body = filter.body !="" ? "body="+filter.body+"&" : ""
      let author = filter.author !="" ? "author="+filter.author : ""
      
     
      url = url + interrogant + body + author
    
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "GET",
      };
      try {
        const res = await fetch(url, options);
        const json = await res.json();
  
        // si es pagina, data.collection i no data
        if (page > 0) {
          dispatch(setPosts(json.data.collection));
          dispatch(setPages(json.data.links));
        } else {
          dispatch(setPosts(json.data));
        }
      } catch (e) {
          setError(e);
          console.log(e)
      }
    };
  };
  
  export const delPost = (id, authToken) => {
    return async (dispatch, getState) => {
      dispatch(setError(""));
      const res = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "DELETE",
        }
      );
  
      const json = await res.json();
  
      if (json.success == true) {
        dispatch(getPosts(authToken, -1));
      } else {
        dispatch(setError(json.message));
      }
    };
  };
  
  export const editPost = (authToken, formulari, id) => {
    return async (dispatch, getState) => {
      dispatch(startLoadingPosts());
  
      let { body, upload, latitude, longitude, visibility } =
        formulari;
  
      const formData = new FormData();
      formData.append("body", body);
      if (upload!=undefined) formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);
  
      // Enviam dades a l'aPI i recollim resultat
      const prejson = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
          body: formData,
        }
      );
      const resposta = await prejson.json();
  
      console.log(resposta);
      if (resposta.success == true) {
        dispatch(setInfo("Place Correctament Editat"));
      } else {
        dispatch(setError(resposta.message));
      }
    };
  };
  
  export const addPost = (formulari, authToken) => {
    return async (dispatch, getState) => {
      dispatch(startLoadingPosts());
      let {  body, upload, latitude, longitude, visibility } =
        formulari;
  
      const formData = new FormData();
      formData.append("body", body);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);
  
      // Enviam dades a l'aPI i recollim resultat
      const prejson = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
          body: formData,
        }
      );
      const resposta = await prejson.json();
  
      console.log(resposta);
      if (resposta.success == true) {
        dispatch(setInfo("Place Correctament Desat"));
      } else {
        dispatch(setError(resposta.message));
      }
    };
  };
  
  export const test_like = (id,authToken) => {
  
    return async (dispatch,getState) => {
      try {
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            method: "POST",
          }
        );
        const resposta = await data.json();
    
        if (resposta.success == true) {
          dispatch(setLiked(false));
          console.log("Not Liked");
          const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
              },
              method: "DELETE",
            }
          );
          const resposta = await data.json();
        } else {
          dispatch (setLiked(true));
          console.log("Liked");
        }
      } catch (e) {
        console.log("oeoeoeoe");
        console.log(e);
      }
    };
    
  
  }
  export const like = (id,authToken) => {
    return async (dispatch,getState) => {
  
  
      const likes = getState().posts.likes_count;
  
  
      try {
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            method: "POST",
          }
        );
        const resposta = await data.json();
  
        if (resposta.success == true) {
          dispatch(setLiked(true))
          dispatch (setLikes(likes + 1));
        } else {
          dispatch(setLiked(false));
          console.log("Epp, algo ha passat ");
        }
      } catch (e) {
        console.log(e);
      }
  
  
  
  
    }
  }
  
  export const unlike = (id,authToken) => {
    return async (dispatch,getState) => {
  
      const likes = getState().posts.likes_count;
  
  
      dispatch(setLiked(false));
      console.log("Not Liked");
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "DELETE",
        }
      );
      const resposta = await data.json();
      if (resposta.success == true) {
        dispatch(setLiked(false));
        dispatch (setLikes(likes - 1));
      }
  
  
    }
  }
  