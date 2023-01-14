import React from "react";

import type { DashboardWidget } from "@sanity/dashboard";
import { DashboardWidgetContainer } from "@sanity/dashboard";
import { DocumentIcon, FolderIcon } from "@sanity/icons";
import { Link } from "sanity/router";

interface Item {
  type: string;
  id: string;
  title: string;
  icon?: React.ComponentType;
  schemaType?: {
    icon?: React.ComponentType;
  };
}

function getIconComponent(item: Item) {
  if (item.icon) return item.icon;
  if (!item.schemaType) return DocumentIcon;
  return item.schemaType.icon || FolderIcon;
}

function StructureMenuWidget() {
  // TODO: Retrieve this from desk structure somehow
  const items: Item[] = [];

  return (
    <>
      {items
        .filter((item) => item.type !== "divider")
        .map((item) => {
          const Icon = getIconComponent(item);
          return (
            <Link href={`/desk/${item.id}`} key={item.id}>
              <div style={{ fontSize: "2em" }}>
                <Icon />
              </div>
              <div>{item.title}</div>
            </Link>
          );
        })}
    </>
  );
}

export function projectStructureWidget(): DashboardWidget {
  return {
    name: "project-structure-widget",
    layout: {
      width: "full",
    },
    component() {
      return (
        <DashboardWidgetContainer header="Edit your content">
          <StructureMenuWidget />
        </DashboardWidgetContainer>
      );
    },
  };
}
