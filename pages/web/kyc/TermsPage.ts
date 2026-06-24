// ========================================
// pages/web/kyc/TermsPage.ts
// ========================================

import { Page, expect }
from '@playwright/test';

export class TermsPage {

  constructor(
    private page: Page
  ) {}

  // ========================================
  // LOCATORS
  // ========================================

  getStartedButton = () =>
    this.page
      .locator('a[href="/identity-terms"]')
      
  termsPageTitle = () =>
    this.page
      .getByRole(
        'heading',
        {
          name:
            'Terms and Conditions'
        }
      );

  disclosureAndConsentLink = () =>
    this.page
      .locator(
        'a[href="/legals/account-disclosure-and-consent"]'
      );

  passportAccountAgreementLink = () =>
    this.page
      .locator(
        'a[href="/legals/customer-account-agreement"]'
      );

  endUserLicenseAgreementLink = () =>
    this.page
      .locator(
        'a[href="/legals/end-user-license-agreement"]'
      );

  eSignAgreementLink = () =>
    this.page
      .locator(
        'a[href="/legals/esign"]'
      );

    additionalRequiredDisclosures = () =>
    this.page.getByRole(
      'button',
      {
        name: 'Additional Disclosures'
      }
    );

  additionalDisclosuresModalTitle = () =>
    this.page
      .getByRole(
         'heading',
         {
           name: 'Additional Disclosures'
        }
    );

  additionalDisclosuresModalBody = () =>
    this.page
      .locator(
        '.overflow-y-auto'
      )
      .last();

  additionalDisclosuresContinueButton = () =>
    this.page
      .getByRole(
        'button',
        { name: 'Continue' }
      )
      .last();

  termsCheckbox = () =>
    this.page
      .locator(
        'input[type="checkbox"]'
      );

  continueButton = () =>
    this.page
      .locator(
        'button[type="submit"]'
      );

  // ========================================
  // ACTIONS
  // ========================================

  async openTermsFlow() {

    await this.getStartedButton()
      .click();

  }

  // ========================================
  // VALIDATIONS
  // ========================================

  async verifyTermsPage() {

    await expect(
      this.termsPageTitle()
    ).toBeVisible();

    await expect(this.page)
      .toHaveURL(
        /identity-terms/i
      );

  }

  async verifyLegalLink(
    locator: any,
    expectedUrl: string
  ) {

    const [newPage] =
      await Promise.all([

        this.page.context()
          .waitForEvent('page'),

        locator.click()

      ]);

    await newPage
      .waitForLoadState();

    await expect(newPage)
      .toHaveURL(
        new RegExp(expectedUrl)
      );

    const title =
      await newPage.title();

    console.log(
      `Verified title: ${title}`
    );

    await newPage.close();

  }

  async verifyAdditionalDisclosuresModal() {

    await this
      .additionalRequiredDisclosures()
      .click();

    await expect(
      this.additionalDisclosuresModalTitle()
    ).toBeVisible();

    await this
      .additionalDisclosuresModalBody()
      .evaluate((element) => {

        element.scrollTop =
          element.scrollHeight;

      });

    await expect(
      this.additionalDisclosuresContinueButton()
    ).toBeEnabled();

    await this
      .additionalDisclosuresContinueButton()
      .click();

  }

  async verifyAllTermsLinks() {

    await this.verifyLegalLink(

      this.disclosureAndConsentLink(),
      'account-disclosure-and-consent'

    );

    await this.verifyLegalLink(

      this.passportAccountAgreementLink(),
      'passport-account-agreement'

    );

    await this.verifyLegalLink(

      this.endUserLicenseAgreementLink(),
      'end-user-license-agreement'

    );

    await this.verifyLegalLink(

      this.eSignAgreementLink(),
      'esign'

    );

    await this
      .verifyAdditionalDisclosuresModal();

  }

  async acceptTerms() {

    await this.termsCheckbox()
      .check();

  }

  async continueTermsFlow() {

    await this.continueButton()
      .click();

  }

}