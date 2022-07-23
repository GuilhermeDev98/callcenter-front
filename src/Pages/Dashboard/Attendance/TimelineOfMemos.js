import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const TimelineOfMemos = ({ AttendanceId }) => {

  const [LoadingMemos, SetLoadingMemos] = useState(true)
  const [Memos, SetMemos] = useState()

  const getAllMemos = async () => {
    try {
      const { data } = await Api.get(`memos/${AttendanceId}`)
      SetMemos(data)
      SetLoadingMemos(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllMemos()
  }, [])

  return <>
    {LoadingMemos && <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" component="h2">
        Carregando Memorandos
      </Typography>
      <LinearProgress />
    </Box>}
    {Memos && <Timeline position="alternate">
      {Memos.map(row => (
        <TimelineItem key={row.id}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {row.created_at}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <TextSnippetIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              {row.creator.name.split(' ')[0]} - {row.creator.id}
            </Typography>
            <Typography fontSize={14}>{row.description}</Typography>
            <div sx={{ textAlign: 'center' }}>
              <ButtonGroup >
                <Tooltip title="NomeDoArquvio.pdf">
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>}
  </>
}

export default TimelineOfMemos