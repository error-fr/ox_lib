import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 350,
    height: 10,
    border: '1px solid #42484e',
    borderRadius: '7px',
    backgroundColor: '#212529',
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px', // Ajout d'un écart sous le label
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '100%',
    backgroundColor: 'rgb(173, 181, 189)',
    borderRadius: '7px',
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 350,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    background: '#ccc',
    margin: '0px 0px 20px 0px',
    maxWidth: 350,
    padding: '1px 8px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '17px',
    color: '#212529',
    fontWeight: 'bold',
    borderRadius: '5px',
    borderBottom: '3px solid #777',
    marginRight: '3px',
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
            <Box className={classes.labelWrapper}>
              <Text className={classes.label}>{label}</Text>
            </Box>
          <Box className={classes.container}>
            <Box
              className={classes.bar}
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
                animationTimingFunction: 'ease-in-out', // You can modify the timing function
                width: '100%', // Ensure the bar spans the container width
              }}
            />
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
