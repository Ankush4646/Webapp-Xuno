// ========================================
// base/BasePage.ts
// ========================================

import {
  Locator,
  Page,
  expect
}
from '@playwright/test';

export class BasePage {

  constructor(
    protected page: Page
  ) {}

  // ========================================
  // SCROLL
  // ========================================

  async scrollToElement(
    locator: Locator
  ) {

    await locator
      .scrollIntoViewIfNeeded();

  }

  // ========================================
  // CLICK
  // ========================================

  async clickElement(
    locator: Locator
  ) {

    await this
      .scrollToElement(
        locator
      );

    await expect(
      locator
    ).toBeVisible();

    await locator
      .click();

  }

  // ========================================
  // FILL INPUT
  // ========================================

  async fillField(
    locator: Locator,
    value: string
  ) {

    await this
      .scrollToElement(
        locator
      );

    await expect(
      locator
    ).toBeVisible();

    await locator
      .fill(value);

  }

  // ========================================
  // TYPE TEXT
  // ========================================

  async typeText(
    locator: Locator,
    value: string
  ) {

    await this
      .scrollToElement(
        locator
      );

    await locator
      .pressSequentially(
        value
      );

  }

  // ========================================
  // SELECT DROPDOWN
  // ========================================

  async selectDropdown(
    locator: Locator,
    value: string
  ) {

    await this
      .scrollToElement(
        locator
      );

    await locator
      .selectOption(
        value
      );

  }

  // ========================================
  // CHECK CHECKBOX/RADIO
  // ========================================

  async checkElement(
    locator: Locator
  ) {

    await this
      .scrollToElement(
        locator
      );

    await locator
      .check();

  }

  // ========================================
  // HOVER
  // ========================================

  async hoverElement(
    locator: Locator
  ) {

    await this
      .scrollToElement(
        locator
      );

    await locator
      .hover();

  }

  // ========================================
  // GET TEXT
  // ========================================

  async getText(
    locator: Locator
  ) {

    await this
      .scrollToElement(
        locator
      );

    return await locator
      .textContent();

  }

  // ========================================
  // WAIT FOR ELEMENT
  // ========================================

  async waitForElement(
    locator: Locator
  ) {

    await expect(
      locator
    ).toBeVisible();

  }

  // ========================================
  // WAIT FOR TIME
  // ========================================

  async wait(
    milliseconds: number
  ) {

    await this.page
      .waitForTimeout(
        milliseconds
      );

  }

  // ========================================
  // VERIFY TEXT
  // ========================================

  async verifyText(
    locator: Locator,
    expectedText: string
  ) {

    await expect(
      locator
    ).toHaveText(
      expectedText
    );

  }

  // ========================================
  // VERIFY VALUE
  // ========================================

  async verifyValue(
    locator: Locator,
    expectedValue: string
  ) {

    await expect(
      locator
    ).toHaveValue(
      expectedValue
    );

  }

  // ========================================
  // VERIFY VISIBLE
  // ========================================

  async verifyVisible(
    locator: Locator
  ) {

    await expect(
      locator
    ).toBeVisible();

  }

  // ========================================
  // VERIFY HIDDEN
  // ========================================

  async verifyHidden(
    locator: Locator
  ) {

    await expect(
      locator
    ).toBeHidden();

  }

  // ========================================
  // VERIFY ENABLED
  // ========================================

  async verifyEnabled(
    locator: Locator
  ) {

    await expect(
      locator
    ).toBeEnabled();

  }


  // ========================================
  // FILE UPLOAD
  // ========================================

  async uploadFile(
    locator: Locator,
    filePath: string
  ) {

    await locator
      .setInputFiles(
        filePath
      );

  }

  // ========================================
  // SCREENSHOT
  // ========================================

  async takeScreenshot(
    fileName: string
  ) {

    await this.page
      .screenshot({

        path:
          `screenshots/${fileName}.png`

      });

  }

  // ========================================
  // PAGE REFRESH
  // ========================================

  async refreshPage() {

    await this.page
      .reload();

  }

  // ========================================
  // PAGE BACK
  // ========================================

  async goBack() {

    await this.page
      .goBack();

  }

  // ========================================
  // PAGE FORWARD
  // ========================================

  async goForward() {

    await this.page
      .goForward();

  }

  // ========================================
  // WAIT FOR URL
  // ========================================

  async waitForURL(
    url: string
  ) {

    await this.page
      .waitForURL(
        `**${url}**`
      );

  }

  // ========================================
  // PRESS KEY
  // ========================================

  async pressKey(
    key: string
  ) {

    await this.page
      .keyboard
      .press(key);

  }

    // ========================================
    // DATE SELECTION
    // ========================================
    dayOption = (
        month: string,
        day: string,
        year: string
        ) =>

        this.page
            .locator(
            `[data-day="${month}/${day}/${year}"]`
            );





async scrollPage(
  pixels: number
) {
  await this.page
    .mouse
    .wheel(
      0,
      pixels
    );

}

async scrollToBottom() {

  await this.page
    .evaluate(() => {

      window.scrollTo(
        0,
        document.body.scrollHeight
      );

    });

}
}


