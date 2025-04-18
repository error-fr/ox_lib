import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    borderTop: '1px solid #42484e',
    borderRight: '1px solid #42484e',
    borderLeft: '1px solid #42484e',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    backgroundColor: '#212529',
    height: 60,
    width: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
