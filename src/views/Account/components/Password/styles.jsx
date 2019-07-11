import { blue } from '../../../../common/colors';

export default theme => ({
  root: {marginTop:'30px'},
  form: {},
  textField: {
    width:'520px',
    maxWidth: '100%',
    marginBottom: theme.spacing.unit * 3
  },
  portletFooter: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  snackBar: {
    background: blue
  }
});
