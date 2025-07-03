module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, missing semicolons, etc
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvement
        "test", // Adding missing tests
        "chore", // Maintenance
        "a11y", // Accessibility improvements
        "security", // Security fixes
        "ci", // CI/CD changes
        "revert", // Revert a previous commit
      ],
    ],
    "subject-case": [2, "always", "sentence-case"],
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 10],
    "header-max-length": [2, "always", 100],
  },
}
