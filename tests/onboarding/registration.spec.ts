import { test }
from '@playwright/test';

import fs from 'fs';

import { RegistrationPage }
from '../../pages/web/RegistrationPage';

import { RegistrationFlow }
from '../../flows/RegistrationFlow';

import { createUser }
from '../../utils/testData';

test(
  '@registration Xuno Registration Flow',

  async ({ page }) => {

    // =====================================
    // CREATE TEST USER
    // =====================================

    const user =
      createUser();

    // =====================================
    // PAGE & FLOW
    // =====================================

    const registrationPage =
      new RegistrationPage(page);

    const registrationFlow =
      new RegistrationFlow(
        registrationPage
      );

    // =====================================
    // OPEN APP
    // =====================================

    await page.goto('/');

    // =====================================
    // REGISTER USER
    // =====================================

    await registrationFlow
      .registerUser(user);

    // =====================================
    // SAVE AUTH SESSION
    // =====================================

    await page.context()
      .storageState({

        path:
          'storage/auth.json'

      });

    // =====================================
    // SAVE USER DATA
    // =====================================
const userData = JSON.stringify(
  user,
  null,
  2
);

console.log(userData);

fs.writeFileSync(
  'storage/user.json',
  userData
);

  }

);