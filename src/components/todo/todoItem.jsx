'use client';

import React from 'react';
import { Checkbox, Grid, List, ListItem } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

export default function TodoItem(/*{ item }*/) {
  const item = EXAMPLE_WORKOUT1;
  return (
    <Grid container sx={{ mb: 1 }}>
      <Grid item xs={'auto'}>
        <Checkbox checked={item.done ? true : false} />
      </Grid>
      <Grid item xs={10}>
        <Accordion>
          <AccordionSummary>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography>{item.title}</Typography>
              <Typography>{item.sets.length} sets</Typography>
            </div>
            <PopupState variant="popover">
              {(popupState) => (
                <React.Fragment>
                  <MoreVertIcon {...bindTrigger(popupState)} />
                  <Menu {...bindMenu(popupState)} sx={{ paddingY: 0 }}>
                    <MenuList dense sx={{ paddingY: 0 }}>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          // postTodoDupliicate(item._id)
                        }}
                      >
                        복제
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          // putTodoEdit(item._id)
                        }}
                      >
                        편집
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          // postTodoDelete(item._id)
                        }}
                      >
                        삭제
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingY: 0 }}>
            <List>
              {item.sets.map((value, idx) => {
                return (
                  <ListItem key={idx}>
                    {idx + 1}st : {value.intensity}
                    {item.aerobic ? ' km ' : ' kg '}
                    {value.time}
                    {item.aerobic ? ' 시간 ' : ' 회 '}
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

// 운동 예시 오브젝트
const EXAMPLE_WORKOUT1 = {
  _id: 'ididiid',
  userId: '1',
  title: '벤치프레스',
  date: '2021-10-10',
  aerobic: false,
  done: true,
  sets: [
    {
      intensity: 30,
      time: 10,
    },
    {
      intensity: 40,
      time: 8,
    },
    {
      intensity: 50,
      time: 6,
    },
  ],
};
