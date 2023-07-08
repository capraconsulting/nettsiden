import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  V2_ServerRuntimeMetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CallToActionBox } from "~/components/call-to-action-box";
import { CapraLink } from "~/components/capra-link";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { teamTailorClient } from "~/integrations/team-tailor.server";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";
import { groupBy, typedBoolean } from "~/utils/misc";
import { fetchImageAssets } from "~/utils/sanity-image";

interface CapraJob {
  id: string;
  title: string;
  url: string;
  department: string;
}

export async function loader({ context }: LoaderArgs) {
  const teamTailor = teamTailorClient({ context });

  // Fetch all job listings and their departments
  const [images, jobsTeamTailor, departmentsTeamTailor] = await Promise.all([
    fetchImageAssets([
      "photo-mingling-capracon",
      "photo-sem-capracon",
      "photo-crowd-capracon",
    ]),
    teamTailor.jobs(),
    teamTailor.departments(),
  ]);

  const jobs = jobsTeamTailor.data
    .filter((job) => !job.attributes.internal)
    .map<CapraJob | undefined>((job) => {
      // Some Job's might not have a department set
      // This should be fixed in Teamtailor UI
      const departmentId = job.relationships.department.data?.id;
      if (!departmentId) {
        console.warn(
          `Could not get departmentId from Job ${job.attributes.title} (${job.id})`,
        );
        return undefined;
      }

      const department = departmentsTeamTailor.data.find(
        (x) => x.id === departmentId,
      );
      if (!department) {
        throw new Error(
          `Could not find coresponding department for "${job.attributes.title}" (${job.id}) with departmentId ${departmentId}`,
        );
      }

      return {
        id: job.id,
        title: job.attributes.title,
        url: job.links["careersite-job-url"],
        department: department.attributes.name,
      };
    })
    .filter(typedBoolean);

  return json({ images, jobs }, { headers: cacheControlHeaders });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: V2_ServerRuntimeMetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title: "Norges beste arbeidsplass søker IT-konsulent",
    description:
      "Hos Capra Consulting får du muligheten til å utvikle deg i et faglig og sosialt miljø. Nysgjerrig på hva Capra kan tilby? Les mer her",
    image: data?.images["photo-sem-capracon"].src,
  });

export default function BliEnAvOss() {
  const { images } = useLoaderData<typeof loader>();
  return (
    <>
      <Section>
        <TitleAndText title="Bli en av oss!" titleAs="h1">
          Det skal være skikkelig bra å være ansatt i Capra. Vi vet nemlig at
          kick-ass ansatte er et resultat av en god arbeidsplass - og det
          ansvaret tar vi på største alvor.
        </TitleAndText>

        <div className="mx-auto flex w-11/12 justify-center gap-4">
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
      </Section>

      <JobListingsByDepartment />

      {/* Fjernet i påvente av merkevarearkitekturen */}
      {/* <ContentAndImageBox
        title="TODO: Info om størrelse på selskapet"
        image={images["photo-sem-capracon"]}
        height="40vw"
        color="lightBlue"
        readMoreLink={{
          linkText: "Hils på alle sammen",
          to: "/ansatte",
        }}
      >
        Er du happy og kunden happy, så er Capra happy!
      </ContentAndImageBox> */}

      <ContentAndImageBox
        title="Vi er stolte av fagmiljøet"
        titleAs="h2"
        image={images["photo-crowd-capracon"]}
        height="40vw"
        direction="right"
        color="peach"
        readMoreLink={{
          linkText: "Se hva vi bruker",
          to: "/dette-kan-vi#teknologier",
        }}
        hideMobileImage={false}
      >
        Vi består av en gjeng som er over gjennomsnittet interessert i tech, og
        det reflekteres i fagmiljøet vårt.{" "}
        <strong>Fagmiljøene er åpne og du kan delta på det du vil .</strong>
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi liker å være sammen"
        titleAs="h2"
        image={images["photo-mingling-capracon"]}
        height="50vw"
        color="bordeaux"
        hideMobileImage={false}
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
        titleAs="h2"
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
    <div className="flex w-11/12 max-w-4xl flex-col gap-8">
      {Object.entries(groups).map(([department, jobs]) => (
        <details
          key={department}
          className="[&>summary::-webkit-details-marker]:hidden [&>summary:after]:open:content-['▼']"
          open
        >
          <summary className="mb-4 flex cursor-pointer list-none justify-between border-b border-b-[#ccc] pb-2 text-2xl font-bold after:self-center after:text-xs after:text-[#ccc] after:content-['►']">
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
