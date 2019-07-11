export default theme => ({
  root: {},
  field: {
    margin: theme.spacing.unit * 3
  },
  details: {
    display: 'flex'
  },
  info: {},
  locationText: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  medicineName: {
    color: theme.palette.text.secondary
  },
  avatar: {
    marginLeft: 'auto',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0
  },
  progressWrapper: {
    marginTop: theme.spacing.unit * 2
  },
  uploadButton: {
    marginRight: theme.spacing.unit * 2
  },
  imageWrapper: {
    height: '250px',
    width: '250px',
    margin: '0 auto',
    border: '1px solid #EDF0F2',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
