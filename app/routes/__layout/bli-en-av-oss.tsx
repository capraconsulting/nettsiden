import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CallToActionBox } from "~/components/call-to-action-box";
import { CapraLink } from "~/components/capra-link";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { cacheControlHeaders } from "~/utils/cache-control";
import { uniqueBy } from "~/utils/misc";

/**
 * Team Tailor integration
 */
interface TeamTailorJobsResponse {
  data: TeamTailorJob[];
}
interface TeamTailorJob {
  id: string;
  attributes: {
    title: string;
    internal: boolean;
  };
  links: {
    "careersite-job-url": string;
  };
  relationships: {
    department: {
      links: {
        related: string;
      };
    };
  };
}
interface TeamTailorDepartmentResponse {
  data: TeamTailorDepartment;
}
interface TeamTailorDepartment {
  id: string;
  attributes: {
    name: string;
  };
}
interface CapraJob {
  id: string;
  title: string;
  url: string;
  department: string;
}
const TEAM_TAILOR_API_VERSION = "20210218";

export const loader = async ({ context }: LoaderArgs) => {
  // Env
  let env = {} as Partial<Record<string, unknown>>;
  if (typeof process !== "undefined") {
    env = { ...env, ...process.env };
  }
  if (context) {
    env = { ...env, ...context };
  }

  if (!env.TEAM_TAILOR_API_KEY) {
    throw new Response(`TEAM_TAILOR_API_KEY needs to be set`, {
      status: 500,
    });
  }

  const headers = {
    Authorization: `Token token=${env.TEAM_TAILOR_API_KEY}`,
    "X-Api-Version": TEAM_TAILOR_API_VERSION,
  };

  // Fetch all job listings and their departments
  const jobsTeamTailor = (await fetch("https://api.teamtailor.com/v1/jobs", {
    headers,
  }).then((x) => x.json())) as TeamTailorJobsResponse;

  const fetchDepartment = (
    url: string,
  ): Promise<TeamTailorDepartmentResponse> =>
    fetch(url, {
      headers,
    }).then((x) => x.json());

  const jobs = await Promise.all(
    jobsTeamTailor.data
      .filter((job) => !job.attributes.internal)
      .map(
        async (job): Promise<CapraJob> => ({
          id: job.id,
          title: job.attributes.title,
          url: job.links["careersite-job-url"],
          department: (
            await fetchDepartment(job.relationships.department.links.related)
          ).data.attributes.name,
        }),
      ),
  );

  return json({ jobs }, { headers: cacheControlHeaders });
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function BliEnAvOss() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex flex-col gap-12 w-full">
        <TitleAndText title="Bli en av oss!" titleAs="h1">
          Det skal være skikkelig bra å være ansatt i Capra. Vi vet nemlig at
          kick-ass ansatte er et resultat av en god arbeidsplass - og det
          ansvaret tar vi på største alvor.
        </TitleAndText>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            href="https://capraconsulting.teamtailor.com/jobs"
          >
            Se stillinger
          </Button>
          <Button variant="outline" href="/ansatte">
            Se de ansatte
          </Button>
        </div>
      </div>

      <JobListingsByDepartment
        className="w-11/12 max-w-4xl"
        jobs={data.jobs}
        titleAs="h2"
      />

      <ContentAndImageBox
        title="TODO: Info om størrelse på selskapet"
        image={undefined}
        height="40vw"
        color="lightBlue"
      >
        Er du happy og kunden happy, så er Capra happy!
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi er stolte av fagmiljøet"
        image={undefined}
        height="40vw"
        direction="right"
        color="peach"
      >
        Vi består av en gjeng som er over gjennomsnittet interessert i tech, og
        det reflekteres i fagmiljøet vårt. Fagmiljøene er åpne og du kan delta
        på det du vil .
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi liker å være sammen"
        image={undefined}
        height="50vw"
        color="bordeaux"
      >
        Kontoret til Capra ligger midt på Jernbanetorget sånn at du enkelt kan
        komme “hjemom” en tur, før eller etter du har vært hos kunde. Kontoret
        blir brukt mye . Når du er på hjemmebane kan du slappe av med ping pong,
        spill, noe digg å drikke og godt selskap. I tillegg til julelunsj,
        juletrefest, sommerfest, årsfest, lønningspilser og internkonferansen
        CapraCon , så har vi mange sosiale initiativ som er startet av våre
        egne. Blant annet er det flere som digger squash, toppturer, cageball,
        familieturer på teater, vinsmaking osv . Savner du noe? Det er åpent for
        nye initiativer!
      </ContentAndImageBox>

      <CallToActionBox
        title="Er du nysgjerrig om du og Capra er en match?"
        description="Ta en titt på stillingene våre da vel!"
        linkText="Se stillinger"
      />
    </>
  );
}

interface JobListingsByDepartmentProps {
  jobs: CapraJob[];
  titleAs: "h2" | "h3" | "h4";
  className?: string;
}
const JobListingsByDepartment = ({
  jobs,
  titleAs: TitleComponent,
  className,
}: JobListingsByDepartmentProps) => {
  const departments = uniqueBy(
    jobs.map((x) => x.department),
    (x) => x,
  );
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {departments.map((department) => (
        <div key={department} className="flex flex-col gap-4">
          <TitleComponent className="text-2xl font-bold">
            {department}
          </TitleComponent>
          <JobListings
            key={department}
            jobs={jobs.filter((job) => job.department === department)}
          />
        </div>
      ))}
    </div>
  );
};

interface JobListingsProps {
  jobs: CapraJob[];
}
const JobListings = ({ jobs }: JobListingsProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {jobs.map((x) => (
        <li key={x.id}>
          <CapraLink href={x.url} target="_blank" className="text-xl">
            {x.title}
          </CapraLink>
        </li>
      ))}
    </ul>
  );
};
