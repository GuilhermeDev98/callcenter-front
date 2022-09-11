import  React from 'react'
import {Box} from "@mui/system";
import {Grid} from "@mui/material";
import Roles from "./Roles";
import Teams from "./Teams";

const Workplace = () => {
    return (
        <Box>
            <Grid container>
                <Grid xs={6} padding={1}>
                    <Teams/>
                </Grid>
                <Grid xs={6} padding={1}>
                    <Roles/>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Workplace