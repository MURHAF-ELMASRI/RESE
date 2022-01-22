import makeStyles from "@material-ui/core/styles/makeStyles";
import { Icon } from "@iconify/react";
import { memo } from "react";
import SearchBar from "../../components/SearchBar";
import IconButton from "@material-ui/core/IconButton";
import PitchListItem from "../../components/PitchListItem";
import ButtonBase from "@material-ui/core/ButtonBase";

export default memo(UnSignedUser);

const Data = [
  {
    name: "Laliga",
    startDate: "15:15",
    endDate: "15:15",
    features: ["closed", "treat", "service", "counter"],
  },
  {
    name: "Sporyum",
    startDate: "15:15",
    endDate: "15:15",
    features: ["closed", "treat", "service", "counter"],
  },

  {
    name: "Turkuaz",
    startDate: "15:15",
    endDate: "15:15",
    features: ["closed", "treat", "service", "counter"],
  },
];

function UnSignedUser() {
  const classes = useStyle();
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
      {Data.map((e) => (
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
