# POS-API - Requirements Document

## Iteration 2

## Project Description
Project Name: POS-API

Project Summary
POS-API is a fiscal management solution designed to generate, register, and synchronize Value Added Tax (VAT) receipts directly with the central tax authority's database. This system serves as a compliant bridge between a business's sales operations and government requirements, ensuring that every transaction issues a valid lottery code and QR receipt in real-time.

Key Features
- Real-time generation of unique fiscal QR codes and lottery numbers for valid tax compliance.
- A robust RESTful API allowing seamless integration with existing ERP systems, online stores, or third-party POS hardware.
- A web-based administrative dashboard for manual receipt entry, voiding erroneous transactions, and viewing sales history.
- Offline synchronization capabilities to queue transactions during internet outages and process them once connectivity is restored.

Target Users
Small to medium-sized retail business owners, cashiers requiring manual entry tools, and software developers integrating fiscal reporting into custom applications.

Core User Flows
1. Automated API Request: An external POS system sends a transaction request containing items and prices; POS-API validates the data, registers it with the tax authority, and returns the printable receipt data and QR image.
2. Manual Entry: A user logs into the web portal, inputs the total transaction amount, and clicks "Generate" to print a receipt via a connected thermal printer.
3. Reporting: An administrator accesses the dashboard to export daily sales reports and verify VAT submission status.

## Customer Persona
- **Name**: Elena Sokolova
- **Role**: Director of Operations and Compliance
- **Goals**: Automate fiscal reporting to eliminate manual entry errors and government fines; Provide a standardized API that third-party vendors and partners can easily integrate into their existing hardware; Ensure 100% transaction compliance even during frequent local internet outages

## Target Users
- **Marco Rossi** (Primary User (Manual Entry)): Generate a valid fiscal receipt in under 10 seconds
- **Arjun Mehta** (Technical Integration User): Automate receipt generation via API to eliminate manual entry by staff
- **Sofia Petrov** (Administrative/Secondary User): Reconcile daily sales totals with the tax authority records

## Key User Stories (Must-Have)
- API Transaction Registration
- API Authentication & Security
- Manual Receipt Entry
- Thermal Printing Integration
- Daily VAT Reconciliation Report

## User Feedback Incorporated
FEATURE REQUESTS

1. Implement a secure authentication strategy (e.g., JWT or OAuth 2.0) to manage Merchant identities and restrict API endpoint access.
2. Develop authorization logic to ensure data isolation, allowing Merchants to only register and synchronize VAT receipts associated with their specific accounts.
3. Create Merchant onboarding endpoints to capture and validate essential fiscal identifiers (Tax ID/VAT Number) required for central tax authority compliance.

## Refined Requirements
# Technical Specification: POS-API Fiscal Management Solution (Iteration 2)

## 1. Project Overview
**Project Name:** POS-API  
**Version:** 1.1.0  
**Status:** Requirements Refinement (Iteration 2)  
**Concept:** A "Fiscal-Middleware-as-a-Service" providing a secure, multi-tenant bridge between retail Point-of-Sale (POS) systems and national tax authorities.

---

## 2. Updated System Architecture & Security
The system evolves from a basic microservice to a **Secured Multi-tenant Gateway**.

### 2.1 Identity & Access Management (IAM)
*   **Strategy:** Implement **OAuth 2.0 with JWT (JSON Web Tokens)**.
*   **Authentication:** Merchants authenticate via `client_id` and `client_secret` to obtain a Bearer Token.
*   **Authorization & Data Isolation:** 
    *   Every request must contain a `MerchantID` claim within the JWT.
    *   The database layer implements **Row-Level Security (RLS)** or a mandatory `WHERE merchant_id = ?` filter on all queries to prevent cross-tenant data leakage.
*   **Scoping:** Tokens will have scopes (e.g., `receipts:write`, `reports:read`, `onboarding:full`).

### 2.2 Observability & Error Handling
*   **Global Exception Middleware:** A centralized interceptor will catch all unhandled exceptions.
*   **Standardized Error Response:**
    ```json
    {
      "errorCode": "ERR_FISCAL_SYNC_TIMEOUT",
      "message": "The tax authority server is not responding.",
      "correlationId": "req-99b2-45af-8812",
      "timestamp": "2023-10-27T10:00:00Z",
      "path": "/api/v1/receipts"
    }
    ```
