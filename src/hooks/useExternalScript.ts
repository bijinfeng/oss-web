import { useEffect, useState } from "react";

type ScriptState = "loading" | "idle" | "ready" | "error";

export const useExternalScript = (url: string): ScriptState => {
  const [state, setState] = useState<ScriptState>(url ? "loading" : "idle");

  useEffect(() => {
    if (!url) {
      setState("idle");
      return;
    }

    let script = document.querySelector(
      `script[src="${url}"]`
    ) as HTMLScriptElement;

    const handleScript = (e: Event) => {
      setState(e.type === "load" ? "ready" : "error");
    };

    if (!script) {
      script = document.createElement("script");
      script.type = "application/javascript";
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", handleScript);
    script.addEventListener("error", handleScript);

    return () => {
      script.removeEventListener("load", handleScript);
      script.removeEventListener("error", handleScript);
    };
  }, [url]);

  return state;
};
