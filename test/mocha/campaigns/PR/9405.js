const {ProductPageFO} = require('../../selectors/FO/productPage');
const {HomePage} = require('../../selectors/FO/homePage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');
const authentication = require('../common_scenarios/authentication');
let quantity = '0';

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/9405', () => {
  authentication.openShop('9405');
  scenario('Check the existence of the "block cart modal"', client => {
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
    test('should set the quantity input by clicking on "arrow up button"', () => client.waitForAndClick(ShoppingCartPage.arrow_button_up));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ShoppingCartPage.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForAndClick(ShoppingCartPage.proceed_to_checkout_button, 2000, {visible: true}));
    test('should set the quantity equal to ' + quantity, async () => {
      await client.eval(ShoppingCartPage.quantity_input, quantity);
      await client.waitForAndClick(ShoppingCartPage.quantity_input);
      await client.keyboardPress('Enter');
    });
    test('should check that the quantity is equal to ' + quantity, () => client.checkTextValue(ShoppingCartPage.cart_products_count, quantity, 'contain', 2000));
    test('should go to the "Home" page', () => client.waitForAndClick(HomePage.logo_home_page));
    test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ShoppingCartPage.add_to_cart_button));
    test('should check the existence of the "block cart modal"', () => client.isExisting(ShoppingCartPage.block_cart, 3000));
  }, 'common_client');
}, 'common_client', true);
