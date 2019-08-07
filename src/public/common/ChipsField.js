import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  chip: {
    margin: '2px 2px',
    height: '20px',
  },
  showMore: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
});

const MAX_TERMS = 8;

class ChipsField extends Component {
  state = {
    showMore: false,
  };

  showMore = () => {
    this.setState(({ showMore }) => ({ showMore: !showMore }));
  };

  render() {
    const { label, terms, classes } = this.props;

    if (terms.length === 0) return null;

    const { showMore } = this.state;

    const shownTerms = terms.slice(0, MAX_TERMS);
    const hiddenTerms = terms.slice(MAX_TERMS);

    return (
      <>
        <Typography variant="subtitle2">{label}:</Typography>
        {shownTerms.map(term => (
          <Chip
            className={classes.chip}
            key={term}
            label={term}
            variant="outlined"
          />
        ))}
        {showMore &&
          hiddenTerms.map(term => (
            <Chip
              className={classes.chip}
              key={term}
              label={term}
              variant="outlined"
            />
          ))}
        {hiddenTerms.length > 0 && (
          <Typography onClick={this.showMore}>
            {showMore ? '' : '... '}[
            <span className={classes.showMore}>
              {showMore ? ' hide ' : ' show more '}
            </span>
            ]
          </Typography>
        )}
      </>
    );
  }
}

export default withStyles(styles)(ChipsField);
