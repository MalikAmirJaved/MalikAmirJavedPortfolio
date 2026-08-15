"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuFolder, LuFolderOpen, LuFileCode2 } from "react-icons/lu";
import type { ModuleNode } from "@/data/projects";

type ModuleTreeProps = {
  tree: ModuleNode;
};

// Cap indentation so deep module trees (ERP is 4 levels) stay readable on phones
const indent = (depth: number) => `${Math.min(depth * 1.1, 3.4)}rem`;

function ModuleBranch({ node, depth }: { node: ModuleNode; depth: number }) {
  const hasChildren = !!node.children?.length;

  if (!hasChildren) {
    return (
      <div
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground"
        style={{ paddingLeft: indent(depth) }}
      >
        <LuFileCode2 className="size-3.5 shrink-0 text-primary/70" />
        <span className="truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <AccordionItem value={node.name} className="border-transparent">
      <AccordionTrigger
        className="hover:no-underline"
        style={{ paddingLeft: indent(depth) }}
      >
        <span className="flex min-w-0 items-center gap-2">
          <LuFolderOpen className="size-4 shrink-0 text-primary" />
          <span className="truncate font-medium">{node.name}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-0.5">
          {node.children!.map((child) => (
            <ModuleBranch key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function ModuleTree({ tree }: ModuleTreeProps) {
  return (
    <Accordion type="multiple" className="w-full">
      <div className="mb-2 flex items-center gap-2 px-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <LuFolder className="size-4 text-primary" />
        {tree.name}
      </div>
      {tree.children?.map((child) => (
        <ModuleBranch key={child.name} node={child} depth={0} />
      ))}
    </Accordion>
  );
}
