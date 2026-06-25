import { defineConfig, devices }
from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config({

  path:
    './configs/env/.env.qa'

});

console.log('BASE_URL:', process.env.BASE_URL);
console.log('API_URL:', process.env.API_URL);

export default defineConfig({

  testDir:
    './tests',

  timeout:
    60000,

  fullyParallel: false,

  workers: 1,

  reporter: [

    ['html'],

    ['list']

  ],

  use: {

    baseURL:
      process.env.BASE_URL,

    headless: true,

    trace:
      'on-first-retry',

    screenshot:
      'only-on-failure',

    video:
      'retain-on-failure'

  },

  projects: [

    // ==========================
    // ONBOARDING TESTS
    // ==========================

    {
      name: 'onboarding',

      testMatch: [

        '**/registration.spec.ts'

      ],

      use: {

        ...devices['Desktop Chrome']

      }

    },

    // ==========================
    // AUTHENTICATED TESTS
    // ==========================

   {
      name: 'authenticated',

      dependencies: [
        'onboarding'
      ],

      testIgnore: [

        '**/registration.spec.ts'

      ],

      use: {

        ...devices['Desktop Chrome'],

        storageState:
          'storage/auth.json'

      }

}

  ]

});