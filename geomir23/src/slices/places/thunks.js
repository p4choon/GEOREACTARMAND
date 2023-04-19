import {
  setInfo,
  setPlaces,
  startLoadingPlaces,
  setError,
  setPlace,
  setPages,
  setFavorites,
  setFavorited
} from "./placeSlice";

// Obtenim un sokl place
export const getPlace = (authToken, id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPlaces());

    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/places/" + id,
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

      dispatch(setPlace(resposta.data));
    } catch (e) {
      console.log(e);
      //dispatch(setError(e))
    }
  };
};
export const getPlaces = (authToken, page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPlaces());
    

  //   const searchParams = new URLSearchParams();
  // searchParams.append("type", "");
  // searchParams.append("query", "");
  // console.log(searchParams.toString()); // "type=all&query=coins"
    // Obtenim el filtre
    const state = getState();
    const filter = state.places.filter;
    console.log(filter)

    let url =
      page > 0
        ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/places";

    // let url2 = filter == undefined ? "" : filter.description
    let interrogant = page>0 ? "&" : "?"
    let description = filter.description !="" ? "description="+filter.description+"&" : ""
    let author = filter.author !="" ? "author="+filter.author : ""
    
   
    url = url + interrogant + description + author

    console.log(url)

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
      console.log(json.data);
      if (page > 0) {
        dispatch(setPlaces(json.data.collection));
        dispatch(setPages(json.data.links));
        console.log(json.data.links);
      } else {
        dispatch(setPlaces(json.data));
      }
    } catch (e) {
        setError(e);
        console.log(e)
    }
  };
};

export const delPlace = (id, authToken) => {
  return async (dispatch, getState) => {
    dispatch(setError(""));
    const res = await fetch(
      "https://backend.insjoaquimmir.cat/api/places/" + id,
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
      dispatch(getPlaces(authToken, -1));
    } else {
      dispatch(setError(json.message));
    }
  };
};

export const editPlace = (authToken, formulari, id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPlaces());

    let { name, description, upload, latitude, longitude, visibility } =
      formulari;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (upload!=undefined) formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    // Enviam dades a l'aPI i recollim resultat
    const prejson = await fetch(
      "https://backend.insjoaquimmir.cat/api/places/" + id,
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

export const addPlace = (formulari, authToken) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPlaces());
    let { name, description, upload, latitude, longitude, visibility } =
      formulari;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    // Enviam dades a l'aPI i recollim resultat
    const prejson = await fetch(
      "https://backend.insjoaquimmir.cat/api/places",
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

export const test_favourite = (id,authToken) => {

  return async (dispatch,getState) => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
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
        dispatch(setFavorited(false));
        console.log("Not Favorited");
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
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
        dispatch (setFavorited(true));
        console.log("Favorited");
      }
    } catch (e) {
      console.log("oeoeoeoe");
      console.log(e);
    }
  };
  

}
export const favorite = (id,authToken) => {
  return async (dispatch,getState) => {


    const favorites = getState().places.favorites_count;


    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
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
        dispatch(setFavorited(true))
        dispatch (setFavorites(favorites + 1));
      } else {
        dispatch(setFavorited(false));
        console.log("Epp, algo ha passat ");
      }
    } catch (e) {
      console.log(e);
    }




  }
}

export const unfavorite = (id,authToken) => {
  return async (dispatch,getState) => {

    const favorites = getState().places.favorites_count;


    dispatch(setFavorited(false));
    console.log("Not Favorited");
    const data = await fetch(
      "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
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
      dispatch(setFavorited(false));
      dispatch (setFavorites(favorites - 1));
    }


  }
}
