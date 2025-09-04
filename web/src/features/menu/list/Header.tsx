import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme, params: { bannerIcon?: string }) => ({
  container: {
    textAlign: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: params.bannerIcon ? 'transparent' : 'rgba(8, 8, 10, 0.98)',
    backgroundImage: params.bannerIcon ? `url(${params.bannerIcon})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backdropFilter: 'blur(15px)',
    border: '2px solidrgb(27, 23, 19)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    height: 80,
    width: 420,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: 3,
    '&::before': params.bannerIcon ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      zIndex: 1,
    } : {},
  },
  bannerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    position: 'relative',
    zIndex: 2,
  },
  bannerIcon: {
    display: 'none', // Caché car maintenant utilisé comme fond
  },
  banner: {
    fontSize: 10,
    fontWeight: 400,
    color: '#f97316',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.9,
    position: 'relative',
    zIndex: 2,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
  },
  heading: {
    fontSize: 37,
    fontWeight: 500,
    color: '#f1f5f9',
    letterSpacing: '0.25px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.95,
    position: 'relative',
    zIndex: 2,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
  },
  separator: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: '2px 0',
    position: 'relative',
    zIndex: 2,
  },
}));

interface HeaderProps {
  title: string;
  banner?: string;
  bannerIcon?: string;
}

const Header: React.FC<HeaderProps> = ({ title, banner, bannerIcon }) => {
  const { classes } = useStyles({ bannerIcon });

  return (
    <Box className={classes.container}>
      {banner && (
        <>
          <Box className={classes.bannerContainer}>
            <Text className={classes.banner}>{banner}</Text>
          </Box>
          <Box className={classes.separator} />
        </>
      )}
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
