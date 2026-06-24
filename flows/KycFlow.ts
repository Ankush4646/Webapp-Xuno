import { logger }
from '../utils/logger';

import { TermsPage }
from '../pages/web/kyc/TermsPage';

import { IdentityPage }
from '../pages/web/kyc/IdentityPage';

export class KycFlow {

  constructor(

    private termsPage:
      TermsPage,

    private identityPage:
      IdentityPage

  ) {}

  async completeKyc(
    user: any
  ) {

    // =====================================
    // TERMS AND CONDITIONS
    // =====================================

    logger.info(
      'Opening KYC flow'
    );

    await this.termsPage
      .openTermsFlow();

    logger.info(
      'Verifying Terms and Conditions page'
    );

    await this.termsPage
      .verifyTermsPage();

    logger.info(
      'Validating all legal document links'
    );

    await this.termsPage
      .verifyAllTermsLinks();

    logger.info(
      'Accepting terms and conditions'
    );

    await this.termsPage
      .acceptTerms();

    logger.info(
      'Submitting terms page'
    );

    await this.termsPage
      .continueTermsFlow();

    // =====================================
    // IDENTITY VERIFICATION
    // =====================================

    logger.info(
      'Verifying prefilled identity details'
    );

    await this.identityPage
      .verifyPrefilledUserDetails(
        user
      );

    logger.info(
      'Filling identity verification form'
    );

    await this.identityPage
      .fillIdentityForm();

    logger.info(
      'Submitting identity verification form'
    );

    await this.identityPage
      .continueIdentityFlow();

    logger.info(
      'KYC flow completed successfully'
    );

  }

}