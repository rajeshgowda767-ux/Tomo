# Repository Cleanup Summary

Date: 2026-06-27

Scope: Beta 3 repository cleanup and freeze organization for the active Tomo repo.

No application behavior was changed. No active `frontend/`, `backend/`, `database/`, `scripts/`, `package.json`, `README.md`, or architecture documentation was deleted.

## Folders Created Or Confirmed

- `docs/`
- `docs/architecture/`
- `notes/`
- `notes/audits/`
- `notes/audits/historical/`
- `notes/audits/historical/root/`
- `notes/audits/historical/output-artifacts/`
- `notes/archive/`
- `notes/archive/docs-old/`
- `notes/archive/root-reports/`

## Files Moved

- Added 14 permanent architecture documents under `docs/architecture/`.
- Moved 49 generated root audit outputs into `notes/audits/historical/root/`.
- Moved 5 generated output artifacts from `outputs/` into `notes/audits/historical/output-artifacts/`.
- Moved 25 completed root reports and validation notes into `notes/archive/root-reports/`.
- Moved 30 old documentation reports from `docs/old/` into `notes/archive/docs-old/`.

## Files Archived

Archived material includes:

- Beta 2 and early Beta 3 historical reports.
- Completed validation notes.
- Generated audit snapshots.
- Generated audit spreadsheets and image review sheets.
- One-time cleanup, polish, and implementation reports.

## Files Deleted

Deleted only disposable workspace artifacts:

- `.DS_Store` files.
- Editor swap files such as `*.swp`.

No source code or active audit scripts were deleted.

## `.gitignore` Changes

Added ignore rules for:

- `work/`
- `tmp-*/`
- `*.patch`
- `*.diff`
- editor workspace folders and swap files.

Existing Beta 3 cleanup rules already ignored:

- `/outputs/`
- `/reference-builds/`
- `/database/generated/reports/`
- generated root audit/report/validation outputs.

## Validation

- `package.json` parsed successfully.
- Existing npm audit scripts are still present.
- `node --check` passed for all 37 active files in `scripts/`.
- Root `outputs/` was cleared after its generated artifacts were moved.
- Root-level Markdown/JSON clutter is now limited to durable repo files plus `repository-cleanup-summary.md`.
