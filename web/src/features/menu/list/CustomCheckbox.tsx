import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    '&:checked': {
      backgroundColor: '#f97316',
      borderColor: '#f97316',
      boxShadow: '0 4px 8px rgba(255, 106, 0, 0.33), 0 2px 4px rgba(0, 0, 0, 0.3)',
      '&:hover': {
        backgroundColor: '#ea580c',
      }
    },
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
      boxShadow: '1 3px 6px rgba(0, 0, 0, 0.35)',
    },
  },
  inner: {
    '> svg > path': {
      fill: '#ffffff',
    },
  },
}));

const CustomCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const { classes } = useStyles();
  return (
    <Checkbox
      checked={checked}
      size="md"
      classNames={{ root: classes.root, input: classes.input, inner: classes.inner }}
    />
  );
};

export default CustomCheckbox;
