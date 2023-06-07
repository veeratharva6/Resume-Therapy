// import * as React from 'react';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

// const StyledIcon = styled('div')(({ theme }) => ({
//     margin: 'auto',
//     display: 'flex',
//     borderRadius: '50%',
//     alignItems: 'center',
//     width: theme.spacing(8),
//     height: theme.spacing(8),
//     justifyContent: 'center',
//     marginBottom: theme.spacing(3),
//   }));
  
//   // ----------------------------------------------------------------------
  
//   ReviewerWidget.propTypes = {
//     color: PropTypes.string,
//     icon: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     bio: PropTypes.string.isRequired,
//     total: PropTypes.number.isRequired,
//     sx: PropTypes.object,
//   };
// export default function ReviewerWidget({ title, total, bio, icon, color = 'primary', sx, ...other }) {
//   return (
//     <Card sx={{  py: 5,
//         boxShadow: 0,
//         textAlign: 'center',
//         color: (theme) => theme.palette[color].darker,
//         bgcolor: (theme) => theme.palette[color].lighter,
//         ...sx, }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg"
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }



// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Iconify from '../../component/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

ReviewerWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function ReviewerWidget({ title, total, bio, icon, color = 'primary', button, userid, reviewerid, removeFunc,sx, ...other }) {
  
  const handleButton = (user, reviewer) => {
    button(user, reviewer);
    removeFunc(reviewer);
  }
  
  return (
    <Card
      sx={{ 
        py: 5,
        boxShadow: 0,
        textAlign: 'left',
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

      <CardActionArea>
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
            <Button variant="outlined" onClick={() => { handleButton(userid, reviewerid)}}>Connect</Button>
        </CardActions>

      </CardActionArea>

     
    

    </Card>
  );
}

