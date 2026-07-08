name: Bug Report
description: Report a bug to help us improve
labels: ["bug"]
assignees: []

body:

- type: markdown
  attributes:
  value: |
  Thanks for taking the time to fill out this bug report!

- type: checkboxes
  attributes:
  label: Is there an existing issue for this?
  description: Please search to see if an issue already exists for the bug you encountered.
  options: - label: I have searched the existing issues
  required: true

- type: textarea
  attributes:
  label: Current Behavior
  description: Describe the issue. What behavior did you see?
  placeholder: |
  When I do X, Y happens, but I expected Z to happen instead.

- type: textarea
  attributes:
  label: Expected Behavior
  description: Describe what should happen instead.
  placeholder: |
  The component should display correctly on mobile devices.

- type: textarea
  attributes:
  label: Steps to Reproduce
  description: Describe how to reproduce the issue with clear, numbered steps.
  placeholder: | 1. Navigate to the home page 2. Resize the window to mobile width 3. Scroll down 4. Click the contact button

- type: textarea
  attributes:
  label: Screenshots or Videos
  description: If applicable, add screenshots or screen recordings showing the issue.

- type: textarea
  attributes:
  label: Environment
  description: Information about your environment
  value: | - OS: [e.g., Windows 11, macOS 13.5] - Browser: [e.g., Chrome 120, Safari 17] - Node.js version: [e.g., 18.0.0] - npm version: [e.g., 9.0.0]

- type: textarea
  attributes:
  label: Additional Context
  description: Is there anything else that might be relevant?

- type: checkboxes
  attributes:
  label: Would you like to submit a PR?
  description: We appreciate contributions!
  options: - label: I would like to submit a PR to fix this issue
