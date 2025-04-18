import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 1px',
    background: '#ccc',
    color: '#212529',
    fontWeight: 'bold',
    borderRadius: '5px',
    borderBottom: '2px solid #777',
  },
  input: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    '&:checked': {
      backgroundColor: '#ccc',
      borderColor: '#ccc',
      orderColor: '#ccc',
    },
  },
  inner: {
    '> svg > path': {
      fill: '#212529',
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
