# Dinify Frontend - AI Coding Instructions

## Project Overview
Dinify is a restaurant management Angular application with three main sub-applications:
- **Restaurant Management** (`/rest-app`) - For restaurant staff and owners
- **Dinify Management** (`/mgt-app`) - For platform administrators  
- **Diner App** (`/diner`) - For customers scanning QR codes to view menus and order

## Architecture Patterns

### Multi-App Structure
- Each sub-app has its own module, component, and routing (`*-mgt.module.ts`, `*-mgt.component.ts`)
- Lazy-loaded modules in `app-routing.module.ts` using `loadChildren`
- Shared components in `src/app/_common/` with `DinifyCommonModule`

### Service Layer
- **ApiService** (`_services/api.service.ts`) - Centralized HTTP client with environment-based URLs
- **AuthenticationService** - JWT token management, user state, and role-based restaurant switching
- **Storage Services** - Separate local/session storage services in `_services/storage/`

### Authentication Flow
- Login supports OTP verification and multi-restaurant role switching
- AuthGuard protects routes, AuthInterceptor adds Bearer tokens
- Role-based routing: admins → `/mgt-app`, restaurant staff → `/rest-app`
- Restaurant context stored in localStorage (`rest_role`, `current_resta`)

## File Organization Conventions

### Naming Patterns
- Components: `kebab-case.component.ts`
- Services: `kebab-case.service.ts` 
- Helpers: `_helpers/` directory with lowercase filenames
- Models: `_models/app.models.ts` (single file for all interfaces)
- Common components: `_common/component-name/`

### Module Structure
- Feature modules import `DinifyCommonModule` for shared components
- Each sub-app module declares its components and imports required dependencies
- Common modules exported: `DinifyCommonModule`, `RouterModule`

## Key Dependencies & Usage

### UI Libraries
- **TailwindCSS** - Primary styling framework
- **NgApexcharts** - Charts and data visualization  
- **ngx-currency** - Currency input formatting
- **angularx-qrcode** - QR code generation for tables

### Development Commands
```bash
npm start          # Development server on :4200
npm run build      # Production build
npm test           # Run unit tests
```

## Environment Configuration
- Multiple environments: `dev`, `staging`, `uat`, `prod`
- API versioning: `environment.version` (v1, v2)
- Base API URL: `environment.apiUrl`

## Common Patterns

### API Calls
```typescript
// Use ApiService methods consistently
this.api.get<ModelType>(id, 'endpoint', params)
this.api.postPatch('endpoint', data, 'post', id)
```

### Form Handling
- Reactive forms with FormBuilder
- Consistent validation patterns
- OTP input components for verification flows

### Modal Patterns
- Shared confirm dialog service (`ConfirmDialogService`)
- Modal state managed with boolean flags (`showModal`)
- Backdrop click handling for modal closure

## Integration Points
- Firebase integration (see `firebase.json`, `firebase-debug.log`)
- External payment processing endpoints
- Image uploads with progress tracking via `ApiService.postFileWithProgress`

When implementing new features, follow the established module structure, use shared components from `DinifyCommonModule`, and maintain the role-based authentication patterns.