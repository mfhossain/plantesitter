# GitHub Pages Deployment Guide

## Overview
This guide will help you deploy your Angular application to GitHub Pages using GitHub Actions.

## Prerequisites
1. Your code is pushed to a GitHub repository
2. You have admin access to the repository
3. GitHub Pages is enabled in your repository settings

## Setup Steps

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "GitHub Actions"
5. This will allow the workflow to deploy automatically

### 2. Repository Settings
Make sure your repository has the following settings:
- **Repository name**: `plantesitter` (this should match the REPO_NAME in the workflow)
- **Visibility**: Public (required for free GitHub Pages)
- **Pages source**: GitHub Actions

### 3. Workflow Configuration
The GitHub Actions workflow (`.github/workflows/jekyll-gh-pages.yml`) is already configured to:
- Build your Angular application from the `application/web` directory
- Install dependencies using npm
- Build the application for production
- Create a 404.html file for SPA routing
- Deploy to GitHub Pages

### 4. Deploy
1. Push your changes to the `main` branch
2. The workflow will automatically trigger
3. Check the "Actions" tab in your repository to monitor the deployment
4. Once complete, your site will be available at: `https://[your-username].github.io/plantesitter/`

## Troubleshooting

### Common Issues

#### 1. Build Failures
- Check that all dependencies are properly installed
- Verify that the Angular CLI is working locally
- Check the Actions logs for specific error messages

#### 2. 404 Errors on Route Navigation
- The workflow creates a `404.html` file to handle SPA routing
- Make sure your Angular router is configured with `HashLocationStrategy` if needed

#### 3. Assets Not Loading
- Verify that the `base-href` is correctly set
- Check that all assets are included in the `angular.json` configuration

#### 4. Repository Name Mismatch
- Update the `REPO_NAME` environment variable in the workflow file
- Make sure it matches your actual repository name

### Manual Deployment
If you need to deploy manually:
1. Build the application locally: `npm run build`
2. The built files will be in `dist/plantesitter/browser/`
3. Upload these files to your GitHub Pages branch

## Configuration Files

### angular.json
The build configuration is set up for production builds with:
- Output hashing for cache busting
- Optimized bundles
- Source maps disabled for production

### package.json
The build script uses the default Angular CLI build command:
```json
"build": "ng build"
```

## Security Notes
- The workflow uses GitHub's OIDC for secure deployment
- No secrets are required for basic GitHub Pages deployment
- The workflow has minimal required permissions

## Next Steps
After successful deployment:
1. Test all routes and functionality
2. Check that all assets load correctly
3. Verify mobile responsiveness
4. Set up a custom domain if desired (optional)

## Support
If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your repository settings
3. Test the build locally first
4. Check the Angular documentation for build issues
