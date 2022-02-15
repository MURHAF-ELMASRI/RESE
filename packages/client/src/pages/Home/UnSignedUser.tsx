import makeStyles from "@material-ui/core/styles/makeStyles";
import { Icon } from "@iconify/react";
import { memo, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import IconButton from "@material-ui/core/IconButton";
import PitchListItem from "../../components/PitchListItem";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios, { AxiosResponse } from "axios";
import { ResponseType } from "axios";
import { initializePitches, PitchType } from "../../state/Pitch/pitchSlice";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";

export default memo(UnSignedUser);

function UnSignedUser() {
  const classes = useStyle();
  const pitches = useSelector((state: RootState) => state.pitch.pitches);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/pitches/")
      .then(
        (response: AxiosResponse<{ pitches: PitchType[] }>) => response.data
      )
      .then((data) => {
        dispatch(initializePitches(data.pitches));
      })
      .catch((e) => {
        //TODO: show error to user using alert in mui
        console.log(e.message);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.thumbnail} />
      <div className={classes.header}>
        <SearchBar className={classes.search} />
        <IconButton>
          <Icon className={classes.icon} icon="bi:filter" />
        </IconButton>
        <IconButton>
          <Icon className={classes.icon} icon="mdi:logout" />
        </IconButton>
      </div>
      {pitches?.map((e) => (
        <ButtonBase className={classes.iconButton}>
          <PitchListItem {...e} />
        </ButtonBase>
      ))}
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  thumbnail: {
    width: "100%",
    height: 8,
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    display: "flex",
    width: "100%",
    boxShadow: theme.shadows[1],
  },
  search: {
    marginRight: "auto",
  },
  icon: {
    color: theme.palette.text.primary,
  },
  iconButton: {
    maxWidth: 464,
    justifyContent: "start",
  },
}));
