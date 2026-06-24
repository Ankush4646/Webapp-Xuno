import { test }
from '@playwright/test';

import fs from 'fs';

import { TermsPage }
from '../../pages/web/kyc/TermsPage';

import { IdentityPage }
from '../../pages/web/kyc/IdentityPage';

import { KycFlow }
from '../../flows/KycFlow';

test(
  '@kyc Xuno KYC Flow',

  async ({ page }) => {

    // =====================================
    // LOAD REGISTERED USER
    // =====================================

    const registeredUser =
      JSON.parse(

        fs.readFileSync(
          'storage/user.json',
          'utf-8'
        )

      );

    // =====================================
    // REUSE AUTH SESSION
    // =====================================

    await page.goto('/home');

    // =====================================
    // PAGE OBJECTS
    // =====================================

    const termsPage =
      new TermsPage(page);

    const identityPage =
      new IdentityPage(page);

    // =====================================
    // FLOW
    // =====================================

    const kycFlow =
      new KycFlow(

        termsPage,
        identityPage

      );

    // =====================================
    // EXECUTE KYC FLOW
    // =====================================

    await kycFlow
      .completeKyc(
        registeredUser
      );

  }

);