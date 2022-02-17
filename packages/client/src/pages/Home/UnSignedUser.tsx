import { Icon } from "@iconify/react";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { initializePitches, PitchType } from "../../state/Pitch/pitchSlice";
import { RootState } from "../../state/store";
export default memo(UnSignedUser);

function UnSignedUser() {
  const classes = useStyle();
  const pitches = useSelector((state: RootState) => state.pitch.pitches);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleClickPitches = useCallback(() => {
    navigate("/pitches");
  }, []);
  const pageMotion = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.25 } },
      exit: { opacity: 0, transition: { duration: 0.25 } },
    }),
    []
  );

  const handleSignupPage = useCallback(() => {
    navigate("/signup");  
  }, []);

  return (
    <motion.div
      className={classes.container}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
    >
      <div className={classes.thumbnail} />
      <div className={classes.header}>
        <SearchBar className={classes.search} />
        <IconButton
          className={classes.iconContainer}
          onClick={handleClickPitches}
        >
          <Typography>Pitches</Typography>
        </IconButton>
        <IconButton className={classes.iconContainer}>
          <Icon className={classes.icon} icon="bi:filter" />
        </IconButton>
        <IconButton className={classes.iconContainer}>
          <Icon
            className={classes.icon}
            icon="mdi:logout"
            onClick={handleSignupPage}
          />
        </IconButton>
      </div>
      {/* {pitches?.map((e) => (
        <ButtonBase className={classes.iconButton}>
          <PitchListItem {...e} />
        </ButtonBase>
      ))} */}
    </motion.div>
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
  iconContainer: {
    borderRadius: 8,
  },
}));
