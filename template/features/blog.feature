Feature: Blog
  Scenario: Open Blog Page
    When run scenario {Open Website}
    And click $navbar.blog
    Then $blogPage.firstBlogPostCard is visible