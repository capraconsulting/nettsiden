import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { HighlightProps } from "prism-react-renderer";
import { Highlight, themes } from "prism-react-renderer";

import type { BlockContent } from "~/sanity/schema";
import { urlFor } from "~/utils/imageBuilder";
import { classNames } from "~/utils/misc";
import { CapraImage } from "./capra-image";
import { CapraLink } from "./capra-link";

type PrismProps = Pick<HighlightProps, "code" | "language">;

function Prism({ code = "", language }: PrismProps) {
  return (
    // TODO: Switch themes if we're not happy with GitHub
    <Highlight code={code} language={language} theme={themes.github}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

// TODO: Optimize
function Image(props: PortableTextTypeComponentProps<any>) {
  if (!props.value || !props.value.asset) {
    return null;
  }

  return (
    <figure>
      <CapraImage
        alt={props.value.alt ?? ""}
        src={urlFor(props.value.asset).url()}
      />
      <figcaption>{props.value.caption}</figcaption>
    </figure>
  );
}

function Code(props: PortableTextTypeComponentProps<any>) {
  if (!props.value?.code) {
    return null;
  }

  return (
    <Prism code={props.value?.code} language={props.value?.language ?? ""} />
  );
}

interface ProseableTextProps {
  value: BlockContent;
  className?: string;
}

export const ProseableText = ({ value, className }: ProseableTextProps) => {
  return (
    <div
      className={classNames(
        "prose",
        className,
        "prose-blockquote:border-l-blue",
        "prose-h2:mb-0 prose-h2:text-header",

        "prose-code:before:content-none prose-code:after:content-none",
        "prose-code:bg-secondary-7 prose-code:px-1 prose-code:py-0.5 prose-code:font-monospace prose-code:font-light",
      )}
    >
      <PortableText
        value={value}
        components={{
          types: {
            code: Code,
            image: Image,
            richTextImage: Image,
          },
          marks: {
            link: (props) => (
              <CapraLink href={props.value?.href}>{props.children}</CapraLink>
            ),
          },
        }}
      />
    </div>
  );
};
