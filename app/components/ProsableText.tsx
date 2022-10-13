import { PortableText } from "@portabletext/react";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
// TODO: Switch themes if we're not happy with GitHub
import github from "prism-react-renderer/themes/github";

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

interface ProseableTextProps {
  value: any[];
}
export const ProseableText = ({ value }: ProseableTextProps) => {
  return (
    <>
      <div className="prose">
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
            },
            marks: {
              link: (props) => (
                <CapraLink href={props.value?.href}>{props.children}</CapraLink>
              ),
            },
          }}
        />
      </div>
    </>
  );
};
