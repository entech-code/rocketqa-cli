Feature: Search
  Scenario: Search result page has logo
    When run scenario {Open Google}
    And type "PandaTest" into $google.searchBox
    And click $google.searchButton
    Then $googleResults.logo is visible