*   **Correlation IDs:** Every request is assigned a unique UUID in the header (`X-Correlation-ID`) which persists through all microservice logs for root-cause tracing.

---

## 3. Merchant Lifecycle & Onboarding

### 3.1 Onboarding Flow
1.  **Identity Capture:** Collect Legal Name, Trade Name, and Address.
2.  **Fiscal Validation:** Capture Tax ID/VAT Number. 
3.  **Third-Party Verification:** Real-time validation of the VAT number against government databases (e.g., VIES for EU or local tax APIs).
4.  **Credential Issuance:** Upon successful validation, the system generates the API credentials.

---

## 4. API Endpoints (Refined)

| Method | Endpoint | Description | Auth Scope |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/token` | Exchange credentials for a JWT. | N/A |
| **POST** | `/merchants/onboard` | Register a new merchant and validate Tax ID. | `admin` |
| **GET** | `/merchants/me` | Retrieve current merchant profile/fiscal status. | `merchant:read` |
| **POST** | `/receipts/sync` | Submit transaction for fiscal signing & QR generation. | `receipts:write` |
| **GET** | `/receipts/{id}` | Retrieve specific receipt (Isolation enforced). | `receipts:read` |

---

## 5. UI/UX Design Tokens & Component Breakdown
*While the core product is an API, a "Merchant Management Dashboard" is required for onboarding and monitoring.*

### 5.1 Design Tokens (Theming)
| Category | Token Name | Value | Intent |
| :--- | :--- | :--- | :--- |
| **Colors** | `color-primary` | `#0F172A` (Deep Navy) | Trust, Authority |
| | `color-accent` | `#3B82F6` (Electric Blue) | Actions, Links |
| | `color-success` | `#10B981` (Emerald) | Validated Tax ID |
| | `color-error` | `#EF4444` (Red) | Compliance Issue |
| **Typography**| `font-main` | Inter, Sans-serif | Readability |
| **Spacing** | `spacing-unit` | 4px / 8px / 16px | Grid-based layout |
| **Border** | `radius-md` | 6px | Professional, Modern |

### 5.2 Component Breakdown
1.  **Auth Guard:** A higher-order component (HOC) that checks JWT validity before rendering management views.
2.  **Onboarding Wizard:** A multi-step form:
    *   *Step 1:* Legal Entity Details.
    *   *Step 2:* VAT/Tax ID input with "Live Validation" spinner.
    *   *Step 3:* API Key generation/display (one-time view).
3.  **Fiscal Status Badge:** A visual indicator of the connection status to the National Tax Authority (Green: Active, Yellow: Maintenance, Red: Offline).
4.  **Correlation ID Toast:** An error notification component that allows users to "Copy Correlation ID" for support tickets.
5.  **Receipt Data Table:** Filterable list with "Data Isolation" baked in—only shows the authenticated merchant's logs.

---

## 6. Acceptance Criteria (AC)

### AC 1: Secure Data Access
*   **Given** a Merchant authenticated with Token A, **When** they attempt to access a receipt belonging to Merchant B via ID, **Then** the system must return a `403 Forbidden` or `404 Not Found`.

### AC 2: Tax ID Validation
*   **Given** a new onboarding request, **When** the VAT number is formatted incorrectly or does not exist in the tax registry, **Then** the API must return a `422 Unprocessable Entity` with a specific error message.

### AC 3: Observability
*   **Given** an internal system crash, **When** the API responds, **Then** the response must hide the raw stack trace from the user but include a `correlationId` that matches the logs in the backend.

---

## 7. Prioritization (Iteration 2)
1.  **High:** OAuth2/JWT Auth Infrastructure & Data Isolation Logic.
2.  **High:** Global Exception Middleware & Correlation ID logging.
3.  **Medium:** Merchant Onboarding Endpoints with VAT validation.
4.  **Low:** Merchant Dashboard UI (Component prototyping).

---

## 8. Clarifications & Constraints
*   **Ambiguity Resolved:** "Standardized HTTP error responses" now includes a specific JSON schema to avoid "Unknown issue" errors.
*   **Scope Limitation:** This iteration focuses on *synchronous* validation. Asynchronous queuing for tax authority downtime will be handled in Iteration 3.

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 2 - 2025-12-31T16:53:24.994Z*
