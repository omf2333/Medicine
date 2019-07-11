export default theme => ({
  root: {
    margin: 0
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
  searchInput: {
    marginRight: theme.spacing.unit
  }
});
