# AI Product Advisor - Technical Documentation

## Overview

The AI Product Advisor is a React Native application that enables users to describe their product needs in natural language and receive intelligent, AI-powered product recommendations. The application integrates with OpenAI's GPT-4o-mini model to analyze user queries against a product catalog and provide personalized recommendations with detailed explanations.

## Architecture

### High-Level Component Structure

The application follows a layered architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│              UI Layer (Screens)         │
│  ┌─────────────────┐ ┌─────────────────┐│
│  │   Home Screen   │ │  Results Screen ││
│  │    (index.tsx)  │ │  (results.tsx)  ││
│  └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────┘
                    │
┌────────────────────────────────────────────────────┐
│              Business Logic Layer                  │
│  ┌────────────────────┐ ┌───────────────────────┐  │
│  │     Hooks          │ │    Services           │  │
│  │(useRecommendations)│ |(recommendationService)│  |
│  └────────────────────┘ └───────────────────────┘  │
└────────────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│              API Layer                  │
│  ┌─────────┬─────────┬─────────┬───────┐│
│  │sanitize │ subset  │ prompt  │  LLM  ││
│  │ Input   │ Filter  │Builder  │ API   ││
│  └─────────┴─────────┴─────────┴───────┘│
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│              Data Layer                 │
│          ┌─────────────────┐            │
│          │   skus.json     │            │
│          │ Product Catalog │            │
│          └─────────────────┘            │
└─────────────────────────────────────────┘
```

### Data Flow

1. **User Input**: User enters natural language query on the home screen
2. **Input Processing**: Query is sanitized and filtered for relevant products
3. **AI Processing**: Subset of products and user query are sent to OpenAI GPT-4o-mini
4. **Response Processing**: AI returns structured JSON with recommendations and reasoning
5. **UI Rendering**: Results are displayed on the results screen with detailed explanations

### State Management

The application uses React's built-in state management:
- **Local Component State**: For UI interactions and form inputs
- **Custom Hooks**: `useRecommendations` hook manages recommendation state (loading, error, data)
- **Navigation State**: Expo Router handles navigation state between screens

## Approach

### Key Design Decisions

#### 1. **Intelligent Product Filtering**
**Decision**: Implement a sophisticated product subset filtering system before sending data to the LLM.

**Rationale**: 
- Reduces API costs by sending only relevant products to OpenAI
- Improves response speed and accuracy
- Handles large product catalogs efficiently

**Implementation**: The `findRelevantSubset` function uses:
- Text normalization and tokenization
- Stopword removal for cleaner matching
- Weighted scoring system (product_name > category > description > brand)
- Bigram matching for phrase recognition (e.g., "vacuum cleaner")
- Score-based filtering to return only relevant products

#### 2. **Structured AI Prompting**
**Decision**: Use strict JSON response formatting with detailed prompt engineering.

**Rationale**:
- Ensures consistent, parseable responses from the LLM
- Provides multiple reasoning points for each recommendation
- Handles edge cases (no matches found) gracefully
- Maintains response predictability for UI rendering

#### 3. **Modular API Architecture**
**Decision**: Split LLM integration into separate, focused modules.

**Rationale**:
- **Maintainability**: Each function has a single responsibility
- **Testability**: Individual components can be unit tested
- **Reusability**: Components can be used across different features
- **Error Handling**: Easier to isolate and handle specific failure points

#### 4. **Theme-Aware Component System**
**Decision**: Implement a comprehensive theming system with dark/light mode support.

**Rationale**:
- **User Experience**: Respects system preferences and provides visual consistency
- **Accessibility**: Improves usability in different lighting conditions
- **Code Consistency**: Standardized component library across the app

#### 5. **Service Layer Pattern**
**Decision**: Implement a service layer (`recommendationService`) between hooks and API calls.

**Rationale**:
- **Separation of Concerns**: Business logic separated from UI logic
- **Error Handling**: Centralized error handling and logging
- **Caching Potential**: Future caching can be implemented at service level
- **Testing**: Easier to mock and test business logic

## File Structure

### Root Level Configuration
```
├── .env.development                 # OpenAI API key configuration
├── .github/workflows/eas-build.yml  # CI/CD pipeline configuration
```

### Application Structure
```
├── app/                        # Expo Router file-based routing
│   ├── _layout.tsx             # Root layout with theme provider
│   ├── results.tsx             # Results display screen
│   └── (tabs)/                 # Tab navigation group
│       ├── _layout.tsx         # Tab bar configuration
│       └── index.tsx           # Home screen (main interface)
```

### Source Code Organization
```
├── src/
│   ├── api/llm/                      # LLM integration modules
│   │   ├── index.ts                  # Main LLM API interface
│   │   ├── buildPrompt.ts            # Prompt engineering
│   │   ├── findRelevantSubset.ts     # Product filtering logic
│   │   └── sanitizeInput.ts          # Input validation and cleaning
│   │
│   ├── assets/                       # Static resources
│   │   ├── data/skus.json            # Product catalog data
│   │   └── images/                   # Application images
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── common/                   # Generic UI components
│   │   │   ├── Header.tsx            # App header component
│   │   │   ├── ThemedView.tsx        # Theme-aware container
│   │   │   ├── ThemedText.tsx        # Theme-aware text
│   │   │   ├── ThemedTextInput.tsx   # Theme-aware input
│   │   │   ├── ThemedCard.tsx        # Theme-aware card
│   │   │   └── ThemedButton.tsx      # Theme-aware button
│   │   └── layout/                   # Layout-specific components
│   │       └── ScreenContainer.tsx   # Safe area wrapper
│   │
│   ├── constants/                    # Application constants
│   │   ├── strings.ts                # Localized strings
│   │   └── theme.ts                  # Theme configuration
│   │
│   ├── hooks/                        # Custom React hooks
│   │   └── useRecommendations.ts     # Recommendation state management
│   │
│   └── services/                     # Business logic services
│       └── recommendationService.tsx # Main recommendation orchestrator
```

### Architecture Benefits

#### **Scalability**
- Modular structure allows easy addition of new features
- Service layer can be extended for multiple AI providers
- Component library can grow with new UI requirements

#### **Maintainability**
- Clear separation between UI, business logic, and API layers
- Consistent file naming and organization patterns
- Centralized constants and configuration

#### **Testability**
- Pure functions in API layer are easily unit testable
- Service layer can be mocked for UI testing
- Hooks can be tested independently

#### **Performance**
- Intelligent product filtering reduces API payload size
- Component reuse minimizes bundle size
- Efficient state management prevents unnecessary re-renders

### Development Workflow

#### **CI/CD Pipeline**
The GitHub Actions workflow provides automated building:
- **Development Branch**: Builds development profile for internal testing
- **Main Branch**: Builds preview profile for staging
- **Release Events**: Builds and auto-submits production builds

#### **Environment Management**
- Development environment uses `.env.development` for API keys
- Secure API key management through environment variables
- Easy switching between development and production configurations

## Data Models

### Product Catalog Schema
```typescript
interface Product {
  brand: string;           // Product manufacturer
  product_name: string;    // Display name
  price: number;          // Price in cents
  category: string;       // Product category
  description: string;    // Detailed description
}
```

### AI Response Schema
```typescript
interface AIResponse {
  recommendations: Recommendation[];
  note: string;
}

interface Recommendation {
  product_name: string;
  brand: string;
  price: string;
  reasons: string[];      // Array of explanation points
}
```

This architecture provides a solid foundation for an AI-powered product recommendation system with room for future enhancements like user preferences, recommendation history, and multi-language support.
