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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import GroupIcon from "@material-ui/icons/Group";
import PublicIcon from "@material-ui/icons/Public";
import { getDateTime } from "../utils/dateTime";
import { getReviewById } from "../services/reviews";
import { useHistory } from "react-router-dom";
import { PreLoader } from "./basic/PreLoader";
import { getGroupData } from "../services/instantGroups";
import { markAsRead } from "../services/notifications";

const useStyles = makeStyles((theme) => ({
  headerFavIcon: {
    color: "white",
    cursor: "pointer",
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
    maxHeight: "60vh",
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
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const getCount = async () => {
    let res = await getNotificationCount(userData.email);
    if (res) {
      setCount(res);
    }
  };

  useEffect(() => {
    getCount();
    let interval = setInterval(async () => {
      await getCount();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(async () => {
    setLoading(true);
    let res = await getNotifications(userData.email);
    if (res) {
      setNotifiList(res);
    }
    setLoading(false);
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToReview = async (notifi) => {
    setLoading(true);
    let res = await getReviewById(notifi.targetId);
    if (res) {
      let mark = await markAsRead(notifi.id);
      history.push(`/product/view/${res["postId"]}`);
    }
    handleClose();
    setLoading(false);
  };

  const handleGoToPost = (notifi) => {
    handleClose();
    history.push(`/product/view/${notifi.targetId}`);
  };

  const handleGoToGroup = async (notifi) => {
    setLoading(true);
    let res = await getGroupData(notifi.targetId);
    if (res) {
      let mark = await markAsRead(notifi.id);
      history.push(`/product/instantGroup/${res.postId}/${notifi.targetId}`);
    }
    handleClose();
    setLoading(false);
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
      <div style={{ position: "relative" }}>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <PreLoader loading={loading} />
          {notifiList.map((notifi, i) => {
            let markAsRead = notifi.markAsRead;
            if (notifi.type == "REVIEW") {
              return (
                <>
                  <StyledMenuItem
                    onClick={() => handleGoToReview(notifi)}
                    className={!markAsRead && classes.unreadNotifi}
                  >
                    {notifi.content.search("disliked") === -1 ? (
                      <ListItemIcon title="Review liked">
                        <ThumbUpIcon fontSize="small" />
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon title="Review disliked">
                        <ThumbDownIcon fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primaryTypographyProps={{
                        style: { fontSize: 15, whiteSpace: "normal" },
                      }}
                      secondaryTypographyProps={{ style: { fontSize: 13 } }}
                      primary={notifi.content}
                      secondary={getDateTime(notifi.createdAt)}
                    />
                  </StyledMenuItem>
                  <Divider />
                </>
              );
            } else if (notifi.type === "GROUP") {
              return (
                <>
                  <StyledMenuItem
                    onClick={() => handleGoToGroup(notifi)}
                    className={!markAsRead && classes.unreadNotifi}
                  >
                    <ListItemIcon title="Instant Group Notification">
                      <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        style: { fontSize: 15, whiteSpace: "normal" },
                      }}
                      secondaryTypographyProps={{ style: { fontSize: 13 } }}
                      primary={notifi.content}
                      secondary={getDateTime(notifi.createdAt)}
                    />
                  </StyledMenuItem>
                  <Divider />
                </>
              );
            } else if (notifi.type === "POST") {
              return (
                <>
                  <StyledMenuItem
                    onClick={() => handleGoToPost(notifi)}
                    className={!markAsRead && classes.unreadNotifi}
                  >
                    <ListItemIcon title="New Review">
                      <ChatIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        style: { fontSize: 15, whiteSpace: "normal" },
                      }}
                      secondaryTypographyProps={{ style: { fontSize: 13 } }}
                      primary={notifi.content}
                      secondary={getDateTime(notifi.createdAt)}
                    />
                  </StyledMenuItem>
                  <Divider />
                </>
              );
            } else if (notifi.type === "USER") {
              return (
                <>
                  <StyledMenuItem
                    className={!markAsRead && classes.unreadNotifi}
                  >
                    <ListItemIcon title="Like/Dislike">
                      <ChatIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        style: { fontSize: 15, whiteSpace: "normal" },
                      }}
                      secondaryTypographyProps={{ style: { fontSize: 13 } }}
                      primary={notifi.content}
                      secondary={getDateTime(notifi.createdAt)}
                    />
                  </StyledMenuItem>
                  <Divider />
                </>
              );
            } else {
              return (
                <>
                  <StyledMenuItem
                    className={!markAsRead && classes.unreadNotifi}
                  >
                    <ListItemIcon>
                      <PublicIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        style: { fontSize: 15, whiteSpace: "normal" },
                      }}
                      secondaryTypographyProps={{ style: { fontSize: 13 } }}
                      primary={notifi.content}
                      secondary={getDateTime(notifi.createdAt)}
                    />
                  </StyledMenuItem>
                  <Divider />
                </>
              );
            }
          })}
        </StyledMenu>
      </div>
    </div>
  );
}
