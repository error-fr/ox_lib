import { Box, createStyles, Group, Progress, Stack, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import CustomCheckbox from './CustomCheckbox';
import type { MenuItem } from '../../../typings';
import { isIconUrl } from '../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../components/LibIcon';

interface Props {
  item: MenuItem;
  index: number;
  scrollIndex: number;
  checked: boolean;
}

const useStyles = createStyles((theme, params: { iconColor?: string }) => ({
  buttonContainer: {
    backgroundColor: 'rgba(12, 12, 18, 0.94)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    padding: 0,
    height: 48,
    scrollMargin: 6,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    backdropFilter: 'blur(8px)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(249, 115, 22, 0.02))',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: 0,
    },
    '&:hover': {
      backgroundColor: 'rgba(20, 20, 25, 0.96)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-1px) scale(1.01)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
    '&:focus': {
      backgroundColor: 'rgba(249, 115, 22, 0.12)',
      borderColor: '#f97316',
      outline: 'none',
      transform: 'translateY(-1px) scale(1.02)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(249, 115, 22, 0.3)',
      '&::before': {
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.08))',
        opacity: 1,
      },
    },
  },
  iconImage: {
    width: 16,
    height: 16,
    borderRadius: 2,
    objectFit: 'contain',
  },
  buttonWrapper: {
    paddingLeft: 18,
    paddingRight: 18,
    height: '100%',
    position: 'relative',
    zIndex: 1,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    background: 'linear-gradient(135deg, rgba(25, 25, 30, 0.85), rgba(20, 20, 25, 0.9))',
    borderRadius: 6,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 2px 4px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },
  icon: {
    fontSize: 16,
    color: params.iconColor || '#f1f5f9',
    opacity: 0.95,
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))',
    width: 16,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 450,
    verticalAlign: 'middle',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.96,
    transition: 'all 0.3s ease',
  },
  mainText: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 450,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.96,
    transition: 'all 0.3s ease',
    lineHeight: '32px',
    minHeight: 32,
    display: 'flex',
    alignItems: 'center',
  },
  valueText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.8,
  },
  chevronIcon: {
    fontSize: 12,
    color: '#64748b',
    opacity: 0.7,
  },
  scrollIndexValue: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: 400,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.8,
  },
  progressStack: {
    width: '100%',
    marginRight: 5,
  },
  progressLabel: {
    verticalAlign: 'middle',
    marginBottom: 6,
    color: '#f1f5f9',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    opacity: 0.9,
  },
}));

const ListItem = forwardRef<Array<HTMLDivElement | null>, Props>(({ item, index, scrollIndex, checked }, ref) => {
  const { classes } = useStyles({ iconColor: item.iconColor });

  return (
    <Box
      tabIndex={index}
      className={classes.buttonContainer}
      key={`item-${index}`}
      ref={(element: HTMLDivElement) => {
        if (ref)
          // @ts-ignore i cba
          return (ref.current = [...ref.current, element]);
      }}
    >
      <Group spacing={15} noWrap className={classes.buttonWrapper}>
        {item.icon && (
          <Box className={classes.iconContainer}>
            {typeof item.icon === 'string' && isIconUrl(item.icon) ? (
              <img src={item.icon} alt="Missing image" className={classes.iconImage} />
            ) : (
              <LibIcon
                icon={item.icon as IconProp}
                className={classes.icon}
                fixedWidth
                animation={item.iconAnimation}
              />
            )}
          </Box>
        )}
        {Array.isArray(item.values) ? (
          <Group position="apart" w="100%">
            <Stack spacing={2} justify="space-between">
              <Text className={classes.label}>{item.label}</Text>
              <Text className={classes.valueText}>
                {typeof item.values[scrollIndex] === 'object'
                  ? // @ts-ignore for some reason even checking the type TS still thinks it's a string
                  item.values[scrollIndex].label
                  : item.values[scrollIndex]}
              </Text>
            </Stack>
            <Group spacing={8} position="center">
              <LibIcon icon="chevron-left" className={classes.chevronIcon} />
              <Text className={classes.scrollIndexValue}>
                {scrollIndex + 1}/{item.values.length}
              </Text>
              <LibIcon icon="chevron-right" className={classes.chevronIcon} />
            </Group>
          </Group>
        ) : item.checked !== undefined ? (
          <Group position="apart" w="100%">
            <Text className={classes.mainText}>{item.label}</Text>
            <CustomCheckbox checked={checked}></CustomCheckbox>
          </Group>
        ) : item.progress !== undefined ? (
          <Stack className={classes.progressStack} spacing={0}>
            <Text className={classes.progressLabel}>{item.label}</Text>
            <Progress
              value={item.progress}
              color={item.colorScheme || '#f97316'}
              styles={() => ({
                root: {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: 4,
                },
                bar: {
                  borderRadius: 4,
                }
              })}
            />
          </Stack>
        ) : (
          <Text className={classes.mainText}>{item.label}</Text>
        )}
      </Group>
    </Box>
  );
});

export default React.memo(ListItem);
