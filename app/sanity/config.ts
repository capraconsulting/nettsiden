// This config is public, both in git and when compliled and bundled it might be served to the users
// Do not put any secrets here, not secrets read from `process.env.*` either.
//
// If the need arises, create a new config with `.server.ts` suffix to ensure secrets will not be bundled to the user
export const config = {
  apiVersion: "2021-03-25",
  dataset: "production",
  projectId: "3drrs17h",
  useCdn: false,
};
