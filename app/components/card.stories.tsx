import { socialIcons } from "~/utils/constants";
import { Badge } from "./badge";
import { CapraImage } from "./capra-image";
import { Card } from "./card";

export const CardStories = () => {
  return (
    <div className="grid gap-12 sm:gap-10 md:gap-8 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center">
      <a href="#dette-har-vi-gjort">
        <Card
          image={
            <CapraImage
              alt=""
              src="https://cdn.sanity.io/images/3drrs17h/production/3caf38fa7022149f24f434951d4d126587c19837-800x449.png?w=800&h=449&auto=format"
            />
          }
        >
          <div>
            <p className="text-xl font-bold text-blue">Fieldmade</p>
            <p>Revolusjonerende markedsplass for 3D-printede reservedeler</p>
          </div>
          <div className="flex gap-1">
            <Badge color="blue" variant="outline" size="xs">
              Liflig
            </Badge>
            <Badge color="blue" variant="solid" size="xs">
              Privat
            </Badge>
          </div>
        </Card>
      </a>

      <a href="#Blogg">
        <Card
          image={
            <CapraImage
              src="https://cdn.sanity.io/images/3drrs17h/production/526b9fe08148af1a6c296a57013476b6d6071427-1920x1285.jpg?w=1366&h=914&auto=format"
              alt=""
            />
          }
        >
          <p className="text-xl font-bold">
            Effektiv JSON validering med TypeBox
          </p>
          <p>Anders Olav Candasamy</p>
          <p className="text-sm font-thin text-grey-dark">
            {new Date("2022-08-24").toLocaleDateString("no", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
        </Card>
      </a>

      <Card className="h-min">
        <div className="flex flex-col">
          <p className="text-lg font-bold color-secondary¨">
            Hannah Synnestvedt Gallagher
          </p>
          <a href="mailto:hsg@capraconsulting.no" className="underline">
            hsg@capraconsulting.no
          </a>
          <a href="tel:98827701" className="underline">
            98827701
          </a>
        </div>

        <div className="flex flex-wrap gap-1">
          {["Team Marked", "Team Rekruttering"].map((x) => (
            <Badge key={x} color="main" variant="solid" size="xs">
              {x}
            </Badge>
          ))}
        </div>

        <div className="flex gap-1">
          <a
            href="#linkedin"
            className="fill-grey-light transition-all hover:fill-grey-dark"
          >
            <svg width={24} height={24} xmlns="https://www.w3.org/2000/svg">
              {socialIcons.linkedIn}
            </svg>
          </a>
          <a
            href="#twitter"
            className="fill-grey-light transition-all hover:fill-grey-dark"
          >
            <svg width={24} height={24} xmlns="https://www.w3.org/2000/svg">
              {socialIcons.gitHub}
            </svg>
          </a>
        </div>
      </Card>
      <Card
        image={
          <CapraImage
            alt=""
            src="https://cdn.sanity.io/images/3drrs17h/production/245fc89dfead5d9a4049b5fcf0e44238bac396ce-4500x3000.jpg?rect=750,0,3000,3000&w=1600&h=1600&auto=format"
          />
        }
      >
        <div className="flex flex-col">
          <p className="text-lg font-bold color-secondary¨">
            Hannah Synnestvedt Gallagher
          </p>
          <a href="mailto:hsg@capraconsulting.no" className="underline">
            hsg@capraconsulting.no
          </a>
          <a href="tel:98827701" className="underline">
            98827701
          </a>
        </div>

        <div className="flex flex-wrap gap-1">
          {["Team Marked", "Team Rekruttering"].map((x) => (
            <Badge key={x} color="main" variant="solid" size="xs">
              {x}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-1">
          <a
            href="#linkedin"
            className="fill-grey-light transition-all hover:fill-grey-dark"
          >
            <svg width={24} height={24} xmlns="https://www.w3.org/2000/svg">
              {socialIcons.linkedIn}
            </svg>
          </a>
          <a
            href="#twitter"
            className="fill-grey-light transition-all hover:fill-grey-dark"
          >
            <svg width={24} height={24} xmlns="https://www.w3.org/2000/svg">
              {socialIcons.gitHub}
            </svg>
          </a>
        </div>
      </Card>
    </div>
  );
};
