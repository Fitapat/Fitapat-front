'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Input } from '@mui/base';

export default function() {
    return (
        <Box>
            <h1>운동 To-do</h1>
            <Button variant="contained" fullWidth={true}>
                운동 To-do 추가
            </Button>
        </Box>
    );
}