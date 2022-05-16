import React, { useState, useEffect, Component } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../Styles/map.css"

const containerStyle = {
  width: "2800px",
  height: "1450px",
};

const center = {
  lat: 62.893335,
  lng: 27.679338,
};


function Map() {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState([]);
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [value, setValue] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [map, setMap] = React.useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBwV9cP23uKvQ9wLcnfc7zIIma3XMo_cGA",
  });
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function getMarkers() {
    axios
      .get("http://localhost:5000/kartta1")
      .then(function (response) {
        setCoordinates(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function saveMarker() {
    axios
      .post("http://localhost:5000/kartta2", {
        latitude,
        longitude,
        value,
      })
      .then((res) => {
        console.log(res);
        getMarkers();
      });
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function saveData() {
    saveMarker();
    setOpen(false);
  }
  function handleClickOpen2() {
    setOpen2(true);
  }

  function handleClose2() {
    setSelectedMarker(null);
    setOpen2(false);
  }

  useEffect(() => {
    getMarkers();
    
  }, []);

  return isLoaded ? (
    <div className="Karttasivu">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tallenna koordinaatti</DialogTitle>
        <DialogContent>
          <DialogContentText>Leveys: {latitude}</DialogContentText>
          <DialogContentText>Korkeu: {longitude}</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Anna tähän haluamasi tieto"
            type="email"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toString());
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Takaisin</Button>
          <Button onClick={saveData}>Tallenna</Button>
        </DialogActions>
      </Dialog>

      {selectedMarker && (
        <Dialog open={open2} onClose={handleClose2}>
          <DialogTitle>id: {selectedMarker.id_kartta}</DialogTitle>
          <DialogContent>
            <DialogContentText>{selectedMarker.data_kartta}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>Takaisin</Button>
          </DialogActions>
        </Dialog>
      )}
      
        <div className="Kartta">
        <GoogleMap
          zoom={13}
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => {
            setLatitude(e.latLng.lat().toString());
            setLongitude(e.latLng.lng().toString());
            handleClickOpen();
          }}
        >
          {coordinates.map((coordinate) => (
            <Marker
              key={coordinate.id_kartta}
              position={{
                lat: parseFloat(coordinate.lat_kartta),
                lng: parseFloat(coordinate.lng_kartta),
              }}
              onClick={() => {
                setSelectedMarker(coordinate);
                handleClickOpen2();
              }}
            />
          ))}
          <></>
        </GoogleMap>
      </div>
      
      
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);

/*
saveMarker(e.latLng.lat().toString(),e.latLng.lng().toString());
*/
