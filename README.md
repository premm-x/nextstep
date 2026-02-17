# ApplyWise AI

**AI-Assisted Job Application System (Human-in-the-Loop)**

## Overview
ApplyWise AI is a resume-focused, human-in-the-loop AI system designed to help users discover relevant jobs, review opportunities, assist with applications, and track outcomes in a safe and controlled way.

Instead of blindly auto-applying, the system combines AI-driven decision-making with deterministic browser execution. AI agents handle tasks like job relevance scoring, resume customization, and application strategy, while browser actions are executed step by step with full state tracking, logs, and screenshots.

This design avoids spam behavior, respects job platform constraints (captchas, manual verification), and keeps the user in control throughout the application process.

## What ApplyWise AI Does
- Searches jobs based on user-defined filters (role, location, tech stack)
- Allows manual review and approval of jobs before applying
- Matches resumes with job descriptions using AI
- Customizes resumes and cover letters per job
- Assists with job applications (Easy Apply and Assisted Apply)
- Tracks applications in Excel / Google Sheets
- Sends follow-up and reminder notifications

## What It Does NOT Do
- Blindly auto-apply to hundreds of jobs
- Bypass captchas or job portal security
- Generate fake or misleading resume information

## Core Design Principle
> AI decides. Execution is deterministic. Humans stay in control.

## High-Level Flow
Input → Job List → Review → Match → Customize → Apply Assist → Track → Remind