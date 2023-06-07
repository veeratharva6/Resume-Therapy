import CardContent from "@mui/material/CardContent";

import { Button, CardActionArea, CardActions } from "@mui/material";

import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// Might need to change card actions
// ----------------------------------------------------------------------

ConnectionsWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function ConnectionsWidget({
  title,
  total = 0,
  bio,
  icon,
  color = "primary",
  sx,
  popUpHandle,
  connecto,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "left",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {/* <StyledIcon
        sx={{
          
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon> */}

      {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => popUpHandle(connecto)} variant="outlined">
          View Info
        </Button>
      </CardActions>
    </Card>
  );
}
