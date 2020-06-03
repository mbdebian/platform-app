import React, { useState } from 'react';
import {
  Tooltip,
  makeStyles,
  Chip,
  List,
  ListItem,
  ClickAwayListener,
} from '@material-ui/core';

import { Link } from 'ot-ui';

const sourceChipStyles = makeStyles(theme => ({
  chipRoot: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: 0,
    margin: '0 .5rem',
  },
  tooltipListRoot: {
    padding: 0,
  },
  tooltipListItemRoot: {
    padding: 0,
  },
  tooltipTooltip: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: '13px',
    marginTop: '.25rem',
    maxHeight: '10rem',
    maxWidth: '50vw',
    overflowY: 'auto',
  },
}));

const sourceLabel = (name, url) => {
  if (name === 'Clinical Trials Information') {
    return url.split('%22')[1];
  }
  if (name === 'DailyMed Information') {
    return url.split('setid=')[1];
  }
  if (name === 'FDA Information') {
    return url.split('set_id:')[1];
  }

  return 'asdf';
};

function SourceChip({ caption, items }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  const classes = sourceChipStyles();

  const title = (
    <List classes={{ root: classes.tooltipListRoot }}>
      {items.map((item, i) => (
        <ListItem key={i} classes={{ root: classes.tooltipListItemRoot }}>
          <Link external to={item.url}>
            {sourceLabel(item.name, item.url)}
          </Link>
        </ListItem>
      ))}
    </List>
  );

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        classes={{
          tooltip: classes.tooltipTooltip,
        }}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        interactive
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
        open={open}
        placement="bottom"
        title={title}
      >
        <Chip
          variant="outlined"
          size="small"
          label={caption}
          classes={{ root: classes.chipRoot }}
          onClick={handleTooltipToggle}
        />
      </Tooltip>
    </ClickAwayListener>
  );
}

export default SourceChip;
