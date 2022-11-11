import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
// TODO: Switch themes if we're not happy with GitHub
import github from "prism-react-renderer/themes/github";

import type { BlockContent } from "~/sanity/schema";
import { urlFor } from "~/utils/imageBuilder";
import { classNames } from "~/utils/misc";
import { CapraImage } from "./capra-image";
import { CapraLink } from "./capra-link";

interface PrismProps {
  code: string;
  language: Language;
}

function Prism({ code = "", language }: PrismProps) {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={github}>
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
      )}
    >
      <PortableText
        value={value}
        components={{
          types: {
            code: (props) =>
              props.value.code ? (
                <Prism
                  code={props.value?.code}
                  language={props.value?.language as Language}
                />
              ) : null,
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
