import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import {
  Marker,
  Popup,
  useMapEvents,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import { PostsMenu } from "./PostsMenu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addPost } from "../slices/posts/thunks";

export const PostsAdd = ({ setAfegir }) => {
  let { authToken } = useContext(UserContext);

  const dispatch = useDispatch();
  const { info, error, isLoading } = useSelector((state) => state.posts);

  const navigate = useNavigate();

  const [position, setPosition] = useState(null);
  let [formulari, setFormulari] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue("latitude", pos.coords.latitude);
      setValue("longitude", pos.coords.longitude);

      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
  }, []);

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        console.log(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   if (e.target.type && e.target.type==="file") {
  //     console.log(e.target.files[0].name);
  //     setFormulari({
  //       ...formulari,
  //       [e.target.name]: e.target.files[0],
  //     });
  //   } else {
  //     // Canviem l'element de l'objecte de l'estat
  //     setFormulari({
  //       ...formulari,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };
  const afegir = (data) => {
    //e.preventDefault();

    const data2 = { ...data, upload: data.upload[0] };

    dispatch(addPost(data2, authToken));

    // let { name, description, upload, latitude, longitude, visibility } =
    //   formulari;

    // console.log(upload)

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("upload", upload);
    // formData.append("latitude", latitude);
    // formData.append("longitude", longitude);
    // formData.append("visibility", visibility);

    // console.log("Afegint un Lloc....");
    // console.log(formulari);
    // console.log(
    //   JSON.stringify({
    //     name,
    //     description,
    //     upload,
    //     latitude,
    //     longitude,
    //     visibility,
    //   })
    // );
    // // Enviam dades a l'aPI i recollim resultat
    // fetch("https://backend.insjoaquimmir.cat/api/places", {
    //   headers: {
    //     Accept: "application/json",
    //     //'Content-type': 'multipart/form-data',
    //     Authorization: "Bearer " + authToken,
    //   },
    //   method: "POST",
    //   // body: JSON.stringify({ name,description,upload,latitude,longitude,visibility })
    //   body: formData,
    // })
    //   .then((data) => data.json())
    //   .then((resposta) => {
    //     console.log(resposta);
    //     if (resposta.success == true) {
    //       console.log(authToken);
    //       setAfegir(false); // Tornem al llistat
    //       navigate(-1)

    //     } else {
    //       console.log("S'ha produit un error");
    //     }
    //   });
  };

  // const tornar = (e) => {
  //   e.preventDefault();
  //   setAfegir(false);
  // };

  return (
    <>
      <div className="py-9 pl-9">
        {/* <form method="post" action="" enctype="multipart/form-data"> */}
        {/* <div className="py-9 flex flex-col gap-y-2">
          <label className="text-gray-600" htmlFor="Name">
            Nom
          </label>
          <input
            type="text"
            value={formulari.name}
            name="name"
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            onChange={handleChange}
          />
        </div> */}

        {/* <div className="py-9 flex flex-col gap-y-2"> */}

        <div className="w-1/3">
          <label className="text-gray-600">Body</label>
          <textarea
            {...register("body", {
              required: "El cos del post és obligatori",
              maxLength: {
                value: 255,
                message: "La longitud màxima és de 255 caràcters",
              },
            })}
            // name="description"
            // value={formulari.description}
            className=" w-full  h-32 px-4 py-3 border-2 border-gray-300 rounded-sm¡  outline-none focus:border-blue-400 "
            placeholder="Explica'ns alguna cosa d'aquest lloc..."
            // onChange={handleChange}
          ></textarea>

          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <label
                htmlFor="formFile"
                className="form-label inline-block mb-2 text-gray-600"
              >
                Imatge PNG, JPG or GIF (MAX. 800x400px)
              </label>
              <input
                {...register("upload", {
                  required: "El fitxer és obligatòri",
                })}
                // name="upload"
                // value={formulari.upload}
                // onChange={handleChange}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="upload"
              />
            </div>
          </div>

          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">
              Longitud
            </label>
            <input
              {...register("longitude", {
                required: "La longitud és obligatòria",
              })}
              type="text"
              // name="longitude"
              // value={formulari.longitude}
              // onChange={handleChange}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </span>
          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">
              Latitud
            </label>
            <input
              {...register("latitude", {
                required: "La latitud és obligatòria",
              })}
              type="text"
              // name="latitude"
              // value={formulari.latitude}
              // onChange={handleChange}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </span>

          <label
            htmlFor="visibility"
            className="block mb-2 text-sm text-gray-600 dark:text-white"
          >
            Selecciona la visibilitat
          </label>
          <select
            {...register("visibility", {
              required: "La visibilitat és obligatòria",
            })}
            // value={formulari.visibility}
            // name="visibility"
            id="visibility"
            // onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue value="">
              ----
            </option>
            <option value="1">Public</option>
            <option value="2">Contactes</option>
            <option value="3">Privat</option>
          </select>
          <div className="py-9">
            <button
              onClick={handleSubmit(afegir)}
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Afegir Entrada
            </button>
          </div>
        </div>
        {/* </form> */}
        <MapContainer
          style={{ height: 280 }}
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
};
