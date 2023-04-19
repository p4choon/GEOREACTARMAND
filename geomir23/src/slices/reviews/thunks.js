import { setAdd, setError, setReviews, setReviewsCount, startLoadingReviews } from "./reviewSlice";

export const getReviews = (page = 0, id, authToken, usuari = "") => {
    return async (dispatch, getState) => {

        dispatch(startLoadingReviews());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews"

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log(resposta.data.filter( v => v.user.email === usuari ))
            console.log(usuari)
            console.log(resposta.data)
            resposta.data.filter( v => v.user.email === usuari ).length > 0 ? dispatch(setAdd(false)) : dispatch(setAdd(true))
            dispatch(setReviews(resposta.data));
            dispatch(setReviewsCount(resposta.data.length))
            console.log(resposta.data.filter( v => v.user.email === usuari ))

        }
        else {
            dispatch(setError(resposta.message));
        }

        // el posem a true per a evitar que si no hi ha comentaris
        // de ningú no entri al bucle segünt i per tant
        // no activi el formulari ReveiwAdd
        // dispatch(setAdd(true));

        // resposta.data.map((v) => {
        //     if (v.user.email === usuari)   dispatch(setAdd(false)); 
        // });

        // O bé emprem filter i amb una epxressió ternària tenim el mateix i més compacte 
        
    };
}

export const delReview = (review, authToken) => {
    return async (dispatch, getState) => {


        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" +
            review.place.id +
            "/reviews/" +
            review.id,
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

        console.log(resposta);
        if (resposta.success == true) {

            dispatch(setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            //dispatch(getReviews(0, review.place.id, authToken))
            const state = getState()
            //dispatch(setReviewsCount(state.reviews.reviewsCount - 1));
        }


    };
};

export const addReview = (review, id, authToken) => {
    return async (dispatch, getState) => {

        let data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: JSON.stringify( review )
        })
        let resposta = await data.json()
        if (resposta.success == true) {
            dispatch(setAdd(false));
            //dispatch(getReviews(0, id, authToken))
            const state = getState()
            //dispatch(setReviewsCount(state.reviews.reviewsCount + 1));

        }
        else {
            dispatch(setError(resposta.message));
        }
    }
}

