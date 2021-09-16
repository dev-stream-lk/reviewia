import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { Badge, Divider, Tooltip } from "@material-ui/core";
import {
  getNotificationCount,
  getNotifications,
} from "../services/notifications";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import AddCommentIcon from "@material-ui/icons/AddComment";
import LocalPostOfficeIcon from "@material-ui/icons/LocalPostOffice";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PublicIcon from "@material-ui/icons/Public";
import {getDateTime} from '../utils/dateTime';

const useStyles = makeStyles((theme) => ({
  headerFavIcon: {
    color: "white",
    cursor:"pointer"
  },
  unreadNotifi: {
    background: "#ddf",
  },
}));

const StyledMenu = withStyles({
  paper: {
    marginTop: 20,
    border: "1px solid #d3d4d5",
    width: 400,
    maxHeight: 500,
    overflowY: "scroll",
  },
  list: {
    padding: 0,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function NotificationPanel(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [count, setCount] = useState(0);
  const { userData } = props;
  const [notifiList, setNotifiList] = useState([]);

  useEffect(() => {
    let interval = setInterval(async () => {
      let res = await getNotificationCount(userData.email);
      console.log(res);
      if (res) {
        setCount(res);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(async () => {
    let res = await getNotifications(userData.email);
    console.log(res);
    if (res) {
      setNotifiList(res);
    }
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Notifications" aria-label="add" arrow>
        <Badge
          id="headeFavIcon"
          className={classes.headerFavIcon}
          color="secondary"
          badgeContent={count}
          onClick={handleClick}
        >
          <NotificationsIcon />
        </Badge>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifiList.map((notifi, i) => {
          let markAsRead = notifi.markAsRead;
          if (notifi.type == "REVIEW") {
            return (
              <>
                <StyledMenuItem className={!markAsRead && classes.unreadNotifi}>
                  <ListItemIcon title="Review">
                    <ChatIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: {fontSize:15, whiteSpace: "normal" } }}
                    secondaryTypographyProps={{style:{fontSize:13}}}
                    primary={notifi.content}
                    secondary={getDateTime(notifi.createdAt)}
                  />
                </StyledMenuItem>
                <Divider />
              </>
            );
          } else if (notifi.type === "MESSAGE") {
            return (
              <>
                <StyledMenuItem className={!markAsRead && classes.unreadNotifi}>
                  <ListItemIcon title="Message">
                    <LocalPostOfficeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: {fontSize:15, whiteSpace: "normal" } }}
                    secondaryTypographyProps={{style:{fontSize:13}}}
                    primary="Message"
                  />
                </StyledMenuItem>
                <Divider />
              </>
            );
          } else if (notifi.type === "GROUP") {
            return (
              <>
                <StyledMenuItem className={!markAsRead && classes.unreadNotifi}>
                  <ListItemIcon title="Group Notification">
                    <GroupAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: {fontSize:15, whiteSpace: "normal" } }}
                    secondaryTypographyProps={{style:{fontSize:13}}}
                    primary="Group add"
                  />
                </StyledMenuItem>
                <Divider />
              </>
            );
          } else if (notifi.type === "LIKE") {
            return (
              <>
                <StyledMenuItem className={!markAsRead && classes.unreadNotifi}>
                  <ListItemIcon title="Like/Dislike">
                    <ThumbsUpDownIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: {fontSize:15, whiteSpace: "normal" } }}
                    secondaryTypographyProps={{style:{fontSize:13}}}
                    primary="Like DisLike"
                  />
                </StyledMenuItem>
                <Divider />
              </>
            );
          } else {
            return (
              <>
                <StyledMenuItem className={!markAsRead && classes.unreadNotifi}>
                  <ListItemIcon>
                    <PublicIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: {fontSize:15, whiteSpace: "normal" } }}
                    secondaryTypographyProps={{style:{fontSize:13}}}
                    primary="Like DisLike"
                  />
                </StyledMenuItem>
                <Divider />
              </>
            );
          }
        })}
      </StyledMenu>
    </div>
  );
}
