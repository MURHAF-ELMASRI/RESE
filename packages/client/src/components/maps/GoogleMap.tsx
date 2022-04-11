import makeStyles from "@material-ui/core/styles/makeStyles";
import { PitchType } from "@rese/client-server/model/Pitch";
import GoogleMapReact from "google-map-react";
import React, { memo } from "react";
import Marker from "./Marker";

//TODO :set this value dynamically according to the location of user
const ELAIZG_COORDS = { lat: 38.6713, lng: 39.203899 };

interface Props {
  pitches: (
    | Pick<PitchType, "name" | "_id" | "location">
    | Pick<PitchType, "location">
  )[];
  onClick?: (x: { lng: number; lat: number }) => void;
}

function GoogleMap(props: Props) {
  const { pitches, onClick } = props;
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAP_KEY!,
        }}
        defaultZoom={10}
        defaultCenter={ELAIZG_COORDS}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps, places)}
        onClick={onClick}
      >
        {pitches.map((pitch, idx) => (
          <Marker
            key={(pitch as { _id: string })._id! ?? idx}
            text={(pitch as { name: string }).name}
            lat={pitch.location.lat}
            lng={pitch.location.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default memo(GoogleMap);

const useStyle = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
  },
}));
