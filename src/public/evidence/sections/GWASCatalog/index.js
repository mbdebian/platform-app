import { loader } from 'graphql.macro';

export const id = 'gwasCatalog';
export const name = 'GWAS Catalog';

export const hasSummaryData = ({ variantCount }) => variantCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
