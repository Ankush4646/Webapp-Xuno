import { RegistrationPage }
from '../pages/web/RegistrationPage';

import { logger } from '../utils/logger';
import {
  createUSPhoneNumber
}
from '../utils/testData';

export class RegistrationFlow {

  constructor(
    private registrationPage:
      any
  ) {}

  async registerUser(user: any) {

    logger.info(
      'Starting registration flow'
    );

    await this.registrationPage
      .openRegistration();

    logger.info(
      `Registering user: ${user.email}`
    );

    await this.registrationPage
      .fillRegistrationForm(user);

    await this.registrationPage
      .clickRegister();

    logger.info(
      'Verifying email OTP'
    );

    await this.registrationPage
      .verifyOTPPage();

    await this.registrationPage
      .enterOTP('121212');

    await this.registrationPage
      .clickContinue();

    logger.info(
      'Setting account password'
    );

    await this.registrationPage
      .setupPassword('Test@1234');

    logger.info(
      'Navigating to dashboard'
    );

    await this.registrationPage
      .skipPhoneSetup();

    await this.registrationPage
      .verifyDashboardPage();

    const phoneNumber =
      createUSPhoneNumber();

    logger.info(
      `Verifying phone number: ${phoneNumber}`
    );

    await this.registrationPage
      .openPhoneVerification();

    await this.registrationPage
      .enterPhoneNumber(phoneNumber);

    await this.registrationPage
      .submitPhoneNumber();

    logger.info(
      'Submitting phone OTP'
    );

    await this.registrationPage
      .enterOTP('121212');

    await this.registrationPage
    .clickContinue();

     await this.registrationPage
      .verifyDashboardPage();

    logger.info(
      'Registration flow completed successfully'
    );
    return  { 

      ...user
    }

  }
}