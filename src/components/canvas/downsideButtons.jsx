import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button } from '@mui/material';

export default function downSideButtons(props) {
  return (
    <Box // 하단 버튼
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: 0.8,
        height: 0.05,

        p: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        component="label"
        sx={{
          width: 1,
          height: 'auto',
          borderRadius: 5,
        }}
      >
        <DownloadIcon
          sx={{
            color: 'white',
          }}
          onClick={props.handleSaveImage}
        ></DownloadIcon>
      </Button>
    </Box>
  );
}
