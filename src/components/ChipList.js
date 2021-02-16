import React from 'react';
import { Box, Chip, makeStyles, Tooltip } from '@material-ui/core';

import { naLabel } from '../constants';

const useContainerStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}));

const useChipStyles = makeStyles({
  chip: { margin: '3px 5px 3px 0' },
});

function ChipContainer({ item, children }) {
  const classes = useContainerStyles();

  return item.tooltip ? (
    <Tooltip
      placement="top"
      interactive
      classes={{ tooltip: classes.tooltip }}
      title={item.tooltip}
    >
      {children}
    </Tooltip>
  ) : (
    children
  );
}

/**
 * Display a (horizontal) list of "chips".
 * Each chip can show an optional tooltip.
 * @param items Array of Strings.
 * Each item in the items array can also be an object, with format {label, tooltip}
 */
function ChipList({ items }) {
  const classes = useChipStyles();

  if (!items || items.length === 0) return naLabel;

  return items.map((item, index) => (
    <ChipContainer key={index} item={item}>
      <Chip
        component={!!item.url ? 'a' : Box}
        href={item.url}
        className={classes.chip}
        clickable={!!item.url}
        target="_blank"
        noopener="true"
        noreferrer="true"
        color="primary"
        label={item.label}
      />
    </ChipContainer>
  ));
}

export default ChipList;
