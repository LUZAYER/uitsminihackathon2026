# Security Spec: DeepFake Shield AI

## Data Invariants
1. A forensic investigation must be owned by the user who initiated the scan.
2. The trust score and verdict are calculated by the AI system and must be immutable once the scan is finalized (unless updated by a higher clearance process).
3. Public investigations are visible in the global intel feed.

## The Dirty Dozen (Attack Payloads)
1. **The Spoof**: Attempt to create an investigation for another user's `ownerId`.
2. **The Result Forgery**: Attempt to update an existing investigation's `trustScore` to 100 via client SDK.
3. **The Shadow Field**: Attempt to inject `isVerified: true` into a new investigation doc.
4. **The Scraping Attack**: Attempt to list investigations that are not owned by the requester and are not public.
5. **The ID Poisoning**: Create a document with a 1.5KB junk string as the ID.
6. **The Timestamp Forge**: Sending a client-side timestamp for `createdAt`.
7. **The PII Leak**: Accessing the `users` collection without proper authorization.
8. **The Ghost Delete**: Attempting to delete a case from another analyst's evidence locker.
9. **The Role Escalation**: Attempting to set `isAdmin: true` on own user profile.
10. **The Size Nuke**: Sending a summary string of 1MB.
11. **The Type Confusion**: Sending a `trustScore` as a string instead of a number.
12. **The Relationship Break**: Creating a task for a project ID that doen't exist (simulated via relational check).

## The Fortress Strategy (Rules)
- Mandatory authentication for all write operations.
- `isValidInvestigation` helper enforcing schema and value boundaries.
- `affectedKeys().hasOnly()` gates for partial updates.
- Server-side timestamp validation for `updatedAt`/`createdAt`.
