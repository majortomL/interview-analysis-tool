# Security policy

## Supported version

Only the latest tagged release receives security fixes while the project is in alpha.

## Deployment boundary

Interview Analysis Tool is local-first software for a single researcher or a trusted group. The default configuration binds the host port to `127.0.0.1` and provides no built-in accounts, tenant separation, or public-internet authentication.

Do not publish the application port directly to the internet. Remote deployments require, at minimum:

- HTTPS;
- authentication and access control at a reverse proxy or private network layer;
- host and volume encryption appropriate to the data;
- restricted backups and tested deletion procedures;
- dependency and container updates;
- an institutional review of the data-processing setup.

## Reporting a vulnerability

Use GitHub's private security advisory feature for the repository. Do not include real recordings, transcripts, project exports, access tokens, or other participant data in a report.

