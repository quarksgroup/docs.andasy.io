import Copy from "@/components/markdown/copy";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { page_routes } from "@/lib/routes-config";
import { TerminalSquareIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[80.5vh] min-h-[80vh] flex-col items-center justify-center text-center px-2 sm:py-8 py-12">  
      {/* <Link
        href="https://github.com/quarksgroup/andasy-docs"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Follow along on GitHub{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link> */}
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
        Effortlessly deploy your applications
      </h1>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground">
        With Andasy, developers can effortlessly drop their code onto the platform and let the magic happen. Andasy handles the building, publishing, and deploying, bringing your application live for the world to see!
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Get Stared
        </Link>
      </div>
      <div>
        <p className="mt-6 mb-2 sm:text-lg max-w-[800px] text-muted-foreground">
          Get Started with Andasy CLI
        </p>
        <Tabs defaultValue={"linux"}>
          <TabsList className="border-b-0 justify-center">
            <TabsTrigger value="linux">Linux</TabsTrigger>
            <TabsTrigger value="windows">Windows</TabsTrigger>
            <TabsTrigger value="mac">Mac</TabsTrigger>
          </TabsList>
          <TabsContent value="linux">
            <span className="flex flex-row items-start justify-center sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium">
              <TerminalSquareIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
              {"curl -sSL https://andasy.io/install.sh | sh"}
              <Copy content="curl -sSL https://andasy.io/install.sh | sh" />
            </span>
          </TabsContent>
          <TabsContent value="windows">
            <span className="flex flex-row items-start justify-center sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium">
              <TerminalSquareIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
              {"iwr https://andasy.io/install.ps1 | iex"}
              <Copy content="iwr https://andasy.io/install.ps1 | iex" />
            </span>
          </TabsContent>
          <TabsContent value="mac">
            <span className="flex flex-row items-start justify-center sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium">
              <TerminalSquareIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
              {"curl -sSL https://andasy.io/install.sh | sh"}
              <Copy content="curl -sSL https://andasy.io/install.sh | sh" />
            </span>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
