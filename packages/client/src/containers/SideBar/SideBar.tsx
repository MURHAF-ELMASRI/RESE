import makeStyle from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import { motion } from "framer-motion";
import { memo } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../src/components/Avatar";
import { RootState } from "../../src/state/store";
import Item from "./Item";

const navItems = [
  {
    icon: "mdi:calendar-multiselect",
    title: "Reservations",
    path: "/reservations",
  },
  { icon: "mdi:cog", title: "Settings", path: "/settings" },
  { icon: "mdi:logout", title: "Sign Out", path: "/signout" },
  { icon: "mdi:information", title: "Info", path: "/info" },
] as const;

const WIDTH = 308;

function SideBar() {
  const user = useSelector((state: RootState) => state.user.user);
  const classes = useStyle();
  const isSideBarOpen = useSelector(
    (state: RootState) => state.ui.isSideBarOpen
  );
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up("sm"));

  if (!user) {
    return null;
  }

  return (
    <motion.div
      className={classes.container}
      animate={{ x: isSideBarOpen && !breakpoint ? -WIDTH : 0 }}
      transition={{ ease: "anticipate", duration: 1 }}
      // variants={transition}
    >
      <div className={classes.header}>
        <Avatar src={"https://avatars.dicebear.com/api/micah/jejeiiwllf.svg"} />
        <Typography component={"h6"} className={classes.fullName}>
          {user.fullName}
        </Typography>
      </div>
      <div className={classes.body}>
        {navItems.map(({ title, icon, path }, idx) => (
          <Item icon={icon} title={title} path={path} key={idx} />
        ))}
      </div>
    </motion.div>
  );
}

export default memo(SideBar);

const useStyle = makeStyle((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    border: `1px solid ${theme.palette.divider}`,
    height: "100%",
    width: WIDTH,
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },
  },
  header: {
    background: `linear-gradient(180deg, #A8FF78 0%, #2EC086 100%);`,
    boxShadow: `0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.2);`,
    height: 152,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 8,
  },
  fullName: {
    fontWeight: 500,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
  },
}));
