# Security Policy

## 🔒 Security Overview

This document outlines the security practices for the Seven Bit News Frontend application.

## ✅ Safe to Expose (Public Information)

The following information in this repository is **safe to be public**:

### Firebase Configuration
Firebase configuration is stored in environment variables (`.env` file) for better practice, though Firebase API keys are **designed to be public** in web applications.

**Why Firebase API keys are safe:**
- Firebase API keys are not secret keys - they simply identify your Firebase project
- Security is enforced through:
  - Firebase Authentication (user login required)
  - Firebase Security Rules (server-side access control)
  - Firebase App Check (prevents unauthorized access)
  - Authorized domains (only specified domains can use your Firebase project)
  
**Reference**: [Firebase API Key Security](https://firebase.google.com/docs/projects/api-keys)

**Note**: Even if Firebase keys were accidentally exposed, they are not a security risk if you have proper Security Rules configured.

### API Endpoints
The API endpoint URLs in `src/config.js` are public-facing and safe to expose.

## ⚠️ DO NOT COMMIT

The following files should **NEVER** be committed to version control:

### ❌ Service Account Keys
- `*.json` files containing service account credentials
- Already protected in `.gitignore`: `seven-bit-news-34b4d4f036cc.json`

### ❌ Environment Variables (if used in future)
- `.env.local`
- `.env.development.local`
- `.env.production.local`

## 🔐 Best Practices

### For Contributors

1. **Never commit sensitive data**
   - Check `.gitignore` before committing
   - Use `git status` to verify what you're committing
   - Never commit files containing passwords, API secrets, or private keys

2. **Firebase Security**
   - Configure Firebase Security Rules properly
   - Enable Firebase App Check in production
   - Monitor Firebase usage in the Firebase Console

3. **API Security**
   - Never expose backend API keys in frontend code
   - Use HTTPS in production
   - Implement proper CORS policies on the backend

### For Deployment

1. **Production Checklist**
   - [ ] Firebase Security Rules configured
   - [ ] Firebase App Check enabled
   - [ ] HTTPS enabled (most platforms do this automatically)
   - [ ] CORS properly configured on backend
   - [ ] Environment variables set (if using)

2. **Regular Security Audits**
   - Run `npm audit` regularly to check for vulnerabilities
   - Update dependencies to patch security issues:
     ```bash
     npm audit fix
     ```

## 🐛 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email the maintainer directly at: [your-email@example.com]
3. Provide details:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work on a fix.

## 📋 Security Checklist for New Developers

Before making your first commit:

- [ ] Read this SECURITY.md file
- [ ] Verify `.gitignore` is properly configured
- [ ] Ensure no `.env` files are in your commit
- [ ] Ensure no `*.json` service account files are in your commit
- [ ] Run `git status` to check what you're committing
- [ ] Review your changes before pushing

## 🔄 Security Updates

This project uses:
- Dependabot (if enabled) for automatic dependency updates
- Regular security audits via `npm audit`

To check for vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities (if possible)
npm audit fix

# Fix vulnerabilities (force update)
npm audit fix --force
```

## 📚 Additional Resources

- [Firebase Security Documentation](https://firebase.google.com/docs/rules)
- [React Security Best Practices](https://reactjs.org/docs/security.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)

---

**Last Updated**: February 2026  
**Maintained By**: Seven Bit News Team
