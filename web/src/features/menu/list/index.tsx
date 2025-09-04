import { Box, createStyles, Stack, Tooltip } from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import ListItem from './ListItem';
import Header from './Header';
import FocusTrap from 'focus-trap-react';
import { fetchNui } from '../../../utils/fetchNui';
import type { MenuPosition, MenuSettings } from '../../../typings';
import LibIcon from '../../../components/LibIcon';

const useStyles = createStyles((theme, params: { position?: MenuPosition; itemCount: number; selected: number }) => ({
  tooltip: {
    backgroundColor: 'rgba(8, 8, 10, 0.98)',
    color: '#e1e5e9',
    borderRadius: 6,
    maxWidth: 350,
    whiteSpace: 'normal',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(15px)',
  },
  container: {
    position: 'absolute',
    pointerEvents: 'none',
    marginTop: params.position === 'top-left' || params.position === 'top-right' ? 5 : 0,
    marginLeft: params.position === 'top-left' || params.position === 'bottom-left' ? 5 : 0,
    marginRight: params.position === 'top-right' || params.position === 'bottom-right' ? 5 : 0,
    marginBottom: params.position === 'bottom-left' || params.position === 'bottom-right' ? 5 : 0,
    right: params.position === 'top-right' || params.position === 'bottom-right' ? 1 : undefined,
    left: params.position === 'bottom-left' ? 1 : undefined,
    bottom: params.position === 'bottom-left' || params.position === 'bottom-right' ? 1 : undefined,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    width: 420,
    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4))',
  },
  buttonsWrapper: {
    height: 'fit-content',
    maxHeight: 450,
    overflow: 'hidden',
    borderRadius: params.itemCount <= 6 || params.selected === params.itemCount - 1 ? 8 : undefined,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: 'none',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  scrollArrow: {
    backgroundColor: 'rgba(8, 8, 10, 0.95)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderTop: 'none',
    textAlign: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArrowIcon: {
    color: '#f97316',
    fontSize: 16,
    opacity: 0.8,
  },
}));

