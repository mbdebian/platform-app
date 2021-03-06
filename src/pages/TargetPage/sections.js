// Section imports
import * as BaselineExpression from '../../sections/target/Expression';
import * as Bibliography from '../../sections/common/Bibliography';
import * as CancerBiomarkers from '../../sections/target/CancerBiomarkers';
import * as CancerHallmarks from '../../sections/target/CancerHallmarks';
import * as ChemicalProbes from '../../sections/target/ChemicalProbes';
import * as ComparativeGenomics from '../../sections/target/ComparativeGenomics';
import * as GeneOntology from '../../sections/target/GeneOntology';
import * as KnownDrugs from '../../sections/target/KnownDrugs';
import * as MousePhenotypes from '../../sections/target/MousePhenotypes';
import * as Pathways from '../../sections/target/Pathways';
import * as ProteinInformation from '../../sections/target/ProteinInformation';
// import * as RelatedTargets from '../../sections/target/RelatedTargets';
import * as Safety from '../../sections/target/Safety';
import * as Tep from '../../sections/target/Tep';
import * as Tractability from '../../sections/target/Tractability';
import * as Variation from '../../sections/target/Variation';

export default [
  KnownDrugs,
  Tractability,
  Safety,
  Tep,
  ChemicalProbes,
  BaselineExpression,
  GeneOntology,
  ProteinInformation,
  Pathways,
  // RelatedTargets,
  CancerBiomarkers,
  CancerHallmarks,
  MousePhenotypes,
  Variation,
  ComparativeGenomics,
  Bibliography,
];
