import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { getPage, Table } from '../../../components/Table';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { useEffect } from 'react';
import { europePmcLiteratureQuery } from '../../../utils/urls';
import { naLabel } from '../../../constants';
import Publication from './Publication';

const EUROPE_PMC_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'publicationDetails',
    propertyPath: 'title',
    label: 'Publication',
    renderCell: ({
      europePmcId,
      title,
      abstract,
      textMiningSentences,
      authors,
      journal,
    }) => {
      return (
        <Publication
          europePmcId={europePmcId}
          title={title}
          abstract={abstract}
          textMiningSentences={textMiningSentences}
          authors={authors}
          journal={journal}
        />
      );
    },
  },
  {
    id: 'year',
    renderCell: ({ year }) => (year ? year : naLabel),
  },
  {
    id: 'resourceScore',
    label: 'Score',
    numeric: true,
  },
];

// Merges data from platform-API and EuropePMC API.
const mergeData = (rows, literatureData) => {
  const mergedRows = [...rows];

  rows.forEach(row => {
    const relevantEntry = literatureData.find(
      entry => entry.id === row.literature[0]
    );

    if (relevantEntry) {
      row.europePmcId = relevantEntry.id;
      row.title = relevantEntry.title;
      row.year = relevantEntry.pubYear;
      row.abstract = relevantEntry.abstractText;
      row.authors = relevantEntry.authorList.author;
      row.journal = {
        ...relevantEntry.journalInfo,
        page: relevantEntry.pageInfo,
      };
    }
  });

  return mergedRows;
};

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const pageSize = 10;
  const pagesToFetch = 10;
  const [page, setPage] = useState(0);
  const [literatureData, setLiteratureData] = useState([]);
  const [newIds, setNewIds] = useState([]);
  const variables = { ensemblId: ensgId, efoId, size: pageSize * pagesToFetch };
  const { loading: isLoading, error, data, fetchMore } = useQuery(
    EUROPE_PMC_QUERY,
    {
      variables,
      client: betaClient,
      onCompleted: data => {
        setNewIds(
          data.disease.evidences.rows.map(entry => entry.literature[0])
        );
      },
    }
  );
  const [loading, setLoading] = useState(isLoading);

  const handlePageChange = page => {
    if (page * pageSize >= data.disease.evidences.rows.length - pageSize) {
      setLoading(true); // fetchMore takes too long to set loading to true.
      fetchMore({
        variables: {
          ...variables,
          cursor: data.disease.evidences.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          setNewIds(
            fetchMoreResult.disease.evidences.rows.map(
              entry => entry.literature[0]
            )
          );

          return {
            ...prev,
            disease: {
              ...prev.disease,
              evidences: {
                ...prev.disease.evidences,
                cursor: fetchMoreResult.disease.evidences.cursor,
                rows: [
                  ...prev.disease.evidences.rows,
                  ...fetchMoreResult.disease.evidences.rows,
                ],
              },
            },
          };
        },
      });
    }

    setPage(page);
  };

  useEffect(
    () => {
      let isCurrent = true;

      async function fetchLiterature() {
        setLoading(true);

        if (newIds.length) {
          const queryUrl = europePmcLiteratureQuery(newIds);
          const res = await fetch(queryUrl);
          const resJson = await res.json();
          const newLiteratureData = resJson.resultList.result;

          setLiteratureData(literatureData => [
            ...literatureData,
            ...newLiteratureData,
          ]);
          setLoading(false);
        }
      }

      if (isCurrent) fetchLiterature();

      return () => {
        isCurrent = false;
      };
    },
    [newIds]
  );

  return (
    <SectionItem
      definition={definition}
      request={{ loading, error, data }}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={data => {
        const rows = mergeData(
          getPage(data.disease.evidences.rows, page, pageSize),
          literatureData
        );

        return (
          <Table
            loading={loading}
            columns={columns}
            dataDownloader
            dataDownloaderFileStem={`otgenetics-${ensgId}-${efoId}`}
            onPageChange={handlePageChange}
            page={page}
            pageSize={pageSize}
            rows={rows}
            rowCount={data.disease.evidences.count}
          />
        );
      }}
    />
  );
}

export default Body;
