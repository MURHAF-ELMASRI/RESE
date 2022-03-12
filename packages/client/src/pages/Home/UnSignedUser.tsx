import { Icon } from "@iconify/react";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { PitchType } from "@rese/client-server/model/pitchModel";
import Filter from "@rese/client/src/components/Filter";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import PitchListItem from "../../components/PitchListItem";
import { initializePitches } from "../../state/Pitch/pitchSlice";
import { RootState } from "../../state/store";
import { pageTransition } from "../../util/const";

export default memo(UnSignedUser);


function UnSignedUser() {
  const classes = useStyle();
  const pitches = useSelector((state: RootState) => state.pitch.pitches);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFilterOpen, toggleFilter] = useToggle(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pitches/`)
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

  const handleFilter = useCallback((filteredDate) => {
    console.log(filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    navigate("/login");
  }, []);

  return (
    <motion.div
      className={classes.container}
      {...pageTransition}
    >
      <motion.div
        className={classes.filterContainer}
        transition={{ duration: 0.3 }}
        animate={{
          opacity: isFilterOpen ? 1 : 0,
          y: isFilterOpen ? 0 : -400,
        }}
      >
        <Filter
          allPitches={pitches}
          isOpen={isFilterOpen}
          onClose={() => toggleFilter(false)}
          onFilter={handleFilter}
        />
      </motion.div>

      <div className={classes.thumbnail} />
      <div className={classes.header}>
        <div className={classes.searchContainer}>
          <TextField
            name={"search"}
            onChange={handleSignupPage}
            label={"search"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    className={classes.icon}
                    icon="mdi:magnify"
                    width={24}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <IconButton
          className={classes.iconContainer}
          onClick={handleClickPitches}
        >
          <Typography>Pitches</Typography>
        </IconButton>

        <IconButton
          className={classes.iconContainer}
          onClick={() => toggleFilter(true)}
        >
          <Icon className={classes.icon} icon="bi:filter" />
        </IconButton>

        <IconButton
          className={classes.iconContainer}
          onClick={handleSignupPage}
        >
          <Icon className={classes.icon} icon="mdi:login" />
        </IconButton>
      </div>
      {pitches?.map((e) => (
        <ButtonBase className={classes.iconButton}>
          <PitchListItem data={e} />
        </ButtonBase>
      ))}
    </motion.div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
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
  searchContainer: { padding: 8, marginRight: "auto" },
  filterContainer: {
    position: "absolute",
    right: 0,
    top: 3,
    zIndex: 99,
  },
}));
