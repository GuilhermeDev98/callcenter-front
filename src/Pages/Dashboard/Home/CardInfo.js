import React from 'react'
import { Stack, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { display, height } from '@mui/system';

const CardInfo = ({ title, information, icon }) => {
    const theme = useTheme();

    return (
        <Card sx={{ margin: '1%', height: '100px' }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid xs={8}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: '100%'
                    }}>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {information}
                        </Typography>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: '100%',
                        background: '#3C96EF'
                    }}>
                        {icon}
                    </div>
                </Grid>
            </Grid>


        </Card>
    );
}

export default CardInfo