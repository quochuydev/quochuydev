Feature: Portfolio Website for a Fullstack Developer
  As a fullstack developer
  I want to showcase my skills/contacts, experiences/projects, blogs
  So that potential clients or employers can understand my capabilities and contact me

  Background:
    Given the developer has personal information including name, title, bio, and resume
    And the developer has a collection of projects with descriptions, tech stack, and links
    And the developer has a list of technical skills

  Scenario: Display developer profile on the homepage
    When a visitor navigates to the homepage
    Then they should see the developer's name, title, bio
    And a link to download the resume
    And They should see the contact information

  Scenario: Display skills on the homepage
    When a visitor navigates to the homepage
    Then They should see categorized skills and each skill should display a name
    And Optionally a proficiency level

  Scenario: Show cases of pet projects
    When a visitor navigates to the homepage
    Then they would see a list of pet projects
    And each pet project should have a link to a live demo or GitHub repository

  Scenario: View list of Experiences/Projects
    When a visitor navigates to the "Experiences" section
    Then they should see a gallery or list of experiences/projects
    And each experience/project should display its title, description, and technology stack
    And each experience/project should have a link to a live demo or GitHub repository

  Scenario: Responsive design
    When a visitor opens the website on a mobile device
    Then the layout should adjust to fit the screen size
    And all features should remain functional

  Scenario: SEO and accessibility compliance
    When search engines index the site
    Then the site should include metadata such as title, description, and keywords
    And the site should follow accessibility standards (e.g., alt text for images, semantic HTML)
