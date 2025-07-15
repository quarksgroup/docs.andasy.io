// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Installation",
        href: "/installation",
      },
      { title: "Quick Start Guide", href: "/quick-start-guide" },
    ],
  },
  {
    title: "Reference",
    href: "/reference",
    noLink: true,
    items: [
      { title: "Authentication", href: "/authentication" },
      { title: "Organizations", href: "/organizations" },
      { title: "Apps", href: "/apps" },
      { title: "Setup", href: "/setup" },
      { title: "Deploy", href: "/deploy" },
      { title: "Machines", href: "/machines" },
      { title: "Volumes", href: "/volumes" },
      { title: "Snapshots", href: "/snapshots" },
      { title: "SSH Sessions", href: "/ssh" },
      { title: "Builder", href: "/builder" },
    ]
  },
  {
    title: "Services",
    href: "/services",
    noLink: true,
    items: [
      { title: "Metrics", href: "/metrics" },
      { title: "Logs", href: "/logs" },
    ],
  }
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
