import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Box, Button, ButtonGroup } from '@mui/material';
import Link from 'next/link';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OverlayButtons(props) {
  return (
    <Box
      sx={{
        width: 1,
        height: 'auto',
        top: 0,
        left: 0,
        marginTop: 2,
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& *': {
          color: 'white',
          size: 'large',
        },
      }}
    >
      <Box // 왼쪽 상단 아이콘들
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 0.5,
          height: 'auto',
        }}
      >
        <Button>
          <Link href="/selectpic">
            <NavigateBeforeIcon
              fontSize="large"
              stroke={'lightgray'}
              strokeWidth={0.5}
            ></NavigateBeforeIcon>
          </Link>
        </Button>
      </Box>
      <Box // 오른쪽 상단 아이콘들
        sx={{
          width: 0.5,
          height: 'auto',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row-reverse',
          marginRight: 2,
        }}
      >
        <Button>
          <FitnessCenterIcon
            stroke={'lightgray'}
            strokeWidth={0.5}
            fontSize="medium"
          ></FitnessCenterIcon>
        </Button>
        <Button>
          <DeleteIcon
            stroke={'lightgray'}
            strokeWidth={0.5}
            fontSize="medium"
            onClick={props.handleDeleteButton}
          ></DeleteIcon>
          <Snackbar
            open={props.triggerBgDelete}
            autoHideDuration={3000}
            onClose={props.handleBgErrorClose}
          >
            <Alert
              onClose={props.handleBgErrorClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              배경은 삭제 할 수 없습니다.
            </Alert>
          </Snackbar>
        </Button>
      </Box>
    </Box>
  );
}
