import React from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "../Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  links: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));
function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const closehandler = () => {
    setOpenDrawer(false);
  };
  return (
    <div>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            Navigation Bar
          </Typography>
          <div className={classes.navlinks}>
            {isMobile ? (
              <DrawerComponent openDrawer={openDrawer} close={closehandler} />
            ) : (
              <>
                <Link to="/" className={classes.links}>
                  Home
                </Link>
                <Link to="/about" className={classes.links}>
                  About
                </Link>
                <Link to="/contact" className={classes.links}>
                  Contacts
                </Link>
                <Link to="/faq" className={classes.links}>
                  FAQ
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
