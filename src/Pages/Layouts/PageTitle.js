import React from "react";
import Typography from '@mui/material/Typography';

const PageTitle = ({ title }) => {
    return (
        title && <Typography variant="h6" component="h2" style={{ fontSize: "1rem", fontWeight: 'bold' }}>
            {title}
        </Typography>
    )
}

export default PageTitle