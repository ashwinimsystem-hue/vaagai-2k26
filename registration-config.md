# Vaagai 2k26 registration architecture

This document records the agreed registration model before the Apps Script endpoint is connected.

## Registration model

One website registration submission may contain multiple selected competitions.

The system generates one stable Registration ID for the submission and, when team events are selected, one Team ID per team/event grouping. The participant can reuse the same submission rather than filling separate Google Forms.

## Required participant fields

- Full name
- Mobile number
- College registration number
- College name
- Department
- Year of study
- Email address (required for confirmation mail)

## Event-specific collection

The website must show only fields relevant to the selected competition(s).

Examples:

- Paper Presentation: topic/title and team-member information when team registration is chosen.
- CAD Modeling: individual registration; no extra team fields.
- ANSYS Simulation Challenge: individual registration.
- Glider Competition: single/doubles team information.
- Technical Quiz: team information, maximum 3 participants.
- Line Follower: team information, 2–3 members.
- Water Rocketry: single/doubles team information.
- Free Fire, Carrom, IPL Auction, Treasure Hunt, Chess: use fields only after organiser details are finalised.

## IDs

Suggested human-readable formats:

- Registration ID: `VAA-REG-000001`
- Participant ID: `VAA-P-000001`
- Team ID: `VAA-T-000001`

The final generator should avoid duplicate IDs even when two participants submit at nearly the same time by using a server-side lock/atomic counter.

## Google Sheet storage

Recommended tabs:

1. `Registrations` — one row per submission.
2. `Event Registrations` — one row per selected event.
3. `Team Members` — one row per team member.

## Confirmation email

After the server successfully writes all records, send a confirmation email to the supplied email address containing:

- Registration ID
- Participant ID or Team ID(s)
- Participant/team details
- Selected competitions
- Applicable fees
- Event dates/venues currently published
- Relevant event instructions/rules
- Contact/social links

Never send a success message or ID before the Sheet write succeeds.

## Deployment constraint

GitHub Pages serves the frontend only. Google Apps Script acts as the backend endpoint and writes to the organiser's Google Sheet. The Apps Script Web App URL will be placed in the frontend configuration after deployment.
