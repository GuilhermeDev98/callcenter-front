import React from "react";

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemIcon from '@mui/material/ListItemIcon';


import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { Link } from "react-router-dom";



const Sidebar = () => {
    return (
        <List>
            <Link to="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px',  }}>
                    <ListItemIcon style={{ background: '' }}>
                        <DashboardIcon style={{ color: 'white' }}/>
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white', fontSize: '5px'}} primary="Dashboard" />
                </ListItem>
            </Link>
            
            <Link to="/dashboard/permissions" style={{textDecoration: 'none'}}>
                <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px',  }}>
                    <ListItemIcon style={{ background: '' }}>
                        <AccountTreeIcon style={{ color: 'white' }}/>
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white', fontSize: '5px'}} primary="Permissões" />
                </ListItem>
            </Link>

            <Link to="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem style={{ background: '#3C96EF', borderRadius: '10px', marginTop: '10px',  }}>
                    <ListItemIcon style={{ background: '' }}>
                        <DashboardIcon style={{ color: 'white' }}/>
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white', fontSize: '5px'}} primary="Dashboard" />
                </ListItem>
            </Link>
        </List>
    )
}

export default Sidebar