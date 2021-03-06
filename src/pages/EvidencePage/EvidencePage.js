import React from 'react';
import { gql, useQuery } from '@apollo/client';

import BasePage from '../../components/BasePage';
import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const EVIDENCE_PAGE_QUERY = gql`
  query EvidencePageQuery($ensgId: String!, $efoId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
    }
    disease(efoId: $efoId) {
      id
      name
    }
  }
`;

function EvidencePage({ match }) {
  const { ensgId, efoId } = match.params;
  const { loading, data } = useQuery(EVIDENCE_PAGE_QUERY, {
    variables: { ensgId, efoId },
  });

  if (data && !(data.target && data.disease)) {
    return <NotFoundPage />;
  }

  const { approvedSymbol: symbol } = data?.target || {};
  const { name } = data?.disease || {};

  return (
    <BasePage title={`Evidence for ${symbol} in ${name}`}>
      <Header
        loading={loading}
        efoId={efoId}
        ensgId={ensgId}
        symbol={symbol}
        name={name}
      />

      <RoutingTabs>
        <RoutingTab
          label="Profile"
          path="/evidence/:ensgId/:efoId"
          component={() => (
            <Profile
              ensgId={ensgId}
              efoId={efoId}
              symbol={symbol}
              name={name}
            />
          )}
        />
        <RoutingTab
          label="View this page in the classic view"
          url={`${oldPlatformUrl}/evidence/${ensgId}/${efoId}`}
        />
      </RoutingTabs>
    </BasePage>
  );
}

export default EvidencePage;
