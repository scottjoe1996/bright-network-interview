# Bright Network Interview – Job Matcher

This project extracts job interests (such as roles and preferred locations) from user bios and matches them against job titles.

## Requirements

- **Node.js** v20 or higher
- **npm**

## Installation

After cloning the repo, install all dependencies

```
npm install
```

## Run job matcher

To run the job matcher run the following command

```
npm run match-jobs
```

This should log the following results

```
Joe
  UX Designer


Marta
  Legal Internship
  Sales Internship


Hassan
  UX Designer


Grace


Daisy
  Software Developer
  Software Developer
```

## Run tests

To run the test suite (using Jest) run the following command

```
npm test
```

## Dependencies used and why

- **Fuse.js** - I realised early on that writing custom rules for every phrase would be impractical. Fuse.js is a lightweight, well-supported fuzzy search library that allowed me to match similar job titles from a member’s bio (e.g. "design" → "designer") without rigid keyword rules.
- **compromise** - I used the `places()` feature to detect when a bio mentioned a location. This enabled me to ignore the location filter when no relevant place was mentioned. It’s a lightweight and efficient library for this specific use case.
- **Jest** - I used Jest as the testing framework because it’s fast, widely adopted, and has excellent TypeScript support. It allowed me to write and run unit tests to verify the accuracy of job and location matching logic, ensuring the system behaves correctly across edge cases.

## If there were more time

- **Excluding Locations** - Finish the functionality to detect when members mention places they don't want to work (e.g., "I'm looking for a job in marketing outside of London") and exclude those from the match results. This would require negation handling which could be extremely difficult without using a Natural Language Model (see below).
- **Use a Natural Language Model** - If time was not an issue, instead of relying on fuzzy matching and keyword-based logic, I would use a language model to extract job and location interests. This would improve matching even when bios use vague language (e.g., "I'm passionate about crafting intuitive interfaces" → UX Designer).
