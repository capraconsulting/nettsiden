import { useState } from "react";
import { Link, NavLink } from "@remix-run/react";

import { useDisableScroll } from "~/hooks/use-disable-scroll";
import { useHasScrolled } from "~/hooks/use-has-scrolled";
import { menuItems } from "~/utils/constants";
import { classNames } from "~/utils/misc";

export function Header() {
  const [expanded, setExpanded] = useState(false);

  const showBottomBorder = useHasScrolled();

  useDisableScroll(expanded);

  return (
    <header
      className={classNames(
        "sticky bottom-0 top-0 z-10 flex items-center border-b border-solid px-6 transition-none desktop:justify-between desktop:px-8",
        {
          "h-screen flex-col bg-main text-white": expanded,
          "max-h-nav-height border-b-[#ccc] bg-white":
            !expanded && showBottomBorder,
          "max-h-nav-height border-b-transparent bg-background":
            !expanded && !showBottomBorder,
        },
      )}
    >
      <div className="flex w-full justify-between desktop:w-auto">
        <Link to="/" prefetch="render" onClick={() => setExpanded(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 842 596"
            aria-label="Capra Consulting - Logo"
            className={classNames(
              "inline-block h-nav-height w-auto",
              expanded ? "fill-white" : "fill-black",
            )}
          >
            <path
              style={{ transition: "fill .0s" }}
              d="M159.9 466c-11.1 9.7-29.7 14.6-45.7 15.3-41.3 1.7-55.7-21-56.8-44.8-1.1-23.9 16.8-49 57-50.6 15.1-.6 29.6 3.5 41.4 12.3l-13.5 11.7c-7.5-5.6-17.5-7.9-27.2-7.5-26.9 1.1-37.8 18-37 33.3.8 15.2 12.1 30.5 39.5 29.4 9.7-.4 20.5-4.1 27.6-10.4l14.7 11.3zM246.9 388.4l-22.3 41.1-27.3 50H220l9.5-17.3h58.2l9.4 17.3H320l-49.7-91.2-23.4.1zm-8.9 57.8l20.7-39 20.7 39H238zM711.5 388.4l-22.3 41.1-27.3 50h22.7l9.5-17.3h58.2l9.4 17.3h22.9l-49.7-91.2-23.4.1zm-8.9 57.8l20.7-39 20.7 39h-41.4zM431.3 388.4h-55.7l.1 25.5v65.7h21v-26.9h31.5c48.1 0 53.6-50.2 17.1-62.2-4.6-1.5-9.3-2.1-14-2.1m-3.2 48.4h-31.5v-32.4h31.5c26.8-.1 26.9 32.4 0 32.4M624.7 479.6l-31.5-29.2c32.6-9.8 33-49.3 1.2-59.9-4.5-1.5-9.3-2.1-14.1-2.1h-55.7v91.2h21v-26.9h24.2l28.6 26.9h26.3zm-47.6-42.8h-31.5v-32.4h31.5c26.8-.1 26.9 32.4 0 32.4M412.9 268.1c-24-3.7-42.1-24.4-42.1-49.5 0-27.7 22.4-50.1 50.1-50.1 27.7 0 50.1 22.4 50.1 50.1 0 12.6-4.7 24.1-12.3 32.9.3-.3 54.8-20.7 66.6-25.1.2-2.6.3-5.2.3-7.8 0-57.8-46.9-104.7-104.7-104.7-57.8 0-104.7 46.9-104.7 104.7 0 57.8 46.9 104.7 104.7 104.7 51.1 0 93.6-34.9 102.8-83.3-21.5 8.9-35.2 13.9-35.2 13.9s-9.1 3.5-29.4 10.4c-19.2 5.6-30.8 5.8-46.2 3.8"
            />
            <path fill="none" d="M0 0h841.9v595.3H0z" />
          </svg>
        </Link>
        <ToggleMenuButton isOpen={expanded} onToggle={setExpanded} />
      </div>
      <nav
        className={classNames(
          "-mt-nav-height h-screen flex-col items-center justify-center text-3xl desktop:my-0 desktop:h-auto desktop:flex-row desktop:gap-5 desktop:text-lg",
          expanded ? "flex" : "hidden desktop:flex",
        )}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            prefetch="intent"
            className={({ isActive }) =>
              classNames("px-2 leading-loose", {
                "desktop:border-b-[3px] desktop:border-b-main": isActive,
              })
            }
            onClick={() => setExpanded(false)}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

interface ToggleMenuButtonProps {
  isOpen: boolean;

  onToggle(newValue: boolean): void;
}

const ToggleMenuButton: React.VFC<ToggleMenuButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  const lineClassName = classNames(
    "h-[3px] w-8 transition-opacity transition-transform",
    isOpen ? "bg-white absolute" : "bg-grey my-[5px]",
  );
  return (
    <button
      className={classNames("w-8 desktop:hidden", {
        relative: isOpen,
      })}
      onClick={() => onToggle(!isOpen)}
      aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
    >
      <div
        className={classNames(lineClassName, {
          "origin-center -rotate-45": isOpen,
        })}
      />
      <div
        className={classNames(lineClassName, {
          "opacity-0": isOpen,
        })}
      />
      <div
        className={classNames(lineClassName, {
          "origin-center rotate-45": isOpen,
        })}
      />
    </button>
  );
};
