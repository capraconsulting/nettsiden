const MONTH_IN_SECONDS = 60 * 60 * 24 * 30;
export const cacheControlHeaders = {
  "Cache-Control": `public, max-age=${60}, must-revalidate, s-maxage=${
    60 * 10
  }, stale-while-revalidate=${MONTH_IN_SECONDS}`,
};
