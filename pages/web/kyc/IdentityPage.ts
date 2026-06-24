import { Page, expect }
from '@playwright/test';
import { BasePage }
from '../BasePage';
export class IdentityPage extends BasePage {

    constructor(
    page: Page
  ) {

    super(page);

  }



  // ========================================
  // LOCATORS
  // ========================================

  firstNameField = () =>
    this.page
      .locator('input')
      .nth(0);

  middleNameField = () =>
    this.page
      .locator('input')
      .nth(1);

  lastNameField = () =>
    this.page
      .locator('input')
      .nth(2);

  maleRadioButton = () =>
    this.page
      .getByRole(
        'radio',
        {
          name: 'Male',
          exact: true
        }
      );

  femaleRadioButton = () =>
    this.page
      .getByRole(
        'radio',
        {
          name: 'Female',
          exact: true
        }
      );

  nonBinaryRadioButton = () =>
    this.page
      .getByRole(
        'radio',
        {
          name: 'Non-binary',
          exact: true
        }
      );
  
  
  
  calendarButton = () =>
  this.page
    .locator(
      'button[aria-haspopup="dialog"]'
    );

 yearDropdown = () =>
  this.page
    .getByLabel(
      'Choose the Year'
    );

  monthDropdown = () =>
  this.page
    .getByLabel(
      'Choose the Month'
    );

  emailField = () =>
    this.page
      .locator(
        'input[type="email"]'
      );

  streetAddressField = () =>
    this.page
      .locator(
        'input[placeholder="Enter street address"]'
      );

  addressSuggestion = () =>
   this.page
    .locator('ul li')
    .first();

    // wait for autofill api

  cityField = () =>
    this.page
      .locator(
        'input[placeholder="City"]'
      );

  stateDropdown = () =>
    this.page
      .locator(
        'button[role="combobox"]'
      )
      .last();

  postalCodeField = () =>
    this.page
      .locator(
        'input[placeholder="Postal Code"]'
      );

  continueButton = () =>
    this.page
      .getByRole(
        'button',
        { name: 'Continue' }
      );

  // ========================================
  // VALIDATIONS
  // ========================================

  async verifyPrefilledUserDetails(
    user: any
  ) {

    await expect(
      this.firstNameField()
    ).toHaveValue(
      user.firstName
    );

    await expect(
      this.middleNameField()
    ).toHaveValue(
      user.middleName
    );

    await expect(
      this.lastNameField()
    ).toHaveValue(
      user.lastName
    );

    await expect(
      this.emailField()
    ).toHaveValue(
      user.email
    );

  }

  // ========================================
  // ACTIONS
  // ========================================

  async fillIdentityForm() {

    await this.maleRadioButton()
      .click();


    // open calendar

    await this.clickElement(
        this.calendarButton()
      );

    await this.wait(1000);

    await this.monthDropdown()
        .selectOption('9');

    await this.yearDropdown()
        .selectOption('1995');

  await this.dayOption(
        '10',
        '11',
        '1995'
    ).click();
    // =====================================
    // ADDRESS AUTOFILL
    // =====================================
    // =====================================
// ADDRESS AUTOFILL
// =====================================

      await this.scrollToElement(
        this.streetAddressField()
      );

      // type partial address

      await this.streetAddressField()
        .fill('123');

      // wait for dropdown

      await this.addressSuggestion()
        .waitFor({
          state: 'visible'
        });

      // click first suggestion

      await this.addressSuggestion()
        .click();

      // wait for autofill


    // =====================================
    // VALIDATE AUTOFILLED VALUES
    // =====================================

    await expect(
      this.cityField()
    ).toHaveValue(
      'White Plains'
    );

    await expect(
      this.stateDropdown()
    ).toContainText(
      'New York'
    );

    await expect(
      this.postalCodeField()
    ).toHaveValue(
      '10601'
    );

  }

  async continueIdentityFlow() {

    await this.continueButton()
      .click();

  }

}