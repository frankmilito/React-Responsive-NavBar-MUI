import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";
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
    color: "#000",
    fontSize: "20px",
    width: "100%",
    // padding: "1em",
    // margin: "10px 0",
    "&:hover": {
      color: "#fff",
    },
  },
  drawer: {
    width: "400px",
  },
  listItems: {
    "&:hover": {
      background: "#000",
      color: "#fff",
    },
  },
}));

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className={classes.drawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List style={{ margin: "0", padding: "0" }}>
          <ListItem className={classes.listItems}>
            <ListItemText>
              <Link to="/" className={classes.links}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            className={classes.listItems}
          >
            <ListItemText>
              <Link to="/about" className={classes.links}>
                About
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            className={classes.listItems}
          >
            <ListItemText>
              <Link to="/contact" className={classes.links}>
                Contact
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            className={classes.listItems}
          >
            <ListItemText>
              <Link to="/faq" className={classes.links}>
                FAQ
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
