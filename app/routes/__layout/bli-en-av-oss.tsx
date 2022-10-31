import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CallToActionBox } from "~/components/call-to-action-box";
import { CapraLink } from "~/components/capra-link";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { cacheControlHeaders } from "~/utils/cache-control";
import { groupBy, typedBoolean } from "~/utils/misc";

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
      data?: {
        type: "departments";
        id: string;
      };
      links: {
        related: string;
      };
    };
  };
}

interface TeamTailorDepartmentsResponse {
  data: TeamTailorDepartment[];
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
  const [jobsTeamTailor, departmentsTeamTailor] = await Promise.all([
    fetch("https://api.teamtailor.com/v1/jobs?include=department", {
      headers,
    }).then((x) => x.json<TeamTailorJobsResponse>()),
    fetch("https://api.teamtailor.com/v1/departments", {
      headers,
    }).then((x) => x.json<TeamTailorDepartmentsResponse>()),
  ]);

  const jobs = jobsTeamTailor.data
    .filter((job) => !job.attributes.internal)
    .map<CapraJob | undefined>((job) => {
      // Some Job's might not have an department set
      // This should be fixed in Teamtailor UI
      const departmentId = job.relationships.department.data?.id;
      if (!departmentId) {
        console.warn(
          `Could not get departmentId from Job ${job.attributes.title} (${job.id})`,
        );
        return undefined;
      }

      const deparment = departmentsTeamTailor.data.find(
        (x) => x.id === departmentId,
      );
      if (!deparment) {
        throw new Error(
          `Could not find coresponding department for "${job.attributes.title}" (${job.id}) with departmentId ${departmentId}`,
        );
      }

      return {
        id: job.id,
        title: job.attributes.title,
        url: job.links["careersite-job-url"],
        department: deparment.attributes.name,
      };
    })
    .filter(typedBoolean);

  return json({ jobs }, { headers: cacheControlHeaders });
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function BliEnAvOss() {
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

      <JobListingsByDepartment />

      <ContentAndImageBox
        title="TODO: Info om størrelse på selskapet"
        image={undefined}
        height="40vw"
        color="lightBlue"
        readMoreLink={{
          linkText: "Hils på alle sammen",
          to: "/ansatte",
        }}
      >
        Er du happy og kunden happy, så er Capra happy!
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi er stolte av fagmiljøet"
        image={undefined}
        height="40vw"
        direction="right"
        color="peach"
        readMoreLink={{
          linkText: "Se hva vi bruker",
          to: "/dette-kan-vi#teknologier",
        }}
      >
        Vi består av en gjeng som er over gjennomsnittet interessert i tech, og
        det reflekteres i fagmiljøet vårt.{" "}
        <strong>Fagmiljøene er åpne og du kan delta på det du vil .</strong>
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi liker å være sammen"
        image={undefined}
        height="50vw"
        color="bordeaux"
      >
        Kontoret til Capra ligger midt på Jernbanetorget sånn at du enkelt kan
        komme “hjemom” en tur, før eller etter du har vært hos kunde.{" "}
        <strong>Kontoret blir brukt mye</strong>. Når du er på hjemmebane kan du
        slappe av med ping pong, spill, noe digg å drikke og godt selskap. I
        tillegg til{" "}
        <strong>
          julelunsj, juletrefest, sommerfest, årsfest, lønningspilser og
          internkonferansen CapraCon
        </strong>
        , så har vi mange sosiale initiativ som er startet av våre egne. Blant
        annet er det flere som digger{" "}
        <strong>
          squash, toppturer, cageball, familieturer på teater, vinsmaking osv
        </strong>
        . Savner du noe? Det er åpent for nye initiativer!
      </ContentAndImageBox>

      <CallToActionBox
        title="Er du nysgjerrig på om du og Capra er en match?"
        description="Ta en titt på stillingene våre da vel!"
        linkText="Se stillinger"
        href="https://capraconsulting.teamtailor.com/jobs"
      />
    </>
  );
}

const JobListingsByDepartment: React.FC = () => {
  const { jobs } = useLoaderData<typeof loader>();
  const groups = groupBy(jobs, (it) => it.department);
  return (
    <div className="flex flex-col gap-8 w-11/12 max-w-4xl">
      {Object.entries(groups).map(([department, jobs]) => (
        <details
          key={department}
          className="[&>summary:after]:open:content-['▼']"
          open
        >
          <summary className="text-2xl font-bold list-none cursor-pointer pb-2 mb-4 border-b border-b-[#ccc] flex justify-between after:self-center after:text-xs after:text-[#ccc] after:content-['►']">
            {department}
          </summary>
          <ul className="flex flex-col gap-4">
            {jobs.map((x) => (
              <li key={x.id}>
                <CapraLink href={x.url} target="_blank" className="text-xl">
                  {x.title}
                </CapraLink>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
};
