'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Input } from '@mui/base';
import Modal from 'react-modal';

export default function() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Box>
            <h1>운동 To-do</h1>
            <Button variant="contained" fullWidth={true} onClick={openModal}>
                운동 To-do 추가
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <Input placeholder="운동 이름 입력"></Input>
                <Button variant="contained" fullWidth={true} onClick={closeModal}>세트 추가</Button>
            </Modal>
        </Box>
    );
}