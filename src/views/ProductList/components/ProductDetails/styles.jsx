export default theme => ({
  root: {
    margin: 0
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  avatar: {
    marginLeft: '230px',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0
  },
  uploadButton: {
    marginLeft: '236px',
    marginTop: '12px',
    marginBottom: '12px'
  },
  shortTextField: {
    marginLeft: '20px',
    width: '250px',
    maxWidth: '100%',
  },
  longTextField: {
    marginLeft: '20px',
    width: '520px',
    maxWidth: '100%',
  },
  input: {
    marginLeft: '236px',
    marginTop: '12px',
    marginBottom: '12px',
    display: 'none',
  }
});
