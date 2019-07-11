import { blue } from '../../common/colors';

export default theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit
  },
  spacer: {
    flexGrow: 1
  },
  snackBar: {
    background: blue
  },
  root: {
    padding: theme.spacing.unit * 3
  },
  content: {
    marginTop: theme.spacing.unit * 2
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
});
