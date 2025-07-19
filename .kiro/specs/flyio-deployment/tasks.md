# Implementation Plan

- [ ] 1. Fix PR validation workflow
  - Update `.github/workflows/pr-validation.yml` to remove non-existent test:e2e script
  - Add proper test suite execution for existing tests
  - Fix workflow to run only available test commands (check, build)
  - Ensure workflow properly reports status for branch protection
  - _Requirements: 1.1, 1.2, 1.3, 3.1, 3.2, 5.1, 5.2_

- [x] 2. Create deployment workflow
  - Create `.github/workflows/deploy.yml` for production deployment to Fly.io
  - Configure workflow to trigger only on pushes to main branch (after PR merge)
  - Set up Fly.io CLI installation and authentication using GitHub secrets
  - Implement deployment steps with proper error handling and rollback capabilities
  - Add post-deployment health check verification
  - Configure deployment status notifications
  - _Requirements: 1.1, 1.4, 2.1, 2.2, 2.3, 3.1, 3.3, 4.3_

- [x] 3. Create Fly.io application configuration
  - Create `fly.toml` configuration file with application settings
  - Configure Node.js runtime environment and port settings
  - Set up health check endpoints and scaling configuration
  - Configure HTTPS enforcement and security settings
  - Add environment variable configuration for production
  - _Requirements: 4.1, 4.2, 6.1, 6.2_

- [x] 4. Create optimized Dockerfile
  - Create multi-stage Dockerfile for efficient container builds
  - Use Node.js Alpine base image for security and size optimization
  - Implement proper layer caching for faster builds
  - Configure non-root user execution for security
  - Set up static file serving for built Astro application
  - Add health check endpoint configuration
  - _Requirements: 4.1, 4.2, 5.3_

- [x] 5. Update package.json with deployment scripts
  - Add `build:production` script for optimized production builds
  - Add `start:production` script for production server startup
  - Add `deploy:prepare` script for pre-deployment preparation tasks
  - Update existing build script to ensure compatibility with deployment
  - _Requirements: 4.2, 5.2_

- [ ] 6. Configure GitHub repository settings
  - Set up branch protection rules for main branch requiring PR validation
  - Configure required status checks to include PR validation workflow
  - Set up GitHub secrets for Fly.io authentication (FLY_API_TOKEN)
  - Configure repository settings to prevent direct pushes to main
  - Add optional FLY_APP_NAME secret for application name override
  - _Requirements: 2.1, 2.2, 6.3, 6.4_

- [x] 7. Create deployment documentation
  - Create deployment setup guide with step-by-step instructions
  - Document GitHub secrets configuration process
  - Add troubleshooting guide for common deployment issues
  - Document rollback procedures and emergency response
  - Create monitoring and maintenance guidelines
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 8. Test deployment pipeline end-to-end
  - Create test pull request to verify PR validation workflow
  - Test branch protection rules and merge blocking on failed checks
  - Verify deployment workflow triggers correctly on main branch merge
  - Test Fly.io deployment process and health check verification
  - Validate rollback functionality and error handling
  - Verify all GitHub status checks and notifications work correctly
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.1, 3.2, 3.3, 4.3, 4.4_