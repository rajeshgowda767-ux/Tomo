const { execFile } = require('node:child_process');

const databaseUrl = process.env.DATABASE_URL;

function runSql(sql, params = []) {
  if (!databaseUrl) {
    return Promise.reject(new Error('DATABASE_URL is not configured'));
  }

  const wrappedSql = `
    WITH input AS (
      SELECT COALESCE(NULLIF($$${JSON.stringify(params)}$$, ''), '[]')::jsonb AS args
    )
    ${sql}
  `;

  return new Promise((resolve, reject) => {
    execFile(
      'psql',
      [databaseUrl, '--no-align', '--tuples-only', '--quiet', '--set', 'ON_ERROR_STOP=1', '--command', wrappedSql],
      { maxBuffer: 1024 * 1024 * 8 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }

        const trimmed = stdout.trim();
        if (!trimmed) {
          resolve([]);
          return;
        }

        try {
          resolve(JSON.parse(trimmed));
        } catch {
          resolve(trimmed);
        }
      }
    );
  });
}

function jsonQuery(selectSql, params = []) {
  return runSql(
    `
    SELECT COALESCE(jsonb_agg(row_to_json(result)), '[]'::jsonb)
    FROM (${selectSql}) result;
    `,
    params
  );
}

function oneQuery(selectSql, params = []) {
  return runSql(
    `
    SELECT COALESCE(to_jsonb(result), 'null'::jsonb)
    FROM (${selectSql}) result;
    `,
    params
  );
}

module.exports = {
  jsonQuery,
  oneQuery,
  runSql
};
