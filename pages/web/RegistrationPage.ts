import { Page, expect }
from '@playwright/test';

export class RegistrationPage {

  constructor(private page: Page) {}

  // =========================
  // REGISTRATION LOCATORS
  // =========================

  registerLink = () =>
    this.page.getByRole(
      'button',
      { name: 'Register' }
    );

  emailField = () =>
    this.page.locator(
      'input[type="email"]'
    );

  firstNameField = () =>
    this.page.locator(
      'input[name="firstName"]'
    );

  middleNameField = () =>
    this.page.locator(
      'input[name="middleName"]'
    );

  lastNameField = () =>
    this.page.locator(
      'input[name="lastName"]'
    );

  registerButton = () =>
    this.page.getByRole(
      'button',
      { name: 'Register' }
    );

  // =========================
  // OTP LOCATORS
  // =========================

  otpTitle = () =>
    this.page.getByRole(
      'heading',
      { name: 'Verify your email' }
    );

  otpInputs = () =>
    this.page.locator(
      'input[data-input-otp="true"]'
    );

  continueButton = () =>
    this.page.getByRole(
      'button',
      { name: 'Continue' }
    );

  // =========================
  // PASSWORD LOCATORS
  // =========================

  passwordField = () =>
    this.page.locator(
      'input[type="password"]'
    ).nth(0);

  confirmPasswordField = () =>
    this.page.locator(
      'input[type="password"]'
    ).nth(1);

  confirmPasswordButton = () =>
    this.page.getByRole(
      'button',
      { name: 'Confirm' }
    );

  // =========================
  // PHONE SETUP LOCATORS
  // =========================

  phoneNumberField = () =>
    this.page.locator(
    'input[inputmode="numeric"]'
  );

  skipForNowButton = () =>
    this.page.getByRole(
      'button',
      { name: 'Skip for Now' }
    );

  // =========================
  // DASHBOARD LOCATORS
  // =========================

  verifyPhoneBannerButton = () =>
  this.page.locator(
    'a[href="/phone-setup"]'
  );

  phoneContinueButton = () =>
    this.page
  .locator('button[type="submit"]');

  dashboardMenu = () =>
    this.page
      .getByLabel('Main menu')
      .getByRole('link', {
        name: 'Dashboard'
      });

  // =========================
  // REGISTRATION ACTIONS
  // =========================

  async openRegistration() {

    await this.registerLink()
      .click();

  }

  async fillRegistrationForm(user: any) {

    await this.emailField()
      .fill(user.email);

    await this.firstNameField()
      .fill(user.firstName);

    await this.middleNameField()
      .fill(user.middleName);

    await this.lastNameField()
      .fill(user.lastName);

  }

  async clickRegister() {

    await expect(
      this.registerButton()
    ).toBeEnabled();

    await this.registerButton()
      .click();

  }

  // =========================
  // OTP ACTIONS
  // =========================

  async verifyOTPPage() {

    await expect(
      this.otpTitle()
    ).toBeVisible({
      timeout: 15000
    });

  }

  async enterOTP(otp: string) {

    await this.otpInputs()
      .fill(otp);

  }

  async clickContinue() {

    await this.continueButton()
      .click();

  }

  // =========================
  // PASSWORD ACTIONS
  // =========================

  async setupPassword(password: string) {

    await this.passwordField()
      .fill(password);

    await this.confirmPasswordField()
      .fill(password);

    await this.confirmPasswordButton()
      .click();

  }

  // =========================
  // PHONE SETUP ACTIONS
  // =========================

  async skipPhoneSetup() {

    await expect(
      this.phoneNumberField()
    ).toBeVisible({
      timeout: 15000
    });

    await this.skipForNowButton()
      .click();

  }

  // =========================
  // DASHBOARD ACTIONS
  // =========================

  async verifyDashboardPage() {

    await expect(this.page)
      .toHaveURL(/home/i);

    await expect(
      this.dashboardMenu()
    ).toBeVisible();

  }
  

  // =========================
  // PHONE VERIFICATION
  // =========================

  async openPhoneVerification() {

  await this.verifyPhoneBannerButton()
    .click();

}

  async enterPhoneNumber(phone: string) {

    await this.phoneNumberField()
      .fill(phone);

  }

  async submitPhoneNumber() {

    await this.phoneContinueButton()
      .click();

  }
}