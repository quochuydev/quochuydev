Feature: Portfolio Website for a Fullstack Developer
  As a fullstack developer
  I want to showcase my skills, experience, and projects
  So that potential clients or employers can understand my capabilities and contact me

  Background:
    Given the developer has personal information including name, title, bio, and resume
    And the developer has a collection of projects with descriptions, tech stack, and links
    And the developer has a list of technical skills

  Scenario: Display developer profile on the homepage
    When a visitor navigates to the homepage
    Then they should see the developer's name, title, and short bio
    And a link to download the resume

  Scenario: View list of projects
    When a visitor navigates to the "Projects" section
    Then they should see a gallery or list of projects
    And each project should display its title, description, and technology stack
    And each project should have a link to a live demo or GitHub repository

  Scenario: Display skills and technologies
    When a visitor navigates to the "Skills" section
    Then they should see categorized skills (e.g., Frontend, Backend, DevOps)
    And each skill should display a name and optionally a proficiency level

  Scenario: Contact form submission
    When a visitor fills in the contact form with name, email, and message
    And they submit the form
    Then the system should validate the input
    And send the message to the developer’s email
    And display a confirmation message to the visitor

  Scenario: Responsive design
    When a visitor opens the website on a mobile device
    Then the layout should adjust to fit the screen size
    And all features should remain functional

  Scenario: SEO and accessibility compliance
    When search engines index the site
    Then the site should include metadata such as title, description, and keywords
    And the site should follow accessibility standards (e.g., alt text for images, semantic HTML)
