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
      { title: "Quick Start", href: "/quick-start" },
    ],
  },
  {
    title: "Reference",
    href: "/reference",
    noLink: true,
    items: [
      { title: "Authentication", href: "/authentication" },
      { title: "Organizations", href: "/organizations" },
       { title: "Config file", href: "/configuration" },
      { title: "Apps", href: "/apps" },
      { title: "Setup", href: "/setup" },
      { title: "Deploy", href: "/deploy" },
      { title: "Builder", href: "/builder" },
      { title: "Machines", href: "/machines" },
      { title: "Secrets", href: "/secrets" },
    ]
  },
  {
    title: "Services",
    href: "/services",
    noLink: true,
    items: [
      { title: "SSH", href: "/ssh" },
      { title: "Logs", href: "/logs" },
      { title: "Metrics", href: "/metrics" },
      { title: "Volumes", href: "/volumes" },
      { title: "Snapshots", href: "/snapshots" },
      {
        title: "Databases",
        href: "/databases",
        items: [
          { title: "Postgres", href: "/postgres" },
        ],
      },
    ],
  },
  {
    title: "workflows",
    href: "/workflows",
    noLink: true,
    items: [
      { title: "Github Deploy Action", href: "/github-deploy-action" },
    ],
  },
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