const ListMenu: React.FC = () => {
  const [menu, setMenu] = useState<MenuSettings>({
    position: 'top-left',
    title: '',
    items: [],
  });
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const [indexStates, setIndexStates] = useState<Record<number, number>>({});
  const [checkedStates, setCheckedStates] = useState<Record<number, boolean>>({});
  const listRefs = useRef<Array<HTMLDivElement | null>>([]);
  const firstRenderRef = useRef(false);
  const { classes } = useStyles({ position: menu.position, itemCount: menu.items.length, selected });

  const closeMenu = (ignoreFetch?: boolean, keyPressed?: string, forceClose?: boolean) => {
    if (menu.canClose === false && !forceClose) return;
    setVisible(false);
    if (!ignoreFetch) fetchNui('closeMenu', keyPressed);
  };

  const moveMenu = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (firstRenderRef.current) firstRenderRef.current = false;
    switch (e.code) {
      case 'ArrowDown':
        setSelected((selected) => {
          if (selected >= menu.items.length - 1) return (selected = 0);
          return selected + 1;
        });
        break;
      case 'ArrowUp':
        setSelected((selected) => {
          if (selected <= 0) return (selected = menu.items.length - 1);
          return selected - 1;
        });
        break;
      case 'ArrowRight':
        if (Array.isArray(menu.items[selected].values))
          setIndexStates({
            ...indexStates,
            [selected]:
              indexStates[selected] + 1 <= menu.items[selected].values?.length! - 1 ? indexStates[selected] + 1 : 0,
          });
        break;
      case 'ArrowLeft':
        if (Array.isArray(menu.items[selected].values))
          setIndexStates({
            ...indexStates,
            [selected]:
              indexStates[selected] - 1 >= 0 ? indexStates[selected] - 1 : menu.items[selected].values?.length! - 1,
          });

        break;
      case 'Enter':
        if (!menu.items[selected]) return;
        if (menu.items[selected].checked !== undefined && !menu.items[selected].values) {
          return setCheckedStates({
            ...checkedStates,
            [selected]: !checkedStates[selected],
          });
        }
        fetchNui('confirmSelected', [selected, indexStates[selected]]).catch();
        if (menu.items[selected].close === undefined || menu.items[selected].close) setVisible(false);
        break;
    }
  };

  useEffect(() => {
    if (menu.items[selected]?.checked === undefined || firstRenderRef.current) return;
    const timer = setTimeout(() => {
      fetchNui('changeChecked', [selected, checkedStates[selected]]).catch();
    }, 100);
    return () => clearTimeout(timer);
  }, [checkedStates]);

  useEffect(() => {
    if (!menu.items[selected]?.values || firstRenderRef.current) return;
    const timer = setTimeout(() => {
      fetchNui('changeIndex', [selected, indexStates[selected]]).catch();
    }, 100);
    return () => clearTimeout(timer);
  }, [indexStates]);

  useEffect(() => {
    if (!menu.items[selected]) return;
    listRefs.current[selected]?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    });
    listRefs.current[selected]?.focus({ preventScroll: true });
    // debounces the callback to avoid spam
    const timer = setTimeout(() => {
      fetchNui('changeSelected', [
        selected,
        menu.items[selected].values
          ? indexStates[selected]
          : menu.items[selected].checked
            ? checkedStates[selected]
            : null,
        menu.items[selected].values ? 'isScroll' : menu.items[selected].checked ? 'isCheck' : null,
      ]).catch();
    }, 100);
    return () => clearTimeout(timer);
  }, [selected, menu]);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape', 'Backspace'].includes(e.code)) closeMenu(false, e.code);
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  const isValuesObject = useCallback(
    (values?: Array<string | { label: string; description: string }>) => {
      return Array.isArray(values) && typeof values[indexStates[selected]] === 'object';
    },
    [indexStates, selected]
  );

  useNuiEvent('closeMenu', () => closeMenu(true, undefined, true));

  useNuiEvent('setMenu', (data: MenuSettings) => {
    firstRenderRef.current = true;
    if (!data.startItemIndex || data.startItemIndex < 0) data.startItemIndex = 0;
    else if (data.startItemIndex >= data.items.length) data.startItemIndex = data.items.length - 1;
    setSelected(data.startItemIndex);
    if (!data.position) data.position = 'top-left';
    listRefs.current = [];
    setMenu(data);
    setVisible(true);
    const arrayIndexes: { [key: number]: number } = {};
    const checkedIndexes: { [key: number]: boolean } = {};
    for (let i = 0; i < data.items.length; i++) {
      if (Array.isArray(data.items[i].values)) arrayIndexes[i] = (data.items[i].defaultIndex || 1) - 1;
      else if (data.items[i].checked !== undefined) checkedIndexes[i] = data.items[i].checked || false;
    }
    setIndexStates(arrayIndexes);
    setCheckedStates(checkedIndexes);
    listRefs.current[data.startItemIndex]?.focus();
  });

  return (
    <>
      {visible && (
        <Tooltip
          label={
            isValuesObject(menu.items[selected].values)
              ? // @ts-ignore
              menu.items[selected].values[indexStates[selected]].description
              : menu.items[selected].description
          }
          opened={
            isValuesObject(menu.items[selected].values)
              ? // @ts-ignore
              !!menu.items[selected].values[indexStates[selected]].description
              : !!menu.items[selected].description
          }
          transitionDuration={0}
          classNames={{ tooltip: classes.tooltip }}
        >
          <Box className={classes.container}>
            <Header title={menu.title} banner={menu.banner} bannerIcon={menu.bannerIcon} />
            <Box className={classes.buttonsWrapper} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => moveMenu(e)}>
              <FocusTrap active={visible}>
                <Stack spacing={3} p={8} sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
                  {menu.items.map((item, index) => (
                    <React.Fragment key={`menu-item-${index}`}>
                      {item.label && (
                        <ListItem
                          index={index}
                          item={item}
                          scrollIndex={indexStates[index]}
                          checked={checkedStates[index]}
                          ref={listRefs}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Stack>
              </FocusTrap>
            </Box>
            {menu.items.length > 6 && selected !== menu.items.length - 1 && (
              <Box className={classes.scrollArrow}>
                <LibIcon icon="chevron-down" className={classes.scrollArrowIcon} />
              </Box>
            )}
          </Box>
        </Tooltip>
      )}
    </>
  );
};

export default ListMenu;
