Feature: Shopping Cart and Checkout
  As a registered customer
  I want to add products to my cart
  So that I can purchase them

  Background:
    Given I am logged in as a customer
    And I am on the product page

  Scenario: Successfully add item and checkout
    When I add a product to the cart
    And I click on the cart icon
    Then the cart should contain 1 item
    And the total price should be correct
    When I proceed to checkout
    And I fill in shipping details
    And I submit the order
    Then I should see an order confirmation page