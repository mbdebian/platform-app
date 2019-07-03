import React from 'react';
import * as d3 from 'd3';

import { OtTableRF, Link } from 'ot-ui';

import LinearVenn from '../../../common/LinearVenn';

const columns = (symbol, maxDiseaseCountAOrB) => [
  {
    id: 'B.symbol',
    label: 'Related target',
    renderCell: d => <Link to={`../${d.B.id}`}>{d.B.symbol}</Link>,
    comparator: (a, b) => {
      if (a.B.symbol <= b.B.symbol) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'diseaseCountANotB',
    label: `Diseases associated with ${symbol} but not the related target`,
  },
  {
    id: 'diseaseCountAAndB',
    label: 'Shared disease associations',
  },
  {
    id: 'diseaseCountBNotA',
    label: `Diseases associated with the related target but not ${symbol}`,
  },
  {
    id: 'chart',
    label: 'Venn diagram',
    renderCell: d => (
      <LinearVenn
        aOnly={d.diseaseCountANotB}
        bOnly={d.diseaseCountBNotA}
        aAndB={d.diseaseCountAAndB}
        max={maxDiseaseCountAOrB}
      />
    ),
  },
];

const Section = ({ ensgId, symbol, data }) => {
  const { rows } = data;
  const maxDiseaseCountAOrB = d3.max(rows, d => d.diseaseCountAOrB);
  const rowsMapped = rows.map(d => ({
    ...d,
    diseaseCountANotB: d.diseaseCountA - d.diseaseCountAAndB,
    diseaseCountBNotA: d.diseaseCountB - d.diseaseCountAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(symbol, maxDiseaseCountAOrB)}
      data={rowsMapped}
    />
  );
};

export default Section;